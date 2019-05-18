const bcrypt = require("bcryptjs");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          firstname: "Jane",
          lastname: "Doe",
          country: "Peru",
          title: "Coordinator",
          email: "jane@company.com",
          username: "janedoe",
          password: bcrypt.hashSync("janedoe", 14) // rounds must match the Registation password hash
        },
        {
          firstname: "John",
          lastname: "Doe",
          country: "Haiti",
          title: "Coordinator",
          email: "john@company.com",
          username: "johndoe",
          password: bcrypt.hashSync("johndoe", 14)
        },
        {
          firstname: "Bill",
          lastname: "Gates",
          country: "Brazil",
          title: "Donor",
          email: "bill@company.com",
          username: "billgates",
          password: bcrypt.hashSync("billgates", 14)
        },
        {
          firstname: "Steve",
          lastname: "Jobs",
          country: "Ghana",
          title: "Donor",
          email: "steve@company.com",
          username: "stevejobs",
          password: bcrypt.hashSync("stevejobs", 14)
        }
      ]);
    });
};
