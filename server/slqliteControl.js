var knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./db/my_restaurent.db"
  },
  useNullAsDefault: true
}

var knex = require("knex")(knexConfig);

exports.createTable = function(){
  // Create a table
  console.log(knex.schema);
	knex.schema.createTableIfNotExists('order_bill', function(table) {
	  table.increments();
    table.string('name');
    table.timestamps();
	});
}