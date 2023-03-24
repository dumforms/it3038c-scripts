# Project 2 README

## Source Tutorial
https://www.youtube.com/watch?v=-RCnNyD0L-s

Changes to the passport module since the video was published have rendered one portion (timestamp approximately 33:44) inaccurate.
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
