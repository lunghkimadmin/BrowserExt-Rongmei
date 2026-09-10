# BrowserExt-Rongmei
Rongmei Dictionary for Browser as Extension using Localize "json" dictionaries.
Author: Lunghkim Gangmei

RONGMEI LOCAL DICTIONARY
Version 1.5.0
User Guide and Installation Instructions


============================================================
1. ABOUT THIS VERSION
============================================================

Rongmei Local Dictionary v1.5.0 is a browser extension designed to
work with your own local Rongmei dictionary JSON database files.

This version is designed for local/offline dictionary use.

IMPORTANT:
- The database is LOCAL.
- The extension does not require an online dictionary server.
- The dictionary JSON files are selected from a folder on your computer.
- The password/encryption system from the previous version has been
  removed.
- Dictionary JSON files used by this version should be ordinary,
  readable/plain JSON files.
- Custom Training Data is stored as ordinary plain text in the same
  database folder as your JSON files.


============================================================
2. WHAT HAS CHANGED IN VERSION 1.5.0
============================================================

A. PASSWORD REMOVED
-------------------
There is no password protection or password entry in v1.5.0.

You do not need to enter a password when starting the extension or
changing the database.

This also means that the local dictionary JSON files are NOT encrypted
by the extension.

If your old v1.4.x files are encrypted, they must first be converted/
exported to plain JSON before they can be used directly by v1.5.0.


B. NUMBER OF JSON DATABASE FILES
--------------------------------
When the extension starts for the first time, it asks you how many
JSON database files you want to use.

For example, if you have:

    dictionary-01.json
    dictionary-02.json
    dictionary-03.json

you can specify 3 database files.

The extension then uses the JSON dictionary files from the selected
local database folder.

The number can be changed later when you change to another database.


C. CHANGE DATABASE
------------------
You can change the database whenever you need to.

Use the extension's "Change Database" function to select another local
database folder and specify the number of JSON files to use.

This makes it possible to keep different dictionary collections in
different folders.

Example:

    D:\Rongmei\Dictionary-2026\
    D:\Rongmei\Old-Dictionary\
    E:\Rongmei\Research-Database\


D. CUSTOM TRAINING DATA
-----------------------
The "Feed Custom Training Data" feature now saves its data as a normal
plain-text file.

The file name is:

    custom-training.txt

It is saved in the SAME FOLDER where your selected JSON dictionary
files are located.

Example:

    D:\Rongmei\Dictionary\
        dictionary-01.json
        dictionary-02.json
        dictionary-03.json
        custom-training.txt

The custom-training.txt file is ordinary readable text and can be
opened with Notepad, Notepad++, VS Code, or another text editor.

The data is stored in a simple tab-separated format:

    English<TAB>Rongmei

This makes the training data easier to inspect, back up, copy, and
move together with the dictionary database.


============================================================
3. WHERE IS MY DATA STORED?
============================================================

The dictionary data is stored wherever YOU keep the JSON files.

The extension does not move your dictionary JSON files to an online
server.

For example, if you select:

    C:\Rongmei\MyDictionary\

the dictionary files remain there.

The custom training file will also be created there:

    C:\Rongmei\MyDictionary\custom-training.txt


IMPORTANT:
The extension's local browser settings may remember which database
folder/configuration you selected. This is separate from the actual
JSON dictionary files.

BACKUP RECOMMENDATION:
Always keep a backup copy of your entire dictionary folder.

For example:

    MyDictionary\
        dictionary-01.json
        dictionary-02.json
        custom-training.txt

Copy the complete folder to another drive or backup location.


============================================================
4. BEFORE INSTALLING
============================================================

You should have:

1. A supported modern browser.
2. The Rongmei Local Dictionary v1.5.0 ZIP file.
3. Your plain JSON dictionary files.
4. A folder where those JSON files will be kept.

Example database folder:

    C:\RongmeiDictionary\

Put your JSON files in that folder.

Example:

    C:\RongmeiDictionary\dictionary-01.json
    C:\RongmeiDictionary\dictionary-02.json


============================================================
5. HOW TO INSTALL A BROWSER
============================================================

You may already have a browser installed. If so, you can skip this
section.

A. GOOGLE CHROME
----------------
1. Open your existing browser.
2. Search for the official Google Chrome website.
3. Download Google Chrome from the official Google website.
4. Run the installer.
5. Follow the instructions on the screen.
6. Start Chrome after installation.

