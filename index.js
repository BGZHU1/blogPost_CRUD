var pg = require('pg');
var express = require('express');
// body parser
var bodyParser = require('body-parser');



var app = express();

// json method
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs')
app.set('views', './views')


app.post('/board', function(req,res){
      //console.log('hi');
  pg.connect('postgres://localhost:5432/message', function(err, client, done){
   client.query(`insert into message (title,body) values('${req.body.title}','${req.body.body}')`, function(err, result){
      //console.log(err);

      //console.log('hi');
     res.redirect('/display');
    //res.render('display', { data: result.rows});
      done();
      pg.end();
    })
  })

})

app.get('/board', function(req, res){
  pg.connect('postgres://localhost:5432/message', function(err, client, done){
    client.query('select * from message', function(err, result) {
      //res.redirect('/display');
      //res.redirect('/board');
      console.log(result.rows);
      res.render('board', { data: result.rows});


      done();
      pg.end();
    })
  })
})

app.get('/display', function(req, res){
  pg.connect('postgres://localhost:5432/message', function(err, client, done){
    client.query('select * from message', function(err, result) {
      //res.redirect('/display');
      //res.redirect('/board');
      console.log(result.rows);
      res.render('display', { data: result.rows});


      done();
      pg.end();
    })
  })
})



app.listen(3000, function(){
  console.log("Listening on port 3000")
})
