exports.seed = function(knex, Promise) { 
  return knex('results').del()
    .then(function(){return knex('survey').del()})
    .then(function(){return knex('admin').del()})
    .then(function(){
      return Promise.all([
        knex('admin').insert({id: 1, email: 'jonathan_lorimer@mac.com'}),
        knex('admin').insert({id: 2, email: 'thiago@me.com'}),
        knex('admin').insert({id: 3, email: 'jazzyjazz@gmail.com'})
      ])
    })
    .then(function () {
      return Promise.all([
        knex('survey').insert({
          id: 1,
          admin_id: 1,
          title: 'Lunch!',
          description: 'lets choose a place to go for lunch!',
          admin_link: 'http://www.google.ca',
          user_link: 'http://www.yahoo.ca',
          question: 'Where to go for lunch?'
        }),
        knex('survey').insert({
          id: 2,
          admin_id: 2,
          title: 'Weekend Plans!',
          description: 'lets Brazillian things!',
          admin_link: 'http://www.google.ca',
          user_link: 'http://www.yahoo.ca',
          question: 'What to do on the weekend?'
        }),
        knex('survey').insert({
          id: 3,
          admin_id: 3,
          title: 'Mentor Poll',
          description: 'time to judge them!',
          admin_link: 'http://www.google.ca',
          user_link: 'http://www.yahoo.ca',
          question: 'Who is the best mentor?'
        })
      ]);
    })
    .then(function () {
      return Promise.all([
        knex('results').insert({
          id: 1,
          survey_id: 1,
          answer_1: 'Burger King',
          score_1: 0,
          answer_2: 'Porchetta & Co.',
          score_2: 0,
          answer_3: 'Bahn Mi Boys',
          score_3: 0,
          answer_4: 'Burger Priest',
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
          answer_4: 'Make Pisco Sours',
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
          answer_4: 'Jonathan',
          score_4: 0
        })
      ]);
    })
    .then (function(){
      return Promise.all([
        knex.raw('ALTER SEQUENCE admin_id_seq RESTART WITH 7'),
        knex.raw('ALTER SEQUENCE survey_id_seq RESTART WITH 7'),
        knex.raw('ALTER SEQUENCE results_id_seq RESTART WITH 7')
      ])
    });
};