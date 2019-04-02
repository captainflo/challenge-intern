// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

console.log(db.Message);

// Routes
//  =============================================================
module.exports = function(app) {
  // Get route for retrieving all of the Messages
    app.get("/api/all", function(req, res) {
      db.Message.findAll({}).then(function(data) {
        res.json(data);
       });
    });

    // PUT route for updating isStarred to true
    app.put("/api/star", function(req, res) {
      db.Message.update({
        isStarred: req.body.isStarred
      }, {
        where: {
          id: req.body.id
        }
        }).then(function(dbMessage) {
            res.json(dbMessage);
          });
      });

    // PUT route for updating Message isTrash to true
    app.put("/api/trash", function(req, res) {
      db.Message.update({
        isTrashed: req.body.isTrashed
    }, {
      where: {
        id: req.body.id
      }
      }).then(function(dbMessage) {
          res.json(dbMessage);
       });
    });

     // GET allows a user to sort messages by score
     app.get("/api/scoreup", function(req, res) {
      db.Message.findAll({
        order: [
          ['score', 'ASC']
      ]
      }).then(function(dbscore) {
          res.json(dbscore);
       });
    });

    // GET allows a user to sort messages by score
    app.get("/api/scoredown", function(req, res) {
      db.Message.findAll({
        order: [
          ['score', 'DESC']
      ]
      }).then(function(dbscore) {
          res.json(dbscore);
       });
    });

    // Get route for took all content Messages 
    app.get("/api/content/:input", function(req, res) {
      db.Message.findAll({
        where: {
          // Operator for like in SQL from Sequelize
          content: {[db.Op.like]: '%' + req.params.input + '%'}
        }
      }).then(function(data) {
        res.json(data);
        });
      });
};

