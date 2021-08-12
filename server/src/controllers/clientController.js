const Client = require("../repository/Client");
const Parse = require("../utils/Parser");
const {existsOrError} = require('../utils/Validation');
class clientController {

	/**
	* @method list
	* @description Listagem de clientes
	* @param {*} request
	* @param {*} response
	*/
	
	async list(request, response) {
		try {
			const o_response = await Client.list();
			return response.json(o_response).status(200).end();
		}
		catch (error) {
			console.error(error);
			return response.status(error.status || 400).send(error.msg || "");
		}
	}

	/**
	* @method insert
	* @description Inserção de um clientes
	* @param {*} request
	* @param {*} response
	*/
	async insert(request, response) {
		try {
			const { st_name, st_genre, in_year, st_city } = request.body;
			const dt_date = Parse.ParserDate(request.body.dt_date);
			existsOrError(st_name,400,"ERR_NAME_FIELD_EMPTY");
			existsOrError(st_genre,400,"ERR_GENRE_FIELD_EMPTY");
			existsOrError(dt_date,400,"ERR_DATE_FIELD_EMPTY");
			existsOrError(in_year,400,"ERR_YEAR_FIELD_EMPTY");
			existsOrError(st_city,400,"ERR_CITY_FIELD_EMPTY");

			const o_response = await Client.insert(st_name, st_genre, in_year, dt_date, st_city);
			if(o_response.code)
				existsOrError(o_response.code,403,"ERR_GENRE_TYPE_IS_NOT_EXIST");
			return response.json(o_response).status(201).end();
		}
		catch (error) {
			console.error(error);
			return response.status(error.status || 400).send(error.msg || "");
		}
	}

	/**
	* @method view
	* @description visualização de um clientes
	* @param {*} request
	* @param {*} response
	*/
	async view(request, response) {
		try {
			const st_user = request.params.id;
			existsOrError(st_user,400,"ERR_USER_NOT_FOUND");
			const o_response = await Client.view(st_user);
			return response.json(o_response).status(200).end();
		}
		catch (error) {
			console.error(error);
			return response.status(error.status || 400).send(error.msg || "");
		}
	}

	/**
	* @method update
	* @description Atualização de clientes
	* @param {*} request
	* @param {*} response
	*/

	async update(request, response) {
		try {
			const st_id = request.params.id;
			const st_hash = request.headers['transaction-hash'];
			const { st_name, st_genre, in_year, st_city } = request.body;
			const dt_date = Parse.ParserDate(request.body.dt_date);
			existsOrError(st_name,400,"ERR_NAME_FIELD_EMPTY");
			existsOrError(st_genre,400,"ERR_GENRE_FIELD_EMPTY");
			existsOrError(dt_date,400,"ERR_DATE_FIELD_EMPTY");
			existsOrError(in_year,400,"ERR_YEAR_FIELD_EMPTY");
			existsOrError(st_city,400,"ERR_CITY_FIELD_EMPTY");
			existsOrError(st_hash,400,"ERR_HASH_FIELD_EMPTY");

			let o_response = await Client.update(st_id, st_name, st_genre, in_year,dt_date, st_city, st_hash);
			if(o_response.code)
				existsOrError(o_response.code,403,"ERR_GENRE_TYPE_IS_NOT_EXIST");
			return response.json(o_response).status(200).end();
		}
		catch (error) {
			console.error(error);
			return response.status(error.status || 400).send(error.msg || "");
		}
	}

	/**
	* @method delete
	* @description Exclusão de clientes
	* @param {*} request
	* @param {*} response
	*/

	async delete(request, response) {
		try {
			const st_id = request.params.id;
			const st_hash = request.headers['transaction-hash'];
			existsOrError(st_hash,400,"ERR_HASH_FIELD_EMPTY");
			const o_response = await Client.delete(st_id, st_hash);
			return response.json(o_response).status(200).end();
		}
		catch (error) {
			console.error(error);
			return response.status(error.status || 400).send(error.msg || "");
		}
	}

}
module.exports = new clientController();