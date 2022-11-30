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
router.get('/', controller.configuracion);
router.post('/', cargar.single("logo"),controller.guardarEquipo);
router.post('/2',controller.guardarJugadores);
router.post('/3',controller.guardarEstadios);
router.post('/4',controller.guardarArbitro);
router.post('/5',controller.guardarProgramacion);
router.post('/6', cargar.single("newlogo"),controller.modificarEquipo);
router.post('/7',controller.modificarJugador);
router.post('/8',controller.modificarEstadio);
router.post('/9',controller.modificarArbitro);
router.post('/10',controller.modificarProgramacion);
router.post('/11',controller.eliminarEquipo);
router.post('/12',controller.eliminarJugador);
router.post('/13',controller.eliminarEstadio);
router.post('/14',controller.eliminarArbitro);
router.post('/15',controller.eliminarProgramacion);
module.exports = router;