Do not download browsers from unknown third-party download websites.


B. BRAVE
--------
1. Open your existing browser.
2. Search for the official Brave website.
3. Download Brave from the official Brave website.
4. Run the installer.
5. Follow the installation instructions.
6. Start Brave.


C. OPERA
--------
1. Open your existing browser.
2. Search for the official Opera website.
3. Download Opera from the official Opera website.
4. Run the installer.
5. Follow the installation instructions.
6. Start Opera.


D. MICROSOFT EDGE
-----------------
Microsoft Edge is normally already installed with Windows.

If it is available:
1. Open Microsoft Edge.
2. Type the extension-management address described below, or open
   the Extensions menu.
3. Continue with the Edge installation instructions in Section 7.


E. SAFARI
---------
Safari is Apple's browser and is primarily used on macOS/iPhone/iPad.

IMPORTANT:
This package is a Chromium-style unpacked browser extension. It is
NOT a signed Safari App Store extension.

Therefore, the Chrome/Brave/Edge/Opera installation instructions in
this README should not be assumed to work directly in Safari.

For Safari, a separate Safari Web Extension package/project may be
required. Safari also has additional signing/developer requirements.

If Safari support is specifically required, use a Safari-compatible
build of the extension rather than treating this ZIP as a native Safari
extension.


============================================================
6. EXTRACT THE ZIP FILE
============================================================

Before loading the extension, extract the ZIP file.

On Windows:

1. Locate:
       RongmeiLocal_v1.5.0.zip

2. Right-click the ZIP file.

3. Select:
       Extract All...

4. Choose a permanent location.

5. Click Extract.

IMPORTANT:
Do NOT delete the extracted extension folder after installing it.

The browser loads the extension from this folder.

If you move or delete the folder later, the unpacked extension may stop
working or need to be loaded again.


============================================================
7. INSTALL THE EXTENSION
============================================================

The extension is normally installed as an "unpacked extension".

This means you do NOT install it by double-clicking the ZIP file.

You load the extracted extension folder through the browser's
Developer/Extensions page.


------------------------------------------------------------
A. GOOGLE CHROME
------------------------------------------------------------

1. Open Google Chrome.

2. Open the Extensions page:
       chrome://extensions/

3. Turn ON:
       Developer mode

   Developer mode is normally found near the upper-right corner.

4. Click:
       Load unpacked

5. Select the extracted Rongmei Local Dictionary v1.5.0 folder.

6. Click Select Folder.

7. The extension should now appear in your Extensions list.

8. Pin the Rongmei Dictionary extension if desired:
   - Click the Extensions/puzzle-piece icon.
   - Find Rongmei Local Dictionary.
   - Click the Pin icon.

9. Click the Rongmei Dictionary icon to open it.


------------------------------------------------------------
B. MICROSOFT EDGE
------------------------------------------------------------

1. Open Microsoft Edge.

2. Open:
       edge://extensions/

3. Turn ON:
       Developer mode

4. Click:
       Load unpacked

5. Select the extracted Rongmei Local Dictionary v1.5.0 folder.

6. Click Select Folder.

7. The extension should appear in the extension list.

8. You may pin the extension to the Edge toolbar.

9. Click the extension icon to use it.


------------------------------------------------------------
C. BRAVE
------------------------------------------------------------

Brave is Chromium-based and normally uses the same unpacked-extension
installation method.

1. Open Brave.

2. Open:
       brave://extensions/

3. Turn ON:
       Developer mode

4. Click:
       Load unpacked

5. Select the extracted Rongmei Local Dictionary v1.5.0 folder.

6. Click Select Folder.

7. The extension should appear.

8. Pin the extension if desired.

9. Click its icon to open it.


------------------------------------------------------------
D. OPERA
------------------------------------------------------------

Opera is also Chromium-based.

Depending on the Opera version, the Extensions page can be reached
through Opera's Extensions menu or its extensions-management page.

Typical procedure:

1. Open Opera.

2. Open the Extensions page.

3. Enable:
       Developer mode

4. Choose:
       Load unpacked
   (The exact wording/location can vary by Opera version.)

5. Select the extracted Rongmei Local Dictionary v1.5.0 folder.

