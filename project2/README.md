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

## Required Modules
- bcrypt
- dotenv
- ejs
- express
- express-flash
- espress-session
- method-override
- nodemon
- passport
- passport-local
