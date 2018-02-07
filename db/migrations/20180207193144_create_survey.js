//created survey table and populated columns
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('survey', function (table) {
            table.integer('id');
            table.primary('id');
            table.integer('admin_id');
            table.foreign('admin_id').references('admin.id');
            table.string('title');
            table.string('description');
            table.string('admin_link');
            table.string('user_link');
            table.string('question');
          })
    ])
  };
  
  exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('survey')
    ])
  };

