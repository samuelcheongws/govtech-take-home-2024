# govtech-take-home-2024
For GovTech Take home Assignment 2024



Node Setup (Recommended):
1. Run npm install from root
2. Run npm start from root

Access the app hosted on an EC2 instance here!
http://13.229.230.48:3000/

Assumptions:

Team Input or Edit:
In the first region we have the team input and editing area.
After the user inputs in the data and presses submit, the inputted data will appear below to confirm what has been inputted.
When user presses submit again, it will effectively overwrite the existing data in the box. 

Handles (ignores) extra spaces at the start and the end of the inputs.
If match results includes an unrecognised team, submission will not be possible and team name will be shown.


Docker Setup
1. docker-compose up --build
2. Go to localhost:3000 to access the website.