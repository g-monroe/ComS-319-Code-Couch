
exports.up = function(knex, Promise) {

    return knex.schema.createTable('Stories', function (table) {
        table.string('story').notNullable();
        table.string('title').notNullable();
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('Stories');
};
