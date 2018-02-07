//created admin table and populated columns
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('admin', function (table) {
            table.integer('id');
            table.primary('id');
            table.string('email')
          })
    ])
  };
  
  exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('admin')
    ])
  };
