//dropped users table leftover from clone
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('users', function (table) {
          })
    ])
  };
  
  exports.down = function(knex, Promise) {
    return Promise.all([
    ])
  };
