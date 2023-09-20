// Libraries
const express = require('express')
const app = express()
const slugify = require('slugify')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const db = require('./database/db')
const date = require('./js/date')
// Middlewares
const Auth = require('./middlewares/Auth')
const adminAuth = Auth.adminAuth
const secretAuth = Auth.secretAuth
const masterKey = Auth.masterKey


// Configuration
port = 8080
app.use(cors())
app.use(express.json())


// Initialization
app.listen(port, () => {
    console.log(`Rumo ao Futuro (API) inicializada com sucesso no endereço: http://localhost:${port}`)
})


// Routes
app.get('/', (req, res) => {
    try{
        db.select().from('news').then(news => {
            db.select('id', 'name').from('admins').then(admins => {
                res.statusCode = 200
                res.json({news, admins})
            }).catch(error => {
                res.statusCode = 200
                res.json({error})
            })
        }).catch(error => {
            res.statusCode = 200
            res.json({error})
        })
    }catch{
        res.statusCode = 200
        res.json({erro: 'Ocorreu um erro interno.'})
    }
})

app.get('/news/latest', (req, res) => {
    try{
        db.select().orderBy('publishedDate', 'desc').limit(1).from('news').then(news => {
            res.statusCode = 200
            res.json({news})
        }).catch(error => {
            res.statusCode = 200
            res.json({error})
        })
    }catch{
        res.statusCode = 200
        res.json({erro: 'Ocorreu um erro interno.'})
    }
})

app.get('/news/my-news', adminAuth, (req, res) => {
    var id = req.user.id
    var you = req.user.name
    try{
        db.select().where({author: id}).from('news').then(news => {
            res.statusCode = 200
            res.json({news, you})
        }).catch(error => {
            res.statusCode = 200
            res.json({error})
        })
    }catch{
        res.statusCode = 200
        res.json({erro: 'Ocorreu um erro interno.'})
    }
})

app.post('/news/create', adminAuth, (req, res) => {
    var title = req.body.title
    var slug = slugify(title, {lower: true})
    var subtitle = req.body.subtitle
    var content = req.body.content
    var author = req.body.author
    var publishedDate = date((Date.now()) - 10800000)

    if(title == undefined || title == '' || title == ' '){
        res.statusCode = 200
        res.json({erro: 'O campo "título" não pode ser vazio!'})
        return
    }else if(subtitle == undefined || subtitle == '' || subtitle == ' '){
        res.statusCode = 200
        res.json({erro: 'O campo "subtítulo" não pode ser vazio!'})
        return
    }else if(content == undefined || content == '' || content == ' '){
        res.statusCode = 200
        res.json({erro: 'O campo "conteúdo" não pode ser vazio!'})
        return
    }else if(author == undefined || author == '' || author == ' '){
        res.statusCode = 200
        res.json({erro: 'O campo "autor" não pode ser vazio!'})
        return
    }else{
        try{
            db.select().where({slug}).from('news').then(data => {
                if(data.length === 0){
                    db.insert({title, slug, subtitle, content, author, publishedDate}).into('news').then(() => {
                        res.statusCode = 200
                        db.select('id').where({slug}).from('news').then(data => {
                            res.json({msg: 'Notícia salva com sucesso!', id: data[0].id})
                        })
                    }).catch(error => {
                        res.statusCode = 200
                        res.json({error})
                    })
                }else{
                    res.statusCode = 200
                    res.json({erro: 'Já existe uma notícia cadastrada com esse título.'})
                }
            })
        }catch{
            res.statusCode = 200
            res.json({erro: 'Ocorreu um erro interno.'})
        }
    }
})

app.patch('/news/update/:id', adminAuth, (req, res) => {
    var id = req.params.id
    var title = req.body.title
    var slug = slugify(title, {lower: true})
    var subtitle = req.body.subtitle
    var content = req.body.content
    var author = req.body.author
    var updatedDate = date((Date.now()) - 10800000)

    try{
        db.select('author').where({id}).from('news').then(data => {
            if(data[0].author == author){
                db.update({title, slug, subtitle, content, updatedDate}).where({id}).from('news').then(() => {
                    res.statusCode = 200
                    res.json({msg: 'Notícia alterada com sucesso!'})
                }).catch(error => {
                    res.json({error})
                })
            }else{
                res.statusCode = 200
                res.json({erro: 'Você não é o(a) autor(a) da notícia, portanto, não pode alterá-la.'})
            }
        })
    }catch{
        res.statusCode = 200
        res.json({erro: 'Ocorreu um erro interno.'})
    }
})

