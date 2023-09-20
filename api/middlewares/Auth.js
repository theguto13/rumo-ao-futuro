// Libraries
const jwt = require('jsonwebtoken')
// Passwords / Codes / Secrets
const secretAuth = '3u!iKvX^DU01'
const masterKey = '$2a$07$hOxjSSc.wnholXKqQ.831O.4DJziGMhHBXg7g8fWcey.UJmkduGXa'


// Auth
function adminAuth(req, res, next){
    var authorization = req.headers['authorization']
    if(authorization != undefined && authorization != '' && authorization != ' '){
        authorization = authorization.split(' ')
        var token = authorization[1]
        if(token != undefined && token != '' && token != ' '){
            try{
                jwt.verify(token, secretAuth, {ignoreExpiration: false}, (error, data) => {
                    if(error){
                        res.statusCode = 200
                        res.json({erro: 'Usuário não permitido.', error})
                        return
                    }else{
                        req.user = {
                            id: data.id,
                            name: data.name
                        }
                        next()
                    }
                })
            }catch{
                res.statusCode = 200
                res.json({erro: 'Usuário não logado.'})
                return
            }
        }else{
            res.statusCode = 200
            res.json({erro: 'Usuário não logado.'})
            return
        }
    }else{
        res.statusCode = 200
        res.json({erro: 'Usuário não logado.'})
        return
    }
}


module.exports = {
    secretAuth,
    adminAuth,
    masterKey
}