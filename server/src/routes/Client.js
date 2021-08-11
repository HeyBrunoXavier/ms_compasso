const router = require("express").Router(); 
const Client = require('../controllers/clientController');

router.get('/v1/client/', Client.list)
router.post('/v1/client/',Client.insert);
router.get('/v1/client/:id', Client.view);
router.put('/v1/client/:id',Client.update);
router.delete('/v1/client/:id',Client.delete);


module.exports = router;