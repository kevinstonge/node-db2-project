
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {id: 1, VIN: 'ASDF1234', make: "Honda", model: "Civic", mileage: 32363},
        {id: 2, VIN: 'QWERT6547', make: "Honda", model: "Accord", mileage: 37333},
        {id: 3, VIN: 'NNKIOO93897', make: "Nissan", model: "Altima", mileage: 789215}
      ]);
    });
};
