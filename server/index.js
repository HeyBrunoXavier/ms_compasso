const { app } = require("./app");
const { viewRoutes } = require("./src/utils/ServiceRouter");
require("dotenv").config(({encoding: "latin1"}));

app.listen(process.env.PORT || 5000, () => {
    viewRoutes(app, process.env.PORT || 5000);
});
