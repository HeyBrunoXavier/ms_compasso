const knex = require('../database/connection');

class City {

  /**
   * @method list
   * @author HeyBrunoXavier
   * @description Listagem de cidades
   */
  async list(){
		try {
			const o_response = await knex.select("*").from("city");
			if(o_response.length > 0)
				return o_response;
		}catch (erro) {
			console.log(erro);
			return false;
		}
	}
  /**
   * @method insert
   * @param {*} name
   * @author HeyBrunoXavier
   * @description Inserção de cidades
   */
  	async insert(name,state,initials){
		try{
			const o_response = await knex('city').insert({name: name, state: state,initials: initials}).returning("*");
			return o_response;
		}catch(error){
			console.error(error);
			return error
		}
	}

	/**
   	* @method view
   	* @param {*} name
   	* @author HeyBrunoXavier
   	* @description Visualização de pelo nome cidades
   	*/
	async view(name){
		try{
			const o_response = await knex('city').where({name: name}).first();
			return o_response;
		}catch(error){
			console.error(error);
			return error
		}
	}

	/**
   	* @method viewState
   	* @param {*} state
   	* @author HeyBrunoXavier
   	* @description Visualização de pelo estado das cidades
   	*/
	   async viewState(state){
		try{
			const o_response = await knex.select("*").from('city').where({state: state}).returning("*");
			return o_response;
		}catch(error){
			console.error(error);
			return error
		}
	}

	/**
   	* @method viewInitials
   	* @param {*} initials
   	* @author HeyBrunoXavier
   	* @description Visualização de pela sigla das cidades
   	*/
	   async viewInitials(initials){
		try{
			const o_response = await knex.select("*").from('city').where({initials: initials}).returning("*");
			return o_response;
		}catch(error){
			console.error(error);
			return error
		}
	}

}
module.exports = new City();