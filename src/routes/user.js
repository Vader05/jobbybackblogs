const express = require("express");
const userRoute= express.Router();
const userController = require("../controllers/userController");

userRoute
.get('/list',userController.userList)
.post('/',userController.createUser)
.get('/',userController.getUserById)

userRoute
.get('/article', userController.getArticlesByIdUser)
.post( '/createarticle',userController.createArticle)
.post('/removearticle',userController.removeArticle)
.post('/updatearticle', userController.updateArticle);

module.exports = userRoute;