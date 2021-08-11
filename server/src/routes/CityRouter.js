const router = require("express").Router();
const City = require('../controllers/cityController');

router.get('/v1/city/', City.list)
router.post('/v1/city/', City.insert);
router.get('/v1/city/:id', City.view);
router.get('/v1/city/state/:id', City.viewState);
router.get('/v1/city/sigla/:id', City.viewInitials);


module.exports = router;