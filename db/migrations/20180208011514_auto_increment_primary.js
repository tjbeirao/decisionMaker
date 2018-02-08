//created admin table and populated columns
exports.up = function(knex, Promise) {
    return Promise.all([
      knex.dropTable('results'),
      knex.dropTable('survey'),
      knex.dropTable('admin')
    ])
  };
  
  exports.down = function(knex, Promise) {
    return Promise.all([
    ])
  };
