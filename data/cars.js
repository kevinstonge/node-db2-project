const express = require('express');
const { transaction } = require('./dbConfig.js');
const router = express.Router();
const db = require('./dbConfig.js');
router.get('/', async (req, res) => {
    try {
        const cars = await db('cars');
        res.status(200).json({ cars });
    }
    catch (e) {
        res.status(500).json({error: e})
    }    
});

const validateCar = async (req, res, next) => {
    try {
        const [car] = await db('cars').where({ id: req.params.id });
        if (car) { res.car = car; next(); }
        else { res.status(404).json({message: "car with requested ID does not exist in the database"})}
    }
    catch (e) {
        res.status(500).json({error: e})
    }
}

router.use('/:id', validateCar);

router.get('/:id', (req, res) => {
    res.status(200).json({ car: res.car });
})

router.post('/', async (req, res) => {
    try {
        const { VIN, make, model, mileage, titleStatus, transmissionType } = req.body;
        if (!VIN || !make || !model || !mileage) {
            res.status(401).json({ message: "Bad request: VIN, make, model, and mileage are required to create a car item in the database" })
        } else {
            //creating the newCar object ensures that ONLY valid properties are passed into the dbms
            //further validation should be added to ensure each value is an appropriate length and type
            const newCar = {
                ...VIN && { VIN },
                ...make && { make },
                ...model && { model },
                ...mileage && { mileage },
                ...titleStatus && { "title status": titleStatus },
                ...transmissionType && { "transmission type": transmissionType }
            };
            const car = await db('cars').insert(newCar);
            res.status(201).json({ message: "successfully created car", car });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "a server error occurred while attempting to insert the car data into the database", error });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { VIN, make, model, mileage, titleStatus, transmissionType } = req.body;
        if (!VIN && !make && !model && !mileage && !titleStatus && !transmissionType) {
            res.status(401).json({ message: "Bad request: to update a car you must provide at least once of the following: VIN, make, model, mileage, titleStatus, transmissionType" });
        } else {
            const updatedCar = {
                ...VIN && { VIN },
                ...make && { make },
                ...model && { model },
                ...mileage && { mileage },
                ...titleStatus && { "title status": titleStatus },
                ...transmissionType && { "transmission type": transmissionType }
            };
            const update = await db('cars').update(updatedCar).where({ id: req.params.id });
            res.status(200).json({ message: "successfully updated car", car: update });
        }
    }
    catch (error) {
        res.status(500).json({message: "a server error occurred while attempting to update the car information", error})
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleted = await db('cars').where({ id: req.params.id }).del();
        res.status(200).json({ message: "car deleted successfully", "count": deleted })
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message: "a server error occurred while attempting to delete the car from the database", error})
    }
});

module.exports = router;