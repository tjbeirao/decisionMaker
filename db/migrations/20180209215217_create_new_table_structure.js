exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('admin', function (table) {
            table.increments('id');;
            table.string('email')
        }),
        knex.schema.createTable('survey', function (table) {
            table.increments('id');
            table.integer('admin_id');
            table.foreign('admin_id').references('admin.id');
            table.string('admin_link');
            table.string('user_link');
            table.string('question');
        }),
        knex.schema.createTable('results', function (table) {
            table.increments('id');
            table.integer('survey_id');
            table.foreign('survey_id').references('survey.id');
            table.string('answer');
            table.string('description');
            table.integer('score');
        })
    ])
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('results'),
        knex.schema.dropTable('survey'),
        knex.schema.dropTable('admin')
    ])
};
