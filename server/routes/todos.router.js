const express = require('express');
const { route } = require('express/lib/application');
const pool = require('../modules/pool');
const Router = express.Router();

Router.post('/', (req, res) => {
    console.log('in router POST');
    let newTD = req.body;
    console.log('Adding new item: ', newTD);

    const queryText = `
                        INSERT INTO "to-do"
                            ("name", "section", "priority", "deadline_date", "deadline_time", "notes")
                            VALUES ($1, $2, $3, $4, $5, $6);
                            `;
    pool.query(queryText, [newTD.name, newTD.section, newTD.priority, newTD.deadlineDate, newTD.deadlineTime, newTD.notes])
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
    const queryText = `
                        SELECT * FROM "to-do"
                            ORDER BY "id" ASC;
                            `;
    pool.query(queryText)
    .then((result) => {
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('Error: Could not retrieve list ', error);
        res.sendStatus(500);
    });
});// end GET

Router.delete('/:id', (req, res) => {
    console.log('in router DELETE');
    let todoID = req.params.id;
    console.log(`Todo of ID ${todoID} will be removed from the database`);
    const queryText = `
                        DELETE FROM "to-do"
                            WHERE "id" = $1;
                            `;
    pool.query(queryText, [todoID])
    .then((dbRes) => {
        console.log(dbRes);
        res.sendStatus(200);
    })
    .catch((err) => {
        console.log('Error in DELETE: ', err);
        res.sendStatus(500);
    });
});// end DELETE

Router.put('/:id', (req, res) => {
    console.log('In PUT');
    let todoID = req.params.id;
    console.log(todoID);
    console.log('Mark to-do item complete: ', req.body.complete);
    const queryText = `
                        UPDATE "to-do"
                            SET "complete" = $2
                            WHERE "id" = $1;
                            `;
    pool.query(queryText, [todoID, req.body.complete])
    .then((dbRes) => {
        console.log(dbRes);
        res.sendStatus(200);
    })
    .catch((err) => {
        console.log('Error in PUT: ', err);
        res.sendStatus(500);
    });
});// end PUT

module.exports = Router;
