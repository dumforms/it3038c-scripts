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

### Part 4: Run the web server and browse
1. Run `node server.js` in the command line from Part 2
2. Type `localhost:3000/` into a web browser
3. Explore the site: register, login, logoff, etc
4. Restart the program and run it again (notice how it saves users)

## Project Inspiration
Most of the code for the login features came from this YouTube tutorial: https://www.youtube.com/watch?v=-RCnNyD0L-s

Changes to the passport module since the video was published have rendered one portion of the video inaccurate.
The solution, copied from a comment on the video, is below:

> Numbers Oficial
> 
> 33:44 - Since passport version 0.6.0, req.logout is asynchronous.
> 
> You will get the error: "req#logout requires a callback function." 
> To fix it, all you need to do is replace this:
> 
`app.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});`

> By this:
> 
`app.delete('/logout', (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  });
});`

## My Contributions
I edited the code provided by the tutorial to increase readability and fix some errors (like the passport error above).
I also added all the comments to demonstrate my understanding of the code and refresh my memory when I return to the project later.
Finally, the logging functionality is all orginial code from me. That portion of the project was not included in the tutorial.

## Required Modules (and why)
- fs (read/write log file)
- bcrypt (hash user passwords)
- dotenv (environment variables)
- ejs (dynamic html variables)
- express (interactive html forms)
- express-flash (display html message upon form submission)
- espress-session (track user across site pages)
- method-override (better logout functionality: override POST with DELETE)
- nodemon (utility that restarts the server every time code changes are detected)
- passport (user authentication)
- passport-local (local-specific user authentication)

## Future Improvements (Options for Project 3)
- add email verification that sends an email to the submitted address
- add a database to persistently store users even when the server is offline
- improve HTML to make the site more interactive and user-friendly
- add user preferences that can be stored and applied when a user logs in (e.g. dark mode)
- add 3rd-party authentication (Google, Facebook, etc)
