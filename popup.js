const irregulars = {
  "children":"child","men":"man","women":"woman","mice":"mouse","geese":"goose",
  "feet":"foot","teeth":"tooth","oxen":"ox","went":"go","gone":"go","ran":"run",
  "ate":"eat","eaten":"eat","saw":"see","seen":"see","did":"do","done":"do",
  "was":"be","were":"be","is":"be","are":"be","am":"be","had":"have","has":"have",
  "having":"have","said":"say","saying":"say","made":"make","making":"make",
  "took":"take","taken":"take","gave":"give","given":"give","found":"find"
};

function getRootForm(word) {
  word = word.toLowerCase();
  if (irregulars[word]) return irregulars[word];
  if (word.endsWith('ies') && word.length>4) return word.slice(0,-3)+'y';
  if (word.endsWith('es') && word.length>3) return word.slice(0,-2);
  if (word.endsWith('s') && word.length>3) return word.slice(0,-1);
  if (word.endsWith('ing') && word.length>5) return word.slice(0,-3);
  if (word.endsWith('ed') && word.length>4) return word.slice(0,-2);
  return word;
}

let dictionaryCache = null;
let databaseDirectory = null;
let databaseFileNames = [];
let customUserDB = {};
const DB_HANDLE_DB = 'rongmei-local-settings';
const DB_HANDLE_STORE = 'handles';
const DB_HANDLE_KEY = 'database-directory';

