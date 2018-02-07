exports.seed = function(knex, Promise) {
  return knex('admin').del()
    .then(function () {
      return Promise.all([
        knex('admin').insert({id: 1, email: 'jonathan_lorimer@mac.com'}),
        knex('admin').insert({id: 2, email: 'thiago@me.com'}),
        knex('admin').insert({id: 3, email: 'jazzyjazz@gmail.com'})
      ]);
    });
};
