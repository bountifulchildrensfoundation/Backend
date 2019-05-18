exports.up = function(knex, Promise) {
    return knex.schema.createTable("stories", tbl => {
      // story id 
      tbl.increments();
  
      // foreign key user id
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
  
      // other fields
      tbl.string("title").notNullable();
      tbl.string("country").notNullable();
      tbl.string("description").notNullable();
      tbl.string("fullStory").notNullable();
      tbl.string("date").notNullable();
      tbl.timestamps(true, true);
    });
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTableIfExists("stories");
  };
  