app.delete('/news/delete/:id', adminAuth, (req, res) => {
    var id = req.params.id

    db.delete().where({id}).from('news').then(() => {
        res.statusCode = 200
        res.json({msg: 'Notícia excluída com sucesso!'})
    }).catch(error => {
        res.statusCode = 200
        res.json({error})
    })
})

app.get('/news/byid/:id', adminAuth, (req, res) => {
    var id = req.params.id
    try{
        db.select().where({id}).from('news').then(data => {
            try{
                var author = data[0].author
                db.select('name').where({id: author}).from('admins').then(dataName => {
                    var title = data[0].title
                    var subtitle = data[0].subtitle
                    var content = data[0].content
                    var author = dataName[0].name
                    var publishedDate = data[0].publishedDate
                    var updatedDate = data[0].updatedDate
                    const news = {
                        title,
                        subtitle,
                        content,
                        author,
                        publishedDate,
                        updatedDate
                    }
                    res.statusCode = 200
                    res.json({news})
                })
            }catch{
                res.statusCode = 200
                res.json({erro: 'Essa notícia não foi encontrada.'})
            }
        })
    }catch{
        res.statusCode = 200
        res.json({erro: 'Ocorreu um erro interno.'})
    }
})

app.get('/news/byslug/:slug', (req, res) => {
    var slug = req.params.slug

    try{
        db.select().where({slug}).from('news').then(data => {
            try{
                var author = data[0].author
                db.select('name').where({id: author}).from('admins').then(dataName => {
                    var title = data[0].title
                    var subtitle = data[0].subtitle
                    var content = data[0].content
                    var author = dataName[0].name
                    var publishedDate = data[0].publishedDate
                    var updatedDate = data[0].updatedDate
                    const news = {
                        title,
                        subtitle,
                        content,
                        author,
                        publishedDate,
                        updatedDate
                    }
                    res.statusCode = 200
                    res.json({news})
                }).catch(error => {
                    res.statusCode = 200
                    res.json({error})
                })
            }catch{
                res.statusCode = 200
                res.json({erro: 'Essa notícia não foi encontrada.'})
            }
        })
    }catch{
        res.statusCode = 200
        res.json({erro: 'Ocorreu um erro interno.'})
    }
})

app.get('/questions/areas', (req, res) => {
    try{
        db.select('id', 'area').from('areas').then(areas => {
            res.statusCode = 200
            res.json({areas})
        }).catch(error => {
            res.statusCode = 200
            res.json({error})
        })
    }catch{
        res.statusCode = 200
        res.json({erro: 'Ocorreu um erro interno.'})
    }
})

app.post('/questions/areas/new', adminAuth, (req, res) => {
    var area = req.body.area
    if(area != undefined && area != '' && area != ' '){
        try{
            db.insert({area}).into('areas').then(() => {
                res.statusCode = 200
                res.json({msg: 'Área de conhecimento cadastrada com sucesso!'})
            }).catch(error => {
                res.statusCode = 200
                res.json({error})
            })
        }catch{
            res.statusCode = 200
            res.json({erro: 'Ocorreu um erro interno.'})
        }
    }
})

app.delete('/questions/areas/delete/:id', adminAuth, (req, res) => {
    var id = req.params.id
    try{
        db.delete().where({id}).from('areas').then(() => {
            res.statusCode = 200
            res.json({msg: 'Área de conhecimento excluída com sucesso!'})
        }).catch(() => {
            res.statusCode = 200
            res.json({erro: 'Não foi possível excluir a área.'})
        })
    }catch{
        res.statusCode = 200
        res.json({erro: 'Ocorreu um erro interno.'})
    }
})

app.get('/questions', (req, res) => {
    try{
        db.select().from('questions').then(questions => {
            res.json({questions})
        }).catch(error => {
            res.statusCode = 200
            res.json({error})
        })
    }catch{
        res.statusCode = 200
        res.json({erro: 'Ocorreu um erro interno.'})
    }
})

