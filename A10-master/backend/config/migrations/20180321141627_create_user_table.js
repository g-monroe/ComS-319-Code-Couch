exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function (table) {
        table.string('username').notNullable().unique();
        table.string('email').notNullable().unique().primary();
        table.string('password').notNullable();
        table.string('firstName').notNullable();
        table.string('lastName').notNullable();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
