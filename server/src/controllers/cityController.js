const City = require("../repository/City");
const {existsOrError} = require('../utils/Validation');
class cityController {
	/**
   	* @method list
   	* @description Listagem de cidades
   	* @param {*} request
   	* @param {*} response
   	*/

 	async list(request, response){
		try{
			const o_response = await City.list();
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
			existsOrError(st_name,400,"ERR_NAME_FIELD_EMPTY");
			existsOrError(st_state,400,"ERR_STATE_FIELD_EMPTY");
			existsOrError(st_initials,400,"ERR_INITIALS_FIELD_EMPTY");
			
			const o_response = await City.insert(st_name,st_state,st_initials);
			return response.json(o_response).status(201).end();
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
			const st_name = request.params.id;
			existsOrError(st_name,400,"ERR_NAME_FIELD_EMPTY");
			const o_response = await City.view(st_name);
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
			existsOrError(st_state,400,"ERR_STATE_FIELD_EMPTY");
			const o_response = await City.viewState(st_state);
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
			existsOrError(st_initials,400,"ERR_INITIALS_FIELD_EMPTY");
			const o_response = await City.viewInitials(st_initials);
			return response.json(o_response).status(200).end();
		}
		catch (error) {
			console.error(error);
			return response.status(error.status || 400).send(error.msg || "");
		}
	}

}
module.exports = new cityController();