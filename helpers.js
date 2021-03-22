/* Checks to see if there is a session and returns a "session" var: true or false to use
in views.
*/
function getSession(request){
    let session;
    let passport = request.session.passport;
    if (passport == null || Object.keys(passport).length < 1){
        return session = false;
    } else {
        return session = true;
    }
}
/* Checks to see if there is a user in session and if there is returns 
that user's username to use in views.
*/
function getUser(request){
    let username;
    let user = request.user;
    if (user == null){
        return username = false;
    } else {
        return username = request.user.username;
    }
}

module.exports = {
    getSession,
    getUser
};
