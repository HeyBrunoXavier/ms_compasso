const knex = require('../database/connection');

class Client {

  /**
   * @method list
   * @author HeyBrunoXavier
   * @description Listagem de clientes
   */
  
  	async list(){
		try {
			var o_response = await knex.select("*").from("client");
			if(o_response.length > 0){
				delete o_response[0].password;
				return o_response;
			}
		}catch (erro) {
			console.log(erro);
			return false;
		}
	}
	
  /**
   * @method insert
   * @param {*} 
   * @author HeyBrunoXavier
   * @description Inserção de clientes
   */

  	async insert(name,genre,year,date,city){
		try{
			let o_response = await knex('client').insert({name:name, genre:genre, year:year, ['date-birth']:date, city:city}).returning("*");
            return o_response;
		}catch(error){
			console.error(error);
			return error
		}
	}

	/**
   	* @method view
   	* @param {*} id
   	* @author HeyBrunoXavier
   	* @description Visualização de clientes
   	*/

	async view(id){
		try{
			let st_people = await knex('client').where({id: id}).first();
			return st_people;
		}catch(error){
			console.error(error);
			return error
		}
	}

	/**
   	* @method updated
   	* @param {*} 
   	* @author HeyBrunoXavier
   	* @description Inserção de clientes
   	*/

	async update(id,name,genre,year,date,city,hash){
		try{
			let o_response = await knex('client').update({name: name, genre: genre, year: year, ['date-birth']: date, city: city, hash: hash}).where({id: id}).returning("*");
			return o_response;
		}catch(error){
			console.error(error);
			return error
		}
	}

	/**
   	* @method delete
   	* @param {*} id
   	* @author HeyBrunoXavier
   	* @description Inserção de clientes
   	*/

	async delete(id){
		try{
			let o_response = await knex('client').where({id: id}).del().returning("*");
			return o_response;
		}catch(error){
			console.error(error);
			return error
		}
	}

}
module.exports = new Client();