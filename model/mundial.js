const { query } = require("express");

module.exports = {

    obtener: function (conexion, funcion){
        conexion.query("SELECT DISTINCT  es.nombre as Estadio, ar.nombre as Arbitro FROM estadio as es, arbitro as ar", funcion);
    },

    consultaProg: function (conexion, funcion){
        conexion.query("SELECT fecha FROM programacion", funcion);
    },

    consultaDat: function (conexion, funcion){
        conexion.query("SELECT * FROM datosequipo", funcion);
    },

    consultaIDs: function (conexion,datos,funcion) {
         conexion.query("SELECT ar.id as ID1, es.id as ID2 FROM arbitro ar, estadio es WHERE ar.nombre=? AND es.nombre=? AND ar.procedencia != es.ubicacion",[datos.arbitros, datos.estadios], funcion);

    },

    // INSERTAR:
    insertarEquipo: function (conexion, datos,archivos, funcion){
        conexion.query("INSERT INTO datosequipo ( equipos, entrenador, logo ) VALUES (?,?,?) ",[datos.Equipo, datos.entrenador, archivos.filename], funcion);
        
    },

    insertarJugadores: function (conexion, datos, funcion){
        conexion.query("INSERT INTO jugadores ( id, nombre, numero ) VALUES (?,?,?) ",[datos.ID, datos.jugador, datos.numero], funcion);
        
    },

    insertarEstadio: function (conexion, datos, funcion){
        conexion.query("INSERT INTO estadio ( nombre, capacidad, ubicacion ) VALUES (?,?,?) ",[datos.estadio, datos.capacidad, datos.ciudad], funcion);
        
    },

    insertarArbitro: function (conexion, datos, funcion){
        conexion.query("INSERT INTO arbitro ( nombre, procedencia ) VALUES (?,?) ",[datos.arbitro, datos.procedencia], funcion);
        
    },

    insertarProgramacion: function (conexion, datos,IDS, funcion){
        conexion.query("INSERT INTO programacion ( fecha, id_estadios, id_arbitro ) VALUES (?,?,?) ",[datos, IDS[0].ID1, IDS[0].ID2], funcion);
        
    },

    retornarDatos: function (conexion,Equipo,funcion) {
        conexion.query("SELECT * FROM datosequipo WHERE equipos=?",[Equipo], funcion);

    },
    
    borrar: function(conexion,Equipo,funcion){
        conexion.query("DELETE FROM Mundial_Catar WHERE Equipo=?",[Equipo], funcion);
    },
    //MODIFICAR:
    actualizar: function (conexion, datos, funcion){
        conexion.query("UPDATE datosequipo SET equipos=?, entrenador=? WHERE equipos=? ",[datos.newequipo, datos.newentrenador, datos.equiponame], funcion);
    },

    actualizarfile: function (conexion,datos,archivo, funcion){
        conexion.query("UPDATE datosequipo SET Logo=? WHERE equipos=? ",[archivo.filename, datos.newequipo], funcion);
    },

    actualizarjugador: function (conexion, datos, equipo, funcion){
        conexion.query("UPDATE jugadores SET nombre=?, numero=?, id=? WHERE nombre=? ",[datos.namejug, datos.numberjug, equipo, datos.jug], funcion);
    },
    
    actualizarestadio: function (conexion, datos, funcion){
        conexion.query("UPDATE estadio SET nombre=?, capacidad=?, ubicacion=? WHERE nombre=? ",[datos.nest, datos.capacidadest, datos.ubicacionest, datos.est], funcion);
    },

    actualizararbitro: function (conexion, datos, funcion){
        conexion.query("UPDATE arbitro SET nombre=?, procedencia=? WHERE nombre=? ",[datos.narb, datos.procedenciarb, datos.arb], funcion);
    },

    actualizarprogramacion: function (conexion, datos, funcion){
        conexion.query("UPDATE programacion SET fecha=? WHERE fecha=? ",[datos.date3, datos.date2], funcion);
    },
    //ELIMINAR
    borrarequipo: function(conexion,dato,funcion){
        conexion.query("DELETE FROM datosequipo WHERE equipos=?",[dato.rmeqp], funcion);
    },

    borrarjugador: function(conexion,dato,funcion){
        conexion.query("DELETE FROM jugadores WHERE nombre=?",[dato.rmjug], funcion);
    },

    borrarestadio: function(conexion,dato,funcion){
        conexion.query("DELETE FROM estadio WHERE nombre=?",[dato.rmest], funcion);
    },

    borrararbitro: function(conexion,dato,funcion){
        conexion.query("DELETE FROM arbitro WHERE nombre=?",[dato.rmarb], funcion);
    },

    borrarprogramacion: function(conexion,dato,funcion){
        conexion.query("DELETE FROM programacion WHERE fecha=?",[dato.date4], funcion);
    },
    //PASADO
    pasado1: function (conexion,d1,d2,d3,d4,d5,funcion){
        conexion.query("INSERT INTO pasado1 (TA,TR,G,TE,fecha) VALUES (?,?,?,?)",[d1,d2,d3,d4,d5], funcion);

    },

    Cpasado1: function (conexion,fecha,funcion){
        conexion.query("SELECT * FROM pasado1 WHERE fecha=?",[fecha], funcion);

    },

    pasado2: function (conexion,d1,d2,d3,d4,d5,funcion){
        conexion.query("INSERT INTO pasado2 (TA,TR,G,TE,fecha) VALUES (?,?,?,?)",[d1,d2,d3,d4,d5], funcion);

    }

}