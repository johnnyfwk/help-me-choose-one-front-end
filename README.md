# HelpMeChooseOne.com - Frontend

HelpMeChooseOne.co.uk is a full-stack app where users can help each other make choices through a voting system.

The app was built using PostgreSQL, Express, React, and Node.js.

Live URL: https://helpmechooseone.com/

The frontend was created using React and uses Axios to request user, post, comment, and report data from the backend (Github repo: https://github.com/johnnyfwk/help-me-choose-one-back-end).

To run this project locally:
- go to the Github repo at https://github.com/johnnyfwk/help-me-choose-one-front-end;
- near the top of the page, click on the button labeled 'Code';
- in the 'Local' tab, copy the HTTPS URL 'https://github.com/johnnyfwk/help-me-choose-one-front-end.git';
- in Terminal, go to the folder you want to clone the repo;
- type 'git clone https://github.com/johnnyfwk/help-me-choose-one-front-end.git' to copy the repo to your local machine;
- type 'cd help-me-choose-one-front-end' to go that folder;
- type 'npm install' to install all the packages that the project requires to run;
- to create the database and seed the tables required for this project, follow the instructions in the backend readme at https://github.com/johnnyfwk/help-me-choose-one-back-end;
- in the api.js file located in the 'src' folder, change the baseUrl to 'http://localhost:9090/bE2uT8XzAqG1yJ6fNvL3';
- type 'npm start' to run the React project;
- your browser should automatically display the app; if it doesn't, type 'http://localhost:3000/' into your browser.