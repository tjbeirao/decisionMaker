//created results table and populated columns
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('results', function (table) {
            table.integer('id');
            table.primary('id');
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
  
  exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('results')
    ])
  };