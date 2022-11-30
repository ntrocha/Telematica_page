var con = require('../config/conexion');
var mundial = require('../model/mundial');
var borrar = require("fs");

module.exports = {
    
    // Mostrar
    index:  function(req, res) {
        mundial.consultaDat(con,function(err,datos){
          console.log(datos);
          res.render('index', {data:datos});
        });
      
      },
    datos: function(req, res){
      mundial.consultaProg(con,function(err,datos){
        res.json(datos);
      });
    },
    add: function(con,res) {
      res.render('addteam');
    },
    
    pasado1: function(req,res){
      const TAA = req.query.TA;
      const TRR = req.query.TR;
      const GG = req.query.G;
      const TEE = req.query.TE;
      const Fecha = req.query.fecha;
      console.log(TAA)
      mundial.pasado1(con,TAA,TRR,GG,TEE,Fecha, function(err, result){
        res.send(result).status(200);
      });

    },

    // consulpasado1: function(req,res){
    //   const dtt = req.query.dtt;
    //   mundial.Cpasado1(con, dtt, function(err, result){
    //     res.send(result).status(200);
    //   });
    // },

    pasado2: function(req,res){
      const TAA = req.query.TA;
      const TRR = req.query.TR;
      const GG = req.query.G;
      const TEE = req.query.TE;
      const Fecha = req.query.fecha;
      console.log(TAA)
      mundial.pasado2(con,TAA,TRR,GG,TEE,Fecha, function(err, result){
        res.send(result).status(200);
      });

    },

    guardarEquipo: function(req,res) {
      console.log(req.body);
      console.log(req.file.filename);
      mundial.insertarEquipo(con,req.body,req.file,function(err){
           res.redirect('/');  
      });

    },

    guardarJugadores: function(req,res) {
      console.log(req.body);
      mundial.insertarJugadores(con,req.body,function(err){
           res.redirect('/');  
      });

    },

    guardarEstadios: function(req,res) {
      console.log(req.body);
      mundial.insertarEstadio(con,req.body,function(err){
           res.redirect('/');  
      });

    },

    guardarArbitro: function(req,res) {
      console.log(req.body);
      mundial.insertarArbitro(con,req.body,function(err){
           res.redirect('/');  
      });

    },

    guardarProgramacion: function(req,res) {

       
        mundial.consultaIDs(con,req.body,function(err, data){
          console.log(req.body);
          //console.log(data[0].ID1);
          //console.log(data[0].ID2);
          var IDs=data;
          console.log(IDs);
          if(err){
            console.log("Datos no validos");
            res.redirect("/configuracion");
          }
          if (IDs != '') {
           console.log("Datos validos");
              mundial.insertarProgramacion(con,req.body.date,IDs,function(err){
              console.log(req.body);
              res.redirect("/configuracion");

               });
         } else {
          console.log("Datos no validos");
           res.redirect("/configuracion");
         }
        });

    },

    eliminar: function(req, res) {
      console.log('Recepcion de datos');
      console.log(req.params.Equipo);
      mundial.retornarDatos(con,req.params.Equipo,function(err,registros){

           var nombreImg= "public/images/"+(registros[0].Logo);
           
           if (borrar.existsSync(nombreImg)){
              borrar.unlinkSync(nombreImg);

           }
           
           mundial.borrar(con,req.params.Equipo,function(err){
                res.redirect('/');
           })
      });
    },

    editar: function(req,res){

      mundial.retornarDatos(con,req.params.Equipo,function(err,registros){
        console.log(registros[0])
        res.render('editar', {Mundial:registros[0]});
      });
            
    },

    actualizar: function(req,res){

      console.log(req.body.Equipo[0]);
      console.log(req.body.entrenador);
      if(req.body.Equipo[0]){
        mundial.actualizar(con,req.body, function(err){

          });
      }

      if (req.file){
        if(req.file.filename){
          mundial.retornarDatos(con,req.body.newequipo,function(err,registros){

            var nombreImg= "public/images/"+(registros[0].logo);
            
            if (borrar.existsSync(nombreImg)){
               borrar.unlinkSync(nombreImg);
 
            }
            mundial.actualizarfile(con,req.body,req.file, function(err){}); 
          });
        }
      }
      res.redirect("/configuracion");

    },

    //MODIFICAR 
    modificarEquipo: function(req, res) {

      console.log(req.body.equiponame[0]);
      if(req.body.equiponame[0]){
        mundial.actualizar(con,req.body, function(err){
          });
      }
      if (req.file){
        if(req.file.filename){
          mundial.retornarDatos(con,req.body.newequipo,function(err,registros){

            var nombreImg= "public/images/"+(registros[0].logo);
            
            if (borrar.existsSync(nombreImg)){
               borrar.unlinkSync(nombreImg);
 
            }
            mundial.actualizarfile(con,req.body,req.file, function(err){}); 
          });
        }
      }
      res.redirect("/configuracion");
    },

    modificarJugador: function(req, res){
      console.log(req.body);
      mundial.retornarDatos(con,req.body.eqpjd,function(err,registros){
        let equipo  = registros[0].id
        mundial.actualizarjugador(con,req.body,equipo, function(err){
          res.redirect("/configuracion");
        });
    });
    },

    modificarEstadio: function(req, res){
      console.log(req.body);
      
      mundial.actualizarestadio(con,req.body, function(err){
        res.redirect("/configuracion");
      });
    
    },

    modificarArbitro: function(req, res){
      console.log(req.body);
      
      mundial.actualizararbitro(con,req.body, function(err){
        res.redirect("/configuracion");
      });
    
    },

    modificarProgramacion: function(req, res){
      console.log(req.body);
      
      mundial.actualizarprogramacion(con,req.body, function(err){
        res.redirect("/configuracion");
      });
    
    },
    //ELIMINAR
    eliminarEquipo: function(req, res){
      console.log(req.body);
      
      mundial.borrarequipo(con,req.body, function(err){
        res.redirect("/configuracion");
      });
    
    },

    eliminarJugador: function(req, res){
      console.log(req.body);
      
      mundial.borrarjugador(con,req.body, function(err){
        res.redirect("/configuracion");
      });
    
    },

    eliminarEstadio: function(req, res){
      console.log(req.body);
      
      mundial.borrarestadio(con,req.body, function(err){
        res.redirect("/configuracion");
      });
    
    },

    eliminarArbitro: function(req, res){
      console.log(req.body);
      
      mundial.borrararbitro(con,req.body, function(err){
        res.redirect("/configuracion");
      });
    
    },

    eliminarProgramacion: function(req, res){
      console.log(req.body);
      
      mundial.borrarprogramacion(con,req.body, function(err){
        res.redirect("/configuracion");
      });
    
    },

    configuracion: function(req,res, next) {
      mundial.obtener(con, function(err, data ){
        res.render('configuracion', {dataProgram : data});
      })
      
    }, 

    loging: function(con,res) {
      res.render('loging');
    },

}