6. Confirm the installation.

7. Pin/open the extension from the Opera toolbar or Extensions menu.

If your Opera version does not show "Load unpacked", check Opera's
current extension/developer documentation because Opera's interface
can change between versions.


------------------------------------------------------------
E. OTHER CHROMIUM-BASED BROWSERS
------------------------------------------------------------

The same basic procedure normally works in Chromium-based browsers
such as Vivaldi, Chromium, and many other browsers:

1. Open the browser's Extensions page.
2. Enable Developer mode.
3. Choose Load unpacked.
4. Select the extracted extension folder.
5. Confirm.
6. Pin the extension if desired.

The exact Extensions-page address and menu names can differ.


------------------------------------------------------------
F. SAFARI
------------------------------------------------------------

This v1.5.0 ZIP is not a native signed Safari extension package.

Do not expect the Chrome/Brave/Edge/Opera "Load unpacked" procedure to
work directly in Safari.

For Safari deployment, the extension must be packaged as a Safari Web
Extension and normally requires Apple's development/signing workflow.

If Safari is an important target, obtain a Safari-specific build of
Rongmei Local Dictionary rather than modifying this ZIP manually.


============================================================
8. FIRST START / DATABASE SETUP
============================================================

After installation:

1. Open the Rongmei Local Dictionary extension.

2. On first setup, enter the NUMBER OF JSON DATABASE FILES you want to
   use.

Example:

    Number of JSON files: 3

3. Select the folder containing the JSON dictionary files.

Example:

    C:\RongmeiDictionary\

4. The extension will use the JSON files in that database folder.

Make sure the JSON files are valid, ordinary JSON files.

Example:

    C:\RongmeiDictionary\
        dictionary-01.json
        dictionary-02.json
        dictionary-03.json


============================================================
9. CHANGING TO A NEW DATABASE
============================================================

You can change databases whenever you want.

For example, you may have:

DATABASE A:

    C:\Rongmei\MainDictionary\

and DATABASE B:

    D:\Rongmei\ResearchDictionary\

To change:

1. Open Rongmei Local Dictionary.
2. Choose "Change Database".
3. Enter the number of JSON files for the new database.
4. Select the new database folder.
5. Allow the extension to reload/use the new database.

Your old JSON files are not automatically deleted.

The database is simply changed to the newly selected location.


============================================================
10. FEED CUSTOM TRAINING DATA
============================================================

The Custom Training feature allows you to add useful word/meaning
information to the local training data.

The saved file is:

    custom-training.txt

It is stored in the SAME FOLDER as the selected JSON dictionary files.

Example:

    D:\RongmeiDictionary\
        dictionary-01.json
        dictionary-02.json
        custom-training.txt

This is intentionally a normal text file.

You can:
- Open it.
- Read it.
- Back it up.
- Copy it to another computer.
- Edit it carefully with a text editor.

The basic data format is:

    English<TAB>Rongmei

The separator is a TAB character.

Do not casually replace TAB characters with spaces if you want the
extension to continue reading the data correctly.


============================================================
11. BACKING UP YOUR DICTIONARY
============================================================

For safety, back up the complete database folder.

Example:

    RongmeiDictionary\
        dictionary-01.json
        dictionary-02.json
        dictionary-03.json
        custom-training.txt

Recommended backup:

    Backup\
        RongmeiDictionary\
            dictionary-01.json
            dictionary-02.json
            dictionary-03.json
            custom-training.txt

The most important files to back up are:

1. Your JSON dictionary files.
2. custom-training.txt


============================================================
12. MOVING THE DATABASE TO ANOTHER COMPUTER
============================================================

You can copy the complete dictionary folder to another computer.

For example:

OLD COMPUTER:

    C:\RongmeiDictionary\

Copy the entire folder to:

NEW COMPUTER:

    D:\RongmeiDictionary\

Then:

1. Install the browser.
2. Install/load the Rongmei Local Dictionary extension.
3. Open the extension.
4. Choose Change Database if necessary.
5. Select the copied database folder.
6. Enter the correct number of JSON files.


============================================================
13. IMPORTANT: OLD ENCRYPTED DATABASES
============================================================

If you used an older Rongmei Dictionary version that encrypted the
JSON files, those encrypted JSON files are not ordinary JSON data.

For example, a file may still have a ".json" extension but contain
encrypted data.

