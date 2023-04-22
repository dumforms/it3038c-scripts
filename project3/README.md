# Project 2 README

## Description
This NodeJS project creates a simple website that allows users to register, login, and logout.
Certain pages are restricted to only authenticated or only unauthenticated users, and invalid page requests will be redirected.
The site valiates login attempts against stored user information to determine whether a login attempt is legitimate.
User data is stored in an attached MongoDB instance.

## How to Run the Project
### Part 1: Install MongoDB
- Follow the instructions here: https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/

### Part 2: Pull the Project from GitHub
1. Pull the it3038c-scripts/project3/ folder down to your local machine
2. Navigate to your local /project3/ folder via the command line
3. Make sure you have node and npm installed
4. Run `npm install` to install all the modules that npm finds in package.json

### Part 3: Create the environment file
1. Create a file called `.env` in the /project3/ folder
2. Add the following code to the file:
`PORT=3000
DATABASE_URL=mongodb://localhost/users
SESSION_SECRET=supersecret
NODE_ENV=notProduction`
3. Save the file

### Part 4: Run the web server and browse
1. Run `node server.js` in the command line from Part 2 (You should see a `Connected to Mongoose` response in the terminal
2. Type `localhost:3000/` into a web browser
3. Explore the site: register, login, logoff, etc
4. Restart the program and run it again (notice how it saves users)

## Project Inspiration
I was inspired by projects from the Web Dev Simplified YouTube channel. I took some ideas from a full stack playlist (https://www.youtube.com/playlist?list=PLZlA0Gpn_vH8jbFkBjOuFjhxANC63OmXM) and another simple MongoDB tutorial (https://www.youtube.com/watch?v=fgTGADljAeg)

## My Contributions
I combined the login code from Project 2 with the database tutorials from the above playlists to create an original application. Getting the two projects to work together required a significant amount of original effort and research on my part.

## Required Modules (and why)
### Always Required
- bcrypt (hash user passwords)
- body-parser (url encoding and parsing)
- ejs (dynamic html variables)
- express (interactive html forms)
- express-ejs-layouts (like methods but for HTML)
- express-flash (display html message upon form submission)
- espress-session (track user across site pages)
- method-override (better HTML functionality, provides access to PUT and DELETE)
- mongoose (MongoDB connection)
- passport (user authentication)
- passport-local (local-specific user authentication)
### Development Only (still needed for peer review)
- dotenv (environment variables)
- nodemon (utility that restarts the server every time code changes are detected)

## Potnetial Future Improvements
- add email verification that sends an email to the submitted address
- improve HTML to make the site more interactive and user-friendly
- add user preferences that can be stored and applied when a user logs in (e.g. dark mode)
- add 3rd-party authentication (Google, Facebook, etc)
