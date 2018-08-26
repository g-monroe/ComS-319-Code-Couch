
exports.up = function(knex, Promise) {
    return knex.schema.createTable('UsersAndProj', function (table) {
        table.string('projectAdd').notNullable();
        table.string('userAdd').notNullable();
        //table.foreign('user').references('users.username');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('UsersAndProj');
};
