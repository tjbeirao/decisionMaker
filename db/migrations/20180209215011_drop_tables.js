exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('survey'),
        knex.schema.dropTable('admin')
    ])
};

exports.down = function (knex, Promise) {
    return Promise.all([
    ])
};
