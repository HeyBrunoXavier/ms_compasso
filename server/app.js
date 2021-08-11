const express = require("express");
const useragent = require("express-useragent");
const cors = require("cors");
const fs = require("fs");
const swaggerUi = require("swagger-ui-express");
const apiSchema = require("../doc/swagger/conf.json");


module.exports = new class App {
	constructor() {
		this.app = express();
		this.middlewares();
		this.setRoutes();
		this.apiDoc();
	}
	middlewares() {
		this.app.use(useragent.express());
		this.app.use(cors());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(express.json());
	}
	setRoutes() {
		const routeDirectory = "./src/routes/";
		try {
				const files = fs.readdirSync(routeDirectory, { encoding: "utf8" });
				files.forEach(file => {
					this.app.use("/", require(`${routeDirectory}/${file}`));
				});
		} catch (error) {
			console.log(error);
		}
	}
	apiDoc(){
		this.app.use("/doc/swagger", swaggerUi.serve, swaggerUi.setup(apiSchema));
	}
}
