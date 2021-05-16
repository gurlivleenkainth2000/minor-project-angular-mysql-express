const express = require("express");
const ldap = require("ldapjs");
const { tables } = require("./config");

const ROUTES = (database) => {
  const router = express.Router();
  // console.log(">>> Database Connection: ", database);

  router.get("/login", (req, res, next) => {
    const client = ldap.createClient({
      url: "ldap://auth.gndec.ac.in",
      bindDN: `ou=people,dc=auth,dc=gndec,dc=ac,dc=in`,
    });

    client.bind(
      `uid=${req.body.username},ou=people,dc=auth,dc=gndec,dc=ac,dc=in`,
      req.body.password,
      async (error, response) => {
        if (error) {
          res.json({ status: "error", error: error, response: null });
        }
        if (response) {
          // res.json({status: "ok", data: response })
          database.query(
            `select * from ${tables.studentInfo} where college_roll_no = ${req.body.username}`,
            (stdError, stdResult) => {
              if (stdError) {
                  res.send({ status: "error", loginType: null, error: userError, response: null });
              }

              if (stdResult.length != 0) {
                res.send({ status: "ok", loginType: "student", error: null, response: stdResult });
              } else {
                database.query(
                  `select * from ${tables.users} where username = ${req.body.username}`,
                  (userError, userResult) => {
                    if(userError) {
                        res.send({ status: "error", loginType: null, error: userError, response: null });
                    }

                    if (userResult.length != 0) {
                        res.send({ status: "ok", loginType: "staff", error: null, response: userResult });
                    } else {
                        res.send({ status: "ok", loginType: null, error: null, response: `No Record Found Related ${req.body.username}` });
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  });

  router.get("/tables-info", (req, res, next) => {
    database.query(`select * from ${req.body.table}`, (error, response) => {
      res.send({ status: "ok", error: error, response: response });
    });
  });

  // Adding New Student To Database
  router.post("/students", (req, res, next) => {
    const { name, crn, urn, email, mentor } = req.body;
    // console.log(name, crn, urn, email, mentor);
    database.query(
      `insert into ${tables.studentInfo} (name, urn, crn, email, mentor) values (?,?,?,?,?)`,
      [name, urn, crn, email, mentor],
      (error) => {
        if (error) {
          // console.log(error);
          res.status(500).json({ status: "error" });
        } else {
          // console.log(result);
          res.status(200).json({ status: "ok" });
        }
      }
    );
  });

  // Updating Existing Student To Database
  router.put("/students/:id", (req, res, next) => {
    const { name, crn, urn, email, mentor } = req.body;
    // console.log(">>> Update: ", name, crn, urn, email, mentor);
    database.query(
      `update ${tables.studentInfo} set name=?, urn=?, crn=?, email=?, mentor=? where id=${req.params.id}`,
      [name, urn, crn, email, mentor],
      (error) => {
        if (error) {
          // console.log(error);
          res.status(500).json({ status: "error" });
        } else {
          // console.log(result);
          res.status(200).json({ status: "ok" });
        }
      }
    );
  });

  // Getting Student List
  router.get("/students", (req, res, next) => {
    database.query(`select * from ${tables.studentInfo}`, (error, result) => {
      if (error) {
        // console.log(error);
        res.status(500).json({ status: "error", message: error });
      } else {
        // console.log(result);
        res.status(200).json({ status: "ok", message: result });
      }
    });
  });

  // Delete Stduent from Database
  router.delete("/students/:id", (req, res, next) => {
    database.query(
      `delete from ${tables.studentInfo} where id = ${req.params.id}`,
      (error, result) => {
        if (error) {
          // console.log(error);
          res.status(500).json({ status: "error", data: error });
        } else {
          // console.log(result);
          res.status(200).json({ status: "ok", data: result });
        }
      }
    );
  });

  return router;
};

module.exports = ROUTES;
