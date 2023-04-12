# Project 3 README

## Description
This NodeJS project creates a simple website that allows users to register, login, and logout.
Certain pages are restricted to only authenticated or only unauthenticated users, and invalid page requests will be redirected.
The site valiates login attempts against stored user information to determine whether a login attempt is legitimate.
All authentication and redirection actions are logged to a local file.

Note: For ease of use, I allowed the .env file (which contains the secret used to hash passwords) to upload to GitHub.
I realize that this is an abysmal security decision and something that would never be allowed in a production environment!

## How to Run the Project
1. Pull the it3038c-scripts/project2/ folder down to your local machine
2. Navigate to your local project2/ folder via the command line
3. Run `npm install` to install all the modules that npm finds in package.json (make sure you have npm installed first)
4. Run `node server.js` (make sure you have node installed first)
5. Type `localhost:3000/` into a web browser
6. Explore the site: register, login, logoff, etc
7. Check the `project2_logs.txt` file when finished

## Project Inspiration

## My Contributions
I edited the code provided by the tutorial to increase readability and fix some errors (like the passport error above).
I also added all the comments to demonstrate my understanding of the code and refresh my memory when I return to the project later.
Finally, the logging functionality is all orginial code from me. That portion of the project was not included in the tutorial.