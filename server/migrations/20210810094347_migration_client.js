exports.up = knex =>{
	return knex.schema.createTable('client', table => {
		table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
		table.string("name",[100]).notNull();
		table.enu('genre', ['male','feminine','other'], {useNative: true, enumName: 'tp_genre', schemaName: 'public'});
		table.string('date-birth',[15]).notNull();
		table.integer("year",[15]).notNull();
		table.string("city",[100]).notNull();
		table.uuid("hash").defaultTo(knex.raw("uuid_generate_v4()"));
		table.timestamp('created_at').defaultTo(knex.fn.now());
		console.log("*** CREATE TABLE CLIENT ***");
	})
  };
  
exports.down = knex => { return knex.schema.dropTable('client') };