function openHandleDB() {
  return new Promise((resolve,reject) => {
    const req = indexedDB.open(DB_HANDLE_DB, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(DB_HANDLE_STORE))
        req.result.createObjectStore(DB_HANDLE_STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function saveDirectoryHandle(handle, expectedCount) {
  const db = await openHandleDB();
  await new Promise((resolve,reject) => {
    const tx = db.transaction(DB_HANDLE_STORE, 'readwrite');
    tx.objectStore(DB_HANDLE_STORE).put({handle, expectedCount}, DB_HANDLE_KEY);
    tx.oncomplete = resolve; tx.onerror = () => reject(tx.error);
  });
  db.close();
}

async function getSavedDirectory() {
  const db = await openHandleDB();
  const value = await new Promise((resolve,reject) => {
    const tx = db.transaction(DB_HANDLE_STORE, 'readonly');
    const req = tx.objectStore(DB_HANDLE_STORE).get(DB_HANDLE_KEY);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
  db.close();
  return value;
}

async function verifyDirectoryPermission(handle, write=false) {
  const opts = write ? {mode:'readwrite'} : {};
  if (handle.queryPermission) {
    let p = await handle.queryPermission(opts);
    if (p === 'granted') return true;
    if (handle.requestPermission) {
      p = await handle.requestPermission(opts);
      return p === 'granted';
    }
  }
  return true;
}

async function scanJsonFiles(handle) {
  const files = [];
  for await (const [name, entry] of handle.entries()) {
    if (entry.kind === 'file' && name.toLowerCase().endsWith('.json') && name.toLowerCase() !== 'index.json') {
      files.push({name, handle:entry});
    }
  }
  files.sort((a,b)=>a.name.localeCompare(b.name, undefined, {numeric:true, sensitivity:'base'}));
  return files;
}

async function readCustomTraining(handle) {
  const db = {};
  try {
    const fileHandle = await handle.getFileHandle('custom-training.txt');
    const text = await (await fileHandle.getFile()).text();
    for (const line of text.split(/\r?\n/)) {
      if (!line.trim() || line.trim().startsWith('#')) continue;
      const tab = line.indexOf('\t');
      if (tab < 0) continue;
      const eng = line.slice(0,tab).trim().toLowerCase();
      const rongmei = line.slice(tab+1).trim();
      if (eng && rongmei) db[eng] = rongmei;
    }
  } catch (e) {
    // File does not exist yet; this is normal for a new database.
  }
  return db;
}

async function loadDatabaseFromDirectory(handle, expectedCount) {
  if (!await verifyDirectoryPermission(handle, false)) throw new Error('Permission to read the database folder was denied.');
  const files = await scanJsonFiles(handle);
  if (files.length !== expectedCount) {
    throw new Error(`Expected ${expectedCount} JSON file(s), but found ${files.length} in this folder.`);
  }

  const merged = {};
  for (const item of files) {
    const text = await (await item.handle.getFile()).text();
    let part;
    try { part = JSON.parse(text); }
    catch (e) { throw new Error(`${item.name} is not valid JSON.`); }

    if (part && part.format === 'rongmei-encrypted-json') {
      throw new Error(`${item.name} is still encrypted. This version requires plain JSON dictionary files.`);
    }
    if (!part || Array.isArray(part) || typeof part !== 'object') {
      throw new Error(`${item.name} must contain a JSON object of English → Rongmei entries.`);
    }

    // Accept either a direct dictionary object or a wrapper containing "data".
    const source = (part.data && typeof part.data === 'object' && !Array.isArray(part.data)) ? part.data : part;
    for (const [key,value] of Object.entries(source)) {
      if (typeof value === 'string') merged[String(key).toLowerCase()] = value;
    }
  }

  databaseDirectory = handle;
  databaseFileNames = files.map(x=>x.name);
  dictionaryCache = merged;
  customUserDB = await readCustomTraining(handle);
  return merged;
}

async function chooseDatabaseFolder() {
  const countInput = document.getElementById('jsonCount');
  const expectedCount = Math.max(1, parseInt(countInput.value,10) || 0);
  if (!expectedCount) {
    alert('Please enter the number of JSON database files.');
    return;
  }

  if (!window.showDirectoryPicker) {
    alert('Your Chrome version does not provide the local folder access feature required by this extension.');
    return;
  }

  const status = document.getElementById('dbStatus');
  status.textContent = 'Choose the folder containing the JSON files…';

  try {
    const handle = await window.showDirectoryPicker({mode:'readwrite'});
    await loadDatabaseFromDirectory(handle, expectedCount);
    await saveDirectoryHandle(handle, expectedCount);

    document.getElementById('setup').style.background = '#eef9f0';
    document.getElementById('changeDbBtn').classList.remove('hidden');
    status.textContent = `Loaded ${databaseFileNames.length} JSON file(s): ${databaseFileNames.join(', ')}`;
    document.getElementById('meaning').innerHTML = 'Database loaded. Highlight text on a page or type above.';
    const pending = await new Promise(resolve=>chrome.storage.local.get(['selectedText'],resolve));
    if (pending.selectedText) {
      document.getElementById('manualInput').value = pending.selectedText;
      processText(pending.selectedText);
    }
  } catch (err) {
    status.textContent = `⚠️ ${err.message || 'Unable to load database.'}`;
  }
}

async function restoreDatabase() {
  const saved = await getSavedDirectory();
  if (!saved || !saved.handle) return false;

  document.getElementById('jsonCount').value = saved.expectedCount || 1;
  try {
    const ok = await verifyDirectoryPermission(saved.handle, false);
    if (!ok) throw new Error('permission not granted');
    await loadDatabaseFromDirectory(saved.handle, saved.expectedCount);
    document.getElementById('changeDbBtn').classList.remove('hidden');
    document.getElementById('dbStatus').textContent =
      `Loaded ${databaseFileNames.length} JSON file(s): ${databaseFileNames.join(', ')}`;
    return true;
  } catch (e) {
    document.getElementById('dbStatus').textContent =
      'Database folder needs to be selected again. Click “Change Database”.';
    return false;
  }
}

document.getElementById('chooseDbBtn').addEventListener('click', chooseDatabaseFolder);
document.getElementById('changeDbBtn').addEventListener('click', chooseDatabaseFolder);

// Multi-word phrase scanner (Greedy Matching Engine)
function searchDictionary(inputText) {
  if (!dictionaryCache) return { htmlResults: [], contextMap: {}, wordCount: 0 };

  const cleanInput = inputText.trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ").toLowerCase();
  const words = cleanInput.split(/\s+/).filter(Boolean);

  let resultMatches = [];
  let runningContextMap = {};
  let i = 0;

  while (i < words.length) {
    let found = false;
    for (let size = 4; size >= 2; size--) {
      if (i + size <= words.length) {
        const phraseAttempt = words.slice(i, i + size).join(" ");
        if (dictionaryCache[phraseAttempt]) {
          resultMatches.push({ word: phraseAttempt, meaning: dictionaryCache[phraseAttempt] });
          runningContextMap[phraseAttempt] = dictionaryCache[phraseAttempt];
          i += size;
          found = true;
          break;
        }
      }
    }

    if (!found) {
      const lk = words[i];
      let meaning = dictionaryCache[lk];
      let matchedKey = lk;

      if (!meaning) {
        const root = getRootForm(lk);
        meaning = dictionaryCache[root];
        if (meaning) {
          meaning = meaning + ` <i>(from root: ${root})</i>`;
          matchedKey = root;
        }
      }

      if (meaning) {
        resultMatches.push({ word: words[i], meaning: meaning });
        runningContextMap[matchedKey] = dictionaryCache[matchedKey];
      } else {
        resultMatches.push({ word: words[i], meaning: '<span style="color:gray">❌ Not found</span>' });
      }
      i++;
    }
  }
  return { htmlResults: resultMatches, contextMap: runningContextMap, wordCount: words.length };
}

async function processText(selectedText) {
  if (!selectedText || !selectedText.trim()) return;
  selectedText = selectedText.trim();

  if (!dictionaryCache) {
    document.getElementById('meaning').innerHTML = '⚠️ Please select/load your local database folder first.';
    return;
  }

  customUserDB = databaseDirectory ? await readCustomTraining(databaseDirectory) : {};
  const lookup = searchDictionary(selectedText);

  let html = '';
  let i = 1;

  lookup.htmlResults.forEach(item => {
    const lk = item.word.toLowerCase();
    let meaning = item.meaning;
    let sourcesuffix = "";

    if (customUserDB[lk]) {
      meaning = customUserDB[lk];
      sourcesuffix = ` <span style="color:#e67e22; font-size:11px;">(★ Custom Trained Memory)</span>`;
      lookup.contextMap[lk] = meaning;
    }

    html += `<div class="entry"><span class="word">${i}. ${item.word}</span>: ${meaning}${sourcesuffix}</div>`;
    i++;
  });

  document.getElementById('meaning').innerHTML = html;

  const translationContainer = document.getElementById('translation-container');
  const translationDiv = document.getElementById('translation');

  // Keep compatibility with builds that contain the Gemini translation area.
  if (translationContainer && translationDiv && lookup.wordCount > 2) {
    translationContainer.style.display = "block";
    translationDiv.innerHTML = '<span class="loading">Gemini is applying context rules...</span>';
    const integratedContext = Object.assign({}, lookup.contextMap, customUserDB);
    const apiResult = await translateSentenceWithContext(selectedText, integratedContext);
    translationDiv.textContent = apiResult;
  } else if (translationContainer) {
    translationContainer.style.display = "none";
  }
}

async function translateSentenceWithContext(sentence, dictionaryContext) {
  // Keep the existing API behavior if GEMINI_API_KEY is supplied elsewhere.
  if (typeof GEMINI_API_KEY === 'undefined') return "⚠️ Gemini API key is not configured.";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  const prompt = `You are a specialized translator translating English to the Rongmei language.
Target Text to translate: [${sentence}]

CRITICAL DICTIONARY MAPPING RULES:
You must strictly use the exact vocabulary, tokens, and definitions provided in this verified dataset mapping:
${JSON.stringify(dictionaryContext, null, 2)}

TRANSLATION INSTRUCTIONS:
1. Do not use generic pre-trained linguistic datasets or fallback translation models for Rongmei vocabulary.
2. Construct the sentence structure only using the words provided in the mapping context block above.
3. If an English token is missing from the dataset context map, match its intent using closest structural root words available in the mapping, or transliterate it strictly under the rules of the Rongmei language script environment.

OUTPUT FORMAT PATTERN:
Direct Translation: [Write the calculated Rongmei text here]
Sample Layout / Variations: [Write a single-line alternative phrasing here using the mapping framework. No explanations.]

Do not include any conversational text, descriptions, introductions, or structural footnotes in your final response.`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({contents:[{parts:[{text:prompt}]}],generationConfig:{temperature:0.05}})
    });
    const json = await response.json();
    if (json.candidates && json.candidates[0]?.content?.parts?.[0]?.text) {
      return json.candidates[0].content.parts[0].text.trim();
    }
    return "⚠️ Unable to isolate translation text strings.";
  } catch (err) {
    return "⚠️ Network execution fault.";
  }
}

async function saveCustomTrainingFile() {
  if (!databaseDirectory) {
    alert('Please select a local database folder first.');
    return;
  }

  const engText = document.getElementById('customEnglish').value.trim().toLowerCase();
  const rongmeiText = document.getElementById('customRongmei').value.trim();

  if (!engText || !rongmeiText) {
    alert("Please fill out both English and Rongmei fields to update database rules.");
    return;
  }

  const safeEng = engText.replace(/[\t\r\n]+/g,' ').trim();
  const safeRongmei = rongmeiText.replace(/[\t\r\n]+/g,' ').trim();
  customUserDB[safeEng] = safeRongmei;

  try {
    if (!await verifyDirectoryPermission(databaseDirectory, true)) {
      throw new Error('Write permission to the database folder was denied.');
    }
    const fileHandle = await databaseDirectory.getFileHandle('custom-training.txt', {create:true});
    const lines = [
      '# Rongmei Dictionary Custom Training Data',
      '# Plain-text TSV format: English<TAB>Rongmei',
      '# Edit this file directly if required.',
      ''
    ];
    for (const [eng, rongmei] of Object.entries(customUserDB)) {
      lines.push(`${eng}\t${rongmei}`);
    }

    const writable = await fileHandle.createWritable();
    await writable.write(lines.join('\r\n') + '\r\n');
    await writable.close();

    alert(`Saved rule for "${safeEng}" to custom-training.txt in the selected database folder.`);
    document.getElementById('customEnglish').value = "";
    document.getElementById('customRongmei').value = "";
    processText(document.getElementById('manualInput').value);
  } catch (err) {
    alert(`Unable to save custom training data: ${err.message || err}`);
  }
}

document.getElementById('saveFeedBtn').addEventListener('click', saveCustomTrainingFile);

document.getElementById('searchBtn').addEventListener('click', () => {
  processText(document.getElementById('manualInput').value);
});

document.getElementById('manualInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') processText(document.getElementById('manualInput').value);
});

chrome.runtime.onMessage.addListener((message) => {
  if (!message || message.type !== 'rongmeiSelection') return;
  const activeText = String(message.text || '').trim();
  if (!activeText) return;

  const input = document.getElementById('manualInput');
  if (input) input.value = activeText;
  if (dictionaryCache) processText(activeText);
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.selectedText && changes.selectedText.newValue) {
    const activeText = changes.selectedText.newValue.trim();
    if (activeText) {
      document.getElementById('manualInput').value = activeText;
      if (dictionaryCache) processText(activeText);
    }
  }
});

window.addEventListener('DOMContentLoaded', async () => {
  await restoreDatabase();
});
