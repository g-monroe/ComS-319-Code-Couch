const knex = require('knex')(require('../../config/knexfile'));
const bookshelf = require('bookshelf')(knex);

export default bookshelf.Model.extend({
    tableName: 'users'
});
