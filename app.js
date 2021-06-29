require("dotenv").config();
var express=require("express");
var mongoose = require("mongoose");
var morgan = require("morgan");
var cors = require("cors");


//importing routes
var userRouter= require("./src/routes/user");

var app = express();

var port = process.env.PORT || "3000";
app.set('port', port); 

//conection to mongo atlas
var mongoDB = process.env.MONGO_URL;
const connect = mongoose.connect(mongoDB, {
    useUnifieldTopology:true,
    useNewUrlParse: true,
    useFindAndModify:false
});

connect.then(conect=>{
    console.log("connection success!!");
}).catch(err=>console.log(err));

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user",userRouter );
app.use("/index", (req, res)=>{
    res.send(`bienvenido a jobbyblog :V !!
            <br>
            obtener todos los usuarios GET: /user/list
            <br>
            obtener un usuario por id GET: /user/ (enviar el id en el body)
            <br>
            crear un nuevo usuario POST: /user/ (enviar usuario en body)
            <br>
            crear articulo POST: /user/createarticle (enviar articulo en body) 
            <br>
            listar articulos de un usuario GET: /user/article (enviar id de usuario en body)
            <br>
            actualizar articulo POST: /user/updatearticle (enviar id de usuario y id de articulo, con datos del articulo en body)
            <br>
            remover articulos POST:  user/removearticle (enviar id de usuario y id de articulo en body)` );
})



app.listen(port, ()=>{
    console.log("server listen on port: ", port);
})