Changing the extension to v1.5.0 does NOT decrypt those files.

v1.5.0 expects usable/plain JSON dictionary files.

Therefore:

OLD VERSION
    Encrypted JSON
          |
          | one-time migration/decryption
          v
NEW VERSION
    Plain JSON
          |
          +--> v1.5.0 uses it locally without a password

Keep a backup of the original encrypted files until you have verified
that the plain JSON files are correct.


============================================================
14. PRIVACY AND LOCAL DATA
============================================================

The purpose of this version is local dictionary operation.

Your dictionary JSON files are kept in the folder you select.

Your Custom Training Data is also kept locally as:

    custom-training.txt

The extension does not require you to upload your dictionary database
to an online dictionary service.

However, remember that normal browser extensions run inside the browser
and browser permissions/features can vary by browser. Review the
extension's permissions if your browser displays them.


============================================================
15. TROUBLESHOOTING
============================================================

PROBLEM: "Load unpacked" is not visible.
------------------------------------------------
Solution:
- Make sure Developer mode is enabled.
- Make sure you are on the browser's Extensions page.
- Use a Chromium-based browser such as Chrome, Edge, Brave, or Opera.


PROBLEM: The extension does not load.
------------------------------------------------
Solution:
- Make sure you selected the EXTRACTED extension folder, not the ZIP
  file.
- Make sure the folder contains the extension's files, including its
  manifest file.
- Re-extract the ZIP if necessary.


PROBLEM: Dictionary words do not appear.
------------------------------------------------
Solution:
- Check that the selected folder contains the expected JSON files.
- Check that the number of JSON files entered during setup is correct.
- Make sure the JSON files are valid and are not still encrypted.
- Use Change Database to select the correct folder again.


PROBLEM: Custom training data is missing.
------------------------------------------------
Solution:
- Look in the SAME folder as the selected JSON database files.
- Look for:
      custom-training.txt
- Make sure you are checking the currently selected database folder.


PROBLEM: I moved the extension folder.
------------------------------------------------
Solution:
- Open the browser's Extensions page.
- Remove the old broken unpacked entry if necessary.
- Use Load unpacked again and select the new extension folder.


PROBLEM: I changed the JSON files manually.
------------------------------------------------
Solution:
- Close/reopen or reload the extension as appropriate.
- Make sure the edited JSON remains valid JSON.
- Always keep a backup before making manual database changes.


============================================================
16. RECOMMENDED FOLDER STRUCTURE
============================================================

A clean setup is:

    C:\RongmeiDictionary\
    |
    +-- dictionary-01.json
    +-- dictionary-02.json
    +-- dictionary-03.json
    +-- custom-training.txt

You can use any suitable folder and any suitable JSON filenames, as
long as the extension recognizes the files according to its database
selection process.


============================================================
17. IMPORTANT SAFETY / DATA RECOMMENDATIONS
============================================================

1. Keep a backup of your JSON files.
2. Keep a backup of custom-training.txt.
3. Do not delete the original database while testing a new database.
4. Do not edit JSON manually unless you understand JSON formatting.
5. Do not replace TAB characters in custom-training.txt with ordinary
   spaces.
6. Keep the extension folder in a permanent location.
7. Do not download modified copies of the extension from unknown
   websites.
8. If something goes wrong, restore your database from your backup.


============================================================
18. QUICK START
============================================================

For an experienced user:

1. Extract RongmeiLocal_v1.5.0.zip.
2. Open the browser's Extensions page.
3. Enable Developer mode.
4. Select Load unpacked.
5. Select the extracted Rongmei Local Dictionary folder.
6. Open the extension.
7. Enter the number of JSON database files.
8. Select the folder containing those JSON files.
9. Start using the dictionary.
10. Use Feed Custom Training when needed.
11. Find the training data at:

       <your selected JSON folder>\custom-training.txt

12. Back up the complete database folder regularly.


============================================================
19. VERSION
============================================================

Rongmei Local Dictionary
Version: 1.5.0

Main changes:
- Password removed.
- Encryption removed from the new database workflow.
- Local JSON database selection.
- User specifies the number of JSON database files.
- Database can be changed later.
- Custom Training Data saved as plain text.
- Custom Training Data stored in the selected JSON database folder.


============================================================
END OF README
============================================================
