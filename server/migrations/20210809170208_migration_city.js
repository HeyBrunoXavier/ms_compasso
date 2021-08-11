
exports.up = function(knex) {
    return knex.schema.createTable('city', table => {
          table.string("name",[100]).notNull();
          table.string("state",[50]).notNull();
          table.string("initials",[10]).notNull();
          table.timestamp('created_at').defaultTo(knex.fn.now());
          console.log("*** CREATE TABLE CITY ***");
      })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('city');
  };