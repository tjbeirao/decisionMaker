exports.seed = function(knex, Promise) { 
  return knex('results').del()
    .then(function(){return knex('survey').del()})
    .then(function(){return knex('admin').del()})
    .then(function(){
      return Promise.all([
        knex('admin').insert({id: 1, email: 'jonny@mac.com'}),
        knex('admin').insert({id: 2, email: 'thiago@me.com'}),
        knex('admin').insert({id: 3, email: 'jazzyjazz@gmail.com'})
      ])
    })
    .then(function () {
      return Promise.all([
        knex('survey').insert({
          id: 1,
          admin_id: 1,
          admin_link: 'http://www.google.ca',
          user_link: 'http://www.yahoo.ca',
          question: 'Where to go for lunch?',
        }),
        knex('survey').insert({
          id: 2,
          admin_id: 2,
          admin_link: 'http://www.google.ca',
          user_link: 'http://www.yahoo.ca',
          question: 'What to do on the weekend?',
        }),
        knex('survey').insert({
          id: 3,
          admin_id: 3,
          admin_link: 'http://www.google.ca',
          user_link: 'http://www.yahoo.ca',
          question: 'Who is the best mentor?',
        }),
        knex('results').insert({
          id: 1,
          survey_id: 1,
          answer: 'Taco Bell',
          description: 'Yummy!',
          score: 0,
        }),
        knex('results').insert({
          id: 2,
          survey_id: 1,
          answer: 'Burger King',
          description: 'Whoppers!',
          score: 0,
        }),
        knex('results').insert({
          id: 3,
          survey_id: 1,
          answer: 'McDonalds',
          description: 'Big Macs!',
          score: 0,
        }),
        knex('results').insert({
          id: 4,
          survey_id: 1,
          answer: 'Gin and Tonics',
          description: 'Fun!',
          score: 0,
        }),
        knex('results').insert({
          id: 5,
          survey_id: 2,
          answer: 'Caipirinhas',
          description: 'Booze!',
          score: 0,
        }),
        knex('results').insert({
          id: 6,
          survey_id: 2,
          answer: 'Footsaul',
          description: 'Sports!',
          score: 0,
        }),
        knex('results').insert({
          id: 7,
          survey_id: 2,
          answer: 'Canoeing the Amazon',
          description: 'Outdoors!',
          score: 0,
        }),
        knex('results').insert({
          id: 8,
          survey_id: 2,
          answer: 'Soccer',
          description: 'Other Sports!',
          score: 0,
        }),
        knex('results').insert({
          id: 9,
          survey_id: 3,
          answer: 'Tim',
          description: 'Helpful!',
          score: 0,
        }),
        knex('results').insert({
          id: 10,
          survey_id: 3,
          answer: 'Kowsheek',
          description: 'Smart!',
          score: 0,
        }),
        knex('results').insert({
          id: 11,
          survey_id: 3,
          answer: 'Jonathan',
          description: 'Understanding!',
          score: 0,
        }),
        knex('results').insert({
          id: 12,
          survey_id: 3,
          answer: 'Zach',
          description: 'Funny!',
          score: 0,
        }),
      ]);
    })
    .then (function(){
      return Promise.all([
        knex.raw('ALTER SEQUENCE admin_id_seq RESTART WITH 7'),
        knex.raw('ALTER SEQUENCE survey_id_seq RESTART WITH 7')
      ])
    });
};