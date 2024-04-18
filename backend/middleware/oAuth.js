var axios = require("axios");

const tokenEnpoint = "https://ambient-coder.us.auth0.com/oauth/token";

const oAuth = (req, res, next) => {
    var code = req.query.code;

    if(!code) {
        res.status(401).send("Missing authorization code");
    }

    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("client_id", "0wJO3AmME3X6Njoo6oMemHpMp036zO8M");
    params.append("client_secret", "yc0xHWgcT6jW0n6cPQJ4KwZ5TUXXg7eU7yj952I5oJku9jpAL2JJR3SXYVZF79FE");
    params.append("code", code);
    params.append("redirect_uri", "https://localhost:3000/home");

    axios.post(tokenEnpoint, params)
    .then(response => {
        req.oauth = response.data;
        next();
    })
    .catch(err => {
        console.log(err);
        res.status(403).json('Reason : ${err.message}');
    })

}

module.exports = oAuth;