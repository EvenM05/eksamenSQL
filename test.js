const mysql = require('mysql8');
const express = require("express");
const { json } = require('body-parser');
const app = express();
const port = 80;

var con = mysql.createConnection({
  host: "localhost",
  user: "even",
  password: "even123",
  database: "dbtest"
});

app.listen(port, function () {
  console.log(`listening on port ${port}!`);
});

// serves files like style.css and icon.png
app.use(express.static(__dirname + '/public'));
// To read req.body
app.use(express.json())


// serve database.html at /
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/database.html');
});

// database queries have to go here
con.connect(function(err) {
  if (err) throw err;

  //hente data
app.get("/brukere", function (req, res) {
  con.query("SELECT * FROM brukere", function (err, result, fields) {
    if (err) {
      console.log(err);
    }    res.send(result)
  });
})

app.get("/prosjekter", function (req, res) {
  con.query("SELECT * FROM prosjekter", function (err, result, fields) {
    if (err) {
      console.log(err);
    }
    res.send(result)
  });
})

app.get("/brukere_has_prosjekter", function (req, res) {
  con.query("SELECT * FROM brukere_has_prosjekter", function (err, result, fields) {
    if (err) {
      console.log(err);
    }
    res.send(result)
  });
})

// legge til data
app.post("/brukereadd", function (req, res) {
  if (req.body.navn == "" || req.body.info == ""){return}
  con.query('INSERT INTO brukere SET navn = ?, info = ?', [req.body.navn, req.body.info], function (err, result) {
    if (err) {
      console.log(err);
    }    
    res.redirect("/")
  });
})

app.post("/prosjekteradd", function (req, res) {
  if (req.body.navn == "" || req.body.info == ""){return}
  con.query('INSERT INTO prosjekter SET navn = ?, info = ?', [req.body.navn, req.body.info], function (err, result) {
    if (err) {
      console.log(err);
    }    
    res.redirect("/")
  });
})

app.post("/brukere_has_prosjekteradd", function (req, res) {
  if (req.body.navn == "" || req.body.info == ""){return}
  con.query('INSERT INTO brukere_has_prosjekter SET brukere_navn = ?, prosjekter_navn = ?', [req.body.navn, req.body.info], function (err, result) {
    if (err) {
      console.log(err);
    }    
    res.redirect("/")
  });
})



});
