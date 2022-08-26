const path = require("path");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const multer = require("multer");
const express = require("express");

const errorHandler= require('errorhandler')

const routes = require("../routes/index");



module.exports = (app) => {
  //Settings
  app.set("port", process.env.PORT || 3000);

  app.set("views", path.join(__dirname, "views"));

  //Permite utilizar handlebars en la aplicacion
  app.engine(
    ".hbs",
    exphbs.engine({
      defaultLayout: "main",
      partialsDir: path.join(app.get("views"), "partials"),
      layoutsDir: path.join(app.get("views"), "layouts"),
      //extension del earchivo
      extname: ".hbs",
      helpers: require("./helpers"),
    })
  );

  app.set("view engine", ".hbs");

  //Middlewares

  app.use(morgan("dev"));

  //A travez de multer guarda la imagen en la carpeta
  app.use(
    multer({ dest: path.join(__dirname, "../public/upload/temp") }).single(
      "image"
    )
  );

  //Recibe los datos desde formularios
  app.use(express.urlencoded({ extended: false }));

  //Manejo de likes
  app.use(express.json());

  //Routes

  routes(app);

  //Static Files

  app.use('/public',express.static(path.join(__dirname,'../public')))

  //Error handlers

  if('development'=== app.get('env')){
    app.use(errorHandler)
  }

  return app;
};
