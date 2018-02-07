exports.seed = function(knex, Promise) {
  return knex('results').del()
    .then(function () {
      return Promise.all([
        knex('survey').insert({
          id: 1, 
          survey_id: 1,
          answer_1: 'Burger King',
          score_1: 0,
          answer_2: 'Porchetta & Co.',
          score_2: 0,
          answer_3: 'Bahn Mi Boys',
          score_3: 0,
          answer_3: 'Burger Priest',
          score_4: 0
        }),
        knex('results').insert({
          id: 2, 
          survey_id: 2,
          answer_1: 'Footsol!',
          score_1: 0,
          answer_2: 'Tanning!',
          score_2: 0,
          answer_3: 'Get Butt implants!',
          score_3: 0,
          answer_3: 'Make Pisco Sours',
          score_4: 0
        }),
        knex('results').insert({
          id: 3, 
          survey_id: 3,
          answer_1: 'Kowsheek',
          score_1: 0,
          answer_2: 'Tim',
          score_2: 0,
          answer_3: 'Zach',
          score_3: 0,
          answer_3: 'Jonathan',
          score_4: 0
        })
      ]);
    });
};
