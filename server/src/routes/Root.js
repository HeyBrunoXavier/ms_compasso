const router = require("express").Router();
const Root = require("../controllers/Root");

router.get('/', Root.all);

module.exports = router;