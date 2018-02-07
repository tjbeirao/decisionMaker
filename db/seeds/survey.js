exports.seed = function(knex, Promise) {
  return knex('survey').del()
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
    });
};
