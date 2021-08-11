const Client = require("../models/Client");
const Parse = require("../utils/Parser");
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
			console.log(dt_date);
			if (!st_name) throw {
				msg: "ERR_NAME_FIELD_EMPTY",
				status: 406
			}
			if (!st_genre) throw {
				msg: "ERR_GENRE_FIELD_EMPTY",
				status: 406
			}
			if (!dt_date) throw {
				msg: "ERR_DATE_OF_BIRTH_FIELD_EMPTY",
				status: 406
			}
			if (!in_year) throw {
				msg: "ERR_YEAR_FIELD_EMPTY",
				status: 406
			}
			if (!st_city) throw {
				msg: "ERR_CITY_FIELD_EMPTY",
				status: 406
			}

			const o_response = await Client.insert(st_name, st_genre, in_year, dt_date, st_city);
			if(o_response.code == '22P02') throw {
				msg: "ERR_GENRE_TYPE_IS_NOT_EXIST",
				status: 403
			}
			return response.json(o_response).status(200).end();
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
			if (!st_user) throw {
				msg: "ERR_ID_FIELD_EMPTY",
				status: 406
			}

			const o_response = await Client.view(st_user);
			if (o_response.code == '22P02') throw {
				msg: "ERR_ID_NOT_FOUND",
				status: 404
			}
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

			if (!st_name) throw {
				msg: "ERR_NAME_FIELD_EMPTY",
				status: 406
			}
			if (!st_genre) throw {
				msg: "ERR_GENRE_FIELD_EMPTY",
				status: 406
			}
			if (!dt_date) throw {
				msg: "ERR_DATE_OF_BIRTH_FIELD_EMPTY",
				status: 406
			}
			if (!in_year) throw {
				msg: "ERR_YEAR_FIELD_EMPTY",
				status: 406
			}
			if (!st_city) throw {
				msg: "ERR_CITY_FIELD_EMPTY",
				status: 406
			}
			if (!st_hash) throw {
				msg: "ERR_HASH_FIELD_EMPTY",
				status: 406
			}

			let o_response = await Client.update(st_id, st_name, st_genre, in_year,dt_date, st_city, st_hash);
			if (o_response.code == '22P02') throw {
				msg: "ERR_GENRE_TYPE_IS_NOT_EXIST",
				status: 403
			}
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

			if (!st_id) throw {
				msg: "ERR_ID_FIELD_EMPTY",
				status: 406
			}
			if (!st_hash) throw {
				msg: "ERR_HASH_FIELD_EMPTY",
				status: 406
			}
			const o_response = await Client.delete(st_id, st_hash);
			if (o_response.code == '22P02') throw {
				msg: "ERR_ID_NOT_FOUND",
				status: 404
			}
			if (o_response.constraint == 'fk_user_id_author') throw {
				msg: "ERR_IT_IS_NOT_POSSIBLE_TO_DELETE_THIS_USER",
				status: 406
			}
			return response.json(o_response).status(200).end();
		}
		catch (error) {
			console.error(error);
			return response.status(error.status || 400).send(error.msg || "");
		}
	}

}
module.exports = new clientController();