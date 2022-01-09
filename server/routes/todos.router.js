const express = require('express');
const pool = require('../modules/pool');
const Router = express.Router();

Router.post('/', (req, res) => {
    console.log('in POST');
    let newTD = req.body;
    console.log('Adding new item: ', newTD);

    const queryText = `
                    INSERT INTO "to-do"
                        ("name", "section", "notes")
                        VALUES ($2, $3, $7);                
                        `;
    pool.query(queryText, [newTD.name, newTD.section, newTD.notes])
        .then((result) => {
            console.log('Added item ', result);
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('Errot adding new item ', err);
            res.sendStatus(500);
        });
}); // end POST


module.exports = Router;
