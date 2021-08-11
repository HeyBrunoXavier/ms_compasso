const City = require("../models/City");
class cityController {
	/**
   	* @method list
   	* @description Listagem de cidades
   	* @param {*} request
   	* @param {*} response
   	*/

 	async list(request, response){
		try{
			const in_page = request.query.page ? request.query.page : 0;
			const in_rows = request.query.rows ? request.query.rows : 100;
			const st_author = request.query.author ? `'${request.query.author}'` : null;
			const o_response = await City.list(in_page,in_rows,st_author);
			return response.json(o_response).status(200).end();
		}
		catch (error) {
			console.error(error);
			return response.status(error.status || 400).send(error.msg || "");
		}
	}
  
	/**
  	* @method insert
   	* @description Inserção de um cidades
   	* @param {*} request
   	* @param {*} response
  	*/

 	async insert(request,response){
		try{
			const {st_name, st_state, st_initials} = request.body;
			
			if(!st_name) throw {
				msg: "ERR_NAME_FIELD_EMPTY",
				status: 406
			}
			if(!st_state) throw {
				msg: "ERR_STATE_FIELD_EMPTY",
				status: 406
			}
			if(!st_initials) throw {
				msg: "ERR_INITIALS_FIELD_EMPTY",
				status: 406
			}
			
			const o_response = await City.insert(st_name,st_state,st_initials);
			return response.json(o_response).status(200).end();
		}
		catch (error) {
			console.error(error);
			return response.status(error.status || 400).send(error.msg || "");
		}
	}

	/**
  	* @method view
   	* @description visualização de uma cidade pelo nome
   	* @param {*} request
   	* @param {*} response
  	*/

	async view(request,response){
		try{
			const st_state = request.params.id;
			if(!st_state) throw {
				msg: "ERR_NAME_FIELD_EMPTY",
				status: 406
			}
			const o_response = await City.view(st_state);
			if(!o_response) throw {
				msg: "ERR_STATE_NOT_FOUND",
				status: 406
			}
			return response.json(o_response).status(200).end();
		}
		catch (error) {
			console.error(error);
			return response.status(error.status || 400).send(error.msg || "");
		}
	}

	/**
  	* @method viewState
   	* @description visualização de uma cidade pelo estado
   	* @param {*} request
   	* @param {*} response
  	*/

	async viewState(request,response){
		try{
			const st_state = request.params.id;
			if(!st_state) throw {
				msg: "ERR_NAME_FIELD_EMPTY",
				status: 406
			}
			const o_response = await City.viewState(st_state);
			if(!o_response) throw {
				msg: "ERR_STATE_NOT_FOUND",
				status: 406
			}
			return response.json(o_response).status(200).end();
		}
		catch (error) {
			console.error(error);
			return response.status(error.status || 400).send(error.msg || "");
		}
	}

	/**
  	* @method viewInitials
   	* @description visualização de uma cidade pela sigla
   	* @param {*} request
   	* @param {*} response
  	*/
	  
	async viewInitials(request,response){
		try{
			const st_initials = request.params.id;
			if(!st_initials) throw {
				msg: "ERR_NAME_FIELD_EMPTY",
				status: 406
			}
			const o_response = await City.viewInitials(st_initials);
			if(!o_response) throw {
				msg: "ERR_STATE_NOT_FOUND",
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
module.exports = new cityController();