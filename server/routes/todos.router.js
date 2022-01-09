const express = require('express');
const pool = require('../modules/pool');
const Router = express.Router();

Router.post('/', (req, res) => {
    console.log('in router POST');
    let newTD = req.body;
    console.log('Adding new item: ', newTD);

    const queryText = `
                    INSERT INTO "to-do"
                        ("name", "section", "notes")
                        VALUES ($1, $2, $3);
                        `;
    pool.query(queryText, [newTD.name, newTD.section, newTD.notes])
        .then((result) => {
            console.log('Added item ', result);
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('Error adding new item ', err);
            res.sendStatus(500);
        });
}); // end POST

Router.get('/', (req, res) => {
    console.log('in router GET');
    const queryText = `SELECT * FROM "to-do"`;
    pool.query(queryText)
    .then((result) => {
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('Error: Could not retrieve list ', error);
        res.sendStatus(500);
    });
});// end GET

module.exports = Router;
