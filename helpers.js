
function getSession(request){
    let session;
    let passport = request.session.passport;
    if (passport == null || Object.keys(passport).length < 1){
        return session = false;
    } else {
        return session = true;
    }
}

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
