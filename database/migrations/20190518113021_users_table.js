exports.up = function(knex, Promise) {
    return knex.schema.createTable("users", tbl => {
      tbl.increments();
  
      tbl.string("firstname", 255).notNullable();
      tbl.string("lastname", 255).notNullable();
      tbl.string("country").notNullable();
      tbl.string("title").notNullable();
      tbl.string("email").notNullable();
      tbl.string("username", 128).notNullable(); // .unique() not yet
      tbl.string("password", 128).notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("users");
  };
  