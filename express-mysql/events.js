const express = require('express');

const ROUTES = (database) => {
    const router = express.Router();
    // console.log(">>> Database Connection: ", database);

    // Adding New Student To Database
    router.post('/students', (req, res, next) => {
        const { name, crn, urn, email, mentor } = req.body;
        // console.log(name, crn, urn, email, mentor);
        database.query(
            `insert into std_record (name, urn, crn, email, mentor) values (?,?,?,?,?)`,
            [name, urn, crn, email, mentor],
            (error) => {
                if (error) {
                    // console.log(error); 
                    res.status(500).json({status: 'error'});
                } else {
                    // console.log(result);
                    res.status(200).json({status: 'ok'});
                }
            }
        );
    });

    // Updating Existing Student To Database
    router.put('/students/:id', (req, res, next) => {
        const { name, crn, urn, email, mentor } = req.body;
        // console.log(">>> Update: ", name, crn, urn, email, mentor);
        database.query(
            `update std_record set name=?, urn=?, crn=?, email=?, mentor=? where id=${req.params.id}`,
            [name, urn, crn, email, mentor],
            (error) => {
                if (error) {
                    // console.log(error); 
                    res.status(500).json({status: 'error'});
                } else {
                    // console.log(result);
                    res.status(200).json({status: 'ok'});
                }
            }
        );
    });

    // Getting Student List
    router.get('/students', (req, res, next) => {
        database.query('select * from std_record', (error, result) => {
            if (error) {
                // console.log(error);
                res.status(500).json({status: 'error'});
            } else {
                // console.log(result);
                res.status(200).json(result);
            }
        })
    })

    // Delete Stduent from Database
    router.delete('/students/:id', (req, res, next) => {
        database.query(`delete from std_record where id = ${req.params.id}`, 
        (error, result) => {
            if (error) {
                // console.log(error);
                res.status(500).json({status: 'error', data: error});
            } else {
                // console.log(result);
                res.status(200).json({status: 'ok', data: result});
            }
        })
    })

    return router;
}

module.exports = ROUTES;