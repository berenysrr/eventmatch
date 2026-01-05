WEB PROGRAMMING - FINAL PROJECT SUBMISSION Project Title: EventMatch (Interest-Based Event Recommendation Platform) Group Members:

Beren Yaşar

Aleyna Erdoğan

DEAR PROFESSOR,

In order to minimize the file size and provide a clean submission; I have deleted the 'node_modules' folder in the Frontend directory and the 'bin/obj' folders in the Backend directory before uploading.

Please follow the steps below in order to run the project smoothly on your computer:

STEP 1: DATABASE SETUP
Import the 'EventMatchDB.sql' file found in the folder using MySQL Workbench.

(If the schema is not created automatically during import, please create an empty schema named 'EventMatchDB' first, and then perform the import process.)

STEP 2: STARTING THE BACKEND (SERVER)
Open a terminal in the 'backend' folder directory.

Type the following command and press Enter: dotnet run

(The Backend will start running at http://localhost:5230)

STEP 3: STARTING THE FRONTEND (UI)
Open a new terminal and navigate to the 'frontend' folder directory.

To reinstall the dependencies (the 'node_modules' folder I deleted), run the following command: npm install

After the installation is complete, to open the site run: npm start

(The site will open at http://localhost:3000)

PROJECT NOTES
Admin Panel: Accessible via the '/admin' route or the "Admin" link in the menu. It has permission to delete events.

Recommendation System: When a user selects their interests from the Profile page, the "Recommended for You" section becomes active on the Home Page.

Filtering: City, Category, and Date-based filtering is functional on the Home Page.

Best regards.