app.post('/questions/new', adminAuth, (req, res) => {
    var question = req.body.question
    var area = req.body.area
    var points = req.body.points
    if(area != undefined && area != '' && area != ' '){
        try{
            db.insert({
                question,
                area,
                points
            }).into('questions').then(() => {
                res.statusCode = 200
                res.json({msg: 'Questão cadastrada com sucesso!'})
            }).catch(() => {
                res.statusCode = 200
                res.json({erro: 'Ocorreu um erro interno.'})
            })
        }catch{
            res.statusCode = 200
            res.json({erro: 'Ocorreu um erro interno.'})
        }
    }
})

app.delete('/questions/delete/:id', adminAuth, (req, res) => {
    id = req.params.id
    try{
        db.delete().where({id}).from('questions').then(() => {
            res.statusCode = 200
            res.json({msg: 'Questão deletada com sucesso!'})
        }).catch(error => {
            res.statusCode = 200
            res.json({error})
        })
    }catch{
        res.statusCode = 200
        res.json({erro: 'Ocorreu um erro interno.'})
    }
})

app.post('/register', (req, res) => {
    var name = req.body.name
    var username = req.body.username
    if(req.body.password == req.body.passwordRepeat){
        var password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(7))
    }else{
        res.statusCode = 200
        res.json({erro: 'As senhas não coincidem.'})
    }
    var master = req.body.master

    if(bcrypt.compareSync(master, masterKey) && username != undefined && username != '' && username != ' ' && password != undefined && password != '' && password != ' ' && name != undefined && name != '' && name != ' '){
        try{
            db.select().where({username}).from('admins').then(data => {
                if(data.length === 0){
                    db.insert({name, username, password}).into('admins').then(() => {
                        res.statusCode = 200
                        res.json({msg: 'Usuário cadastrado com sucesso!'})
                    }).catch(error => {
                        res.statusCode = 200
                        res.json({error})
                    })
                }else{
                    res.statusCode = 200
                    res.json({erro: 'Já existe um usuário cadastrado com esse username.'})
                }
            }).catch(error => {
                res.statusCode = 200
                res.json({error})
            })
        }catch{
            res.statusCode = 200
            res.json({erro: 'Ocorreu um erro interno.'})
        }
    }else{
        res.statusCode = 200
        res.json({erro: 'Algum dos campos foi enviado vazio e/ou a senha mestra não está correta.'})
    }
})

app.post('/login', (req, res) => {
    var username = req.body.username
    var password = req.body.password

    if(username != undefined && username != '' && username != ' ' && password != undefined && password != '' && password != ' '){
        try{
            db.select().where({username}).from('admins').then(data => {
                if(data[0].length === 0){
                    res.statusCode = 200
                    res.json({erro: 'Usuário e/ou senha incorreto(s).'})
                }else{
                    if(bcrypt.compareSync(password, data[0].password)){
                        try{
                            jwt.sign({
                                id: data[0].id,
                                name: data[0].name
                            },
                            secretAuth,
                            {
                                expiresIn: '3h'
                            },
                            (error, token) => {
                                if(error){
                                    res.statusCode = 200
                                    res.json({erro: 'Falha ao criar token de usuário.'})
                                }else{
                                    res.json({token})
                                }
                            })
                        }catch{
                            res.statusCode = 200
                            res.json({erro: 'Falha ao criar token de usuário.'})
                            return
                        }
                    }else{
                        res.statusCode = 200
                        res.json({erro: 'Usuário e/ou senha incorreto(s).'})
                    }
                }
            }).catch(() => {
                res.statusCode = 200
                res.json({erro: 'Usuário e/ou senha incorreto(s).'})
            })
        }catch{
            res.statusCode = 200
            res.json({erro: 'Ocorreu um erro interno.'})
        }
    }else{
        res.statusCode = 200
        res.json({erro: 'Usuário e/ou senha não fornecido(s).'})
    }
})

app.get('/auth', adminAuth, (req, res) => {
    id = req.user.id
    you = req.user.name
    res.json({
        id,
        you
    })
})