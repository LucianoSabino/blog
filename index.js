const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

const categoriesController = require("./categories/categorisController");
const ArticlesController = require("./articles/ArticlesController");

const Article = require("./articles/Article");
const Category = require("./categories/Category")

// View engine
app.set('view engine', 'ejs');

// Static
app.use(express.static('public'));

// Body prser
app.use(bodyParser.urlencoded({extended: false})); // aceita dos de formulario
app.use(bodyParser.json());

// Database

connection.authenticate().then( () => {
    console.log("Conexão feita com sucesso!")
}).catch( () => {
    console.log("Erro")
})

app.use("/", categoriesController);
app.use("/", ArticlesController);

app.get("/", (req, res) => {
    Article.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(articles => {

        Category.findAll().then(categories => {
            res.render("index", {articles: articles, categories: categories})
        })

        
    })
});

app.get("/:slug", (req, res) => {
    let slug = req.params.slug
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render("article", {article: article, categories: categories})
            })
        }else {
            res.redirect("/")
        }
    }).catch(err => {
        res.redirect("/")
    })
})

app.get("/category/:slug", (req, res) => {
    let slug = req.params.slug
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then(category => {
        if(category != undefined){
            Category.findAll().then(categories => {
                res.render("index",{articles: category.articles, categories: categories})
            })
        }else {
            res.redirect("/")
        }
    }).catch(err => {
        res.redirect("/")
    })
})

app.listen(8080, () => {
    console.log("Seridor esta rodando")
});