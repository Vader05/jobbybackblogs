
const User = require("../models/user");
const mongoose = require('mongoose');


exports.userList= function(req, res){
    User.find({}, function (err, users) {
        if (err) console.log(err);
        res.status(200).json(users);
    });
}

exports.createUser = function (req, res) {
    var user= req.body;
    console.log(user);
    var newUser= new User({username:user.username, univName:user.univName, password:user.password, location: user.location });
    newUser.save(function(err, result){
        if(err) return res.status(500).json(err);
        res.status(201).json(result);
    });
}

exports.createArticle = function (req, res) {
    User.findById(req.body._id).then(user=>{
        if(user!=null){
            console.log(req.body);
            user.article.push({title:req.body.title, content:req.body.content, img: req.body.img});
            user.save().then(
                result=>{
                    res.status(201).json(result);
                }).catch(err=> res.json(err));
        }
    }).catch(error=>{
        console.log(error);
    })
}

exports.getUserById = function(req, res){
    User.findById(req.body.id, function (err, user) {
        if (err) console.log(err);
        res.status(200).json(user);
    });
}

exports.getArticlesByIdUser= function(req, res){
    User.findById(req.params.id, function (err, user) {
        if (err) console.log(err);
        console.log(user)
        if (user.article!=null){
            res.status(200).json(user.article);
        } else {
            res.status(404).json("el usuario no tiene articulos nmms :u");
        }
    });
}

exports.removeArticle = function(req,res, next){
    User.updateOne({'_id': req.body.id},{"$pull":{"article":{"_id": req.body.idArticle}}},function(err, afect){
        if(err) console.log(err);
            if(afect.nModified >0){
                res.status(204);
                res.json(afect);
            }else{
                res.status(404).json({
                    "success": false,
                    "msg": "no se encontro el articulo "
                });
            } 
    })
}

exports.updateArticle = function (req, res){
    var art= req.body;
    console.log(art);
    User.updateOne({'_id':art.id, 'article._id':art.idArticle},{'$set':{'article.$.title':art.title, 'article.$.content':art.content,'article.$.img':art.img,'article.$.updateAt': new Date()}}, function(err, afect){
        if(err) console.log(err);
        console.log(afect);
        if(afect.nModified>0){
            console.log(afect);
            res.status(204).send();
        }else{
            res.status(404).json({
                'success':false,
                'msg':"no se encontro el articulo"
            })
        }
    });
}


exports.updateArticle1 = async function updateAlgo(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        var art= req.body;
        console.log(art);
        await User.updateOne({  '_id':art.id, 
                                'article._id':art.idArticle},
                                {'$set':{
                                    'article.$.title':art.title, 
                                    'article.$.content':art.content,
                                    'article.$.img':art.img,
                                    'article.$.updateAt': new Date()}
                                }, 
        function(err, afect){
            if(err) console.log(err);
            console.log(afect);
            if(afect.nModified>0){
                console.log(afect);
                res.status(204).send();
            }else{
                res.status(404).json({
                    'success':false,
                    'msg':"no se encontro el articulo"
                })
            }
        });
      //await session.commitTransaction();
      session.endSession();
      return true;
    } catch (error) {
      // If an error occurred, abort the whole transaction and
      // undo any changes that might have happened
      await session.abortTransaction();
      session.endSession();
      throw error; 
    }
  }

  exports.updateUser = async function updateAlgo(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        var art= req.body;
        console.log(art);
        await User.updateOne({  '_id':art.id, 
                                'article._id':art.idArticle},
                                {'$set':{
                                    'article.$.title':art.title, 
                                    'article.$.content':art.content,
                                    'article.$.img':art.img,
                                    'article.$.updateAt': new Date()}
                                }, 
        function(err, afect){
            if(err) console.log(err);
            console.log(afect);
            if(afect.nModified>0){
                console.log(afect);
                res.status(204).send();
            }else{
                res.status(404).json({
                    'success':false,
                    'msg':"no se encontro el articulo"
                })
            }
        });
      //await session.commitTransaction();
      session.endSession();
      return true;
    } catch (error) {
      // If an error occurred, abort the whole transaction and
      // undo any changes that might have happened
      await session.abortTransaction();
      session.endSession();
      throw error; 
    }
  }
