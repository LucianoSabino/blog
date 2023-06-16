const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

const Article = connection.define('articles', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },slug: {
        type: Sequelize.STRING,
        allowNull: false
    },body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Article.belongsTo(Category); // Um artigo pertence a uma categoria, relciomnemto 1 para 1 usando "belongsTo"
Category.hasMany(Article); // Uma categoria tem muitos ratigos um para muitos "hasMany"

// Fazendo  cincronizacão com as tabela
// Article.sync({force: true});

module.exports = Article;