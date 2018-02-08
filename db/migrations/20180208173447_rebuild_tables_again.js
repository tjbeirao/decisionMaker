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
            table.string('title');
            table.string('description');
            table.string('admin_link');
            table.string('user_link');
            table.string('question');
        }),
        knex.schema.createTable('results', function (table) {
            table.increments('id');
            table.integer('survey_id');
            table.foreign('survey_id').references('survey.id');
            table.string('answer_1');
            table.integer('score_1');
            table.string('answer_2');
            table.integer('score_2');
            table.string('answer_3');
            table.integer('score_3');
            table.string('answer_4');
            table.integer('score_4');
        })
    ])
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('admin'),
        knex.schema.dropTable('survey'),
        knex.schema.dropTable('results')
    ])
};
