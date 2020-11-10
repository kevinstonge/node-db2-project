const express = require('express');
const router = express.Router();
const db = require('./dbConfig.js');
router.get('/', (req, res) => {
    db('cars')
        .then(r => {
            res.status(200).json({
                message: "get /api/cars",
                data: r
            })    
        })
        .catch(e => {
            res.status(500).json({message: "error: unable to retrieve cars data"})
        })
    
});

module.exports = router;