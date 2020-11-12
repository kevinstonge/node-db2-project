
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cars', tbl => {
        tbl.increments();
        tbl.text('VIN', 32).unique().notNullable();
        tbl.text('make', 32);
        tbl.text('model', 32);
        tbl.decimal('mileage', 1);
        tbl.text('title status', 32);
        tbl.text('transmission type', 32);
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('cars');
};
