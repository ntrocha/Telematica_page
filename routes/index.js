var express = require('express');
var router = express.Router();
const controller = require('../controllers/controller');
var multer = require('multer');
var fecha = Date.now();
var rutaAlmacen = multer.diskStorage(
    {
    destination: function(request, file, callback) {
        callback(null, './public/images/');
    },
    filename: function (request, file, callback){
        console.log(file);
        callback(null, fecha+"_"+file.originalname);
    }
}
);
var cargar = multer({ storage: rutaAlmacen});

/* GET home page. */

router.get('/', controller.index);
router.get('/addteam', controller.add);
router.get('/data', controller.datos);
router.get('/pasado1', controller.pasado1);
router.get('/pasado2', controller.pasado2);
//router.get('/consulpasado1', controller.consulpasado1);
//router.post('/', cargar.single("logo"),controller.guardar);
//router.post('/eliminar/:Equipo',controller.eliminar); 
router.get('/editar/:Equipo',controller.editar); 
//router.post('/actualizar', cargar.single("logo"),controller.actualizar);
module.exports = router;
