var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var expressValidator=require('express-validator');
var mongoose = require('mongoose');
var Book = require('./Book.model');
var validator = require('./helper/index');
var port = 8080;
var db = 'mongodb://localhost/example';

mongoose.connect(db).then(() => console.log("mongodb connected")).catch(err => console.log(err));
//In the above code we require Mongoose and connect to our MongoDB 
//database. The database is called example and if all went well, you will now see mongodb connected... in your terminal.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
//used as middleware
app.use(expressValidator());

app.get('/', function(req, res) {
  res.send('happy to be here');
});

app.get('/books', function(req, res) {
  console.log('getting all books');
  //Here the object passed to find() is empty. This means that no constraint is set 
  //to what we are looking for and all objects in the database should be returned.
  
  Book.find({})
    .exec(function(err, books) {
      if(err) {
        res.send('error occured')
      } else {
        console.log(books);
//If everything went well, the result of the query (in our case an array of goals) is
//sent back to the client formatted as JSON. 
        res.json(books);
      }
    });
});
app.get('/books/:id', function(req, res) {
  console.log('getting all books');
  Book.findOne({
    _id: req.params.id
    })
    .exec(function(err, books) {
      if(err) {
        res.send('error occured')
      } else {
        console.log(books);
        res.json(books);
      }
    });
});

app.post('/book', function(req, res) {
  var newBook = new Book();

  newBook.title = req.body.title;
  newBook.author = req.body.author;
  newBook.category = req.body.category;
  newBook.description = req.body.description;
  newBook.image = req.body.image;


  newBook.save(validator.createValiedator,function(err, book) {
    if(err) {
      res.send('error saving book');
    } else {
      console.log(book);
      res.send(book);
    }
  });
});

app.post('/book2',validator.createValiedator,function(req, res) {
  Book.create(req.body, function(err, book) {
    if(err) {
      
      console.log(err);
      res.send('error saving book');
    } else {
      console.log(book);
      res.send(book);
    }
  });
});

app.put('/book/:id', function(req, res) {
  Book.findOneAndUpdate({
    _id: req.params.id
    },
    { $set: { title: req.body.title }
  }, {upsert: true}, function(err, newBook) {
    if (err) {
      res.send('error updating ');
    } else {
      console.log(newBook);
      res.send(newBook);
    }
  });
});

// app.delete('/book/:id', function(req, res) {
//   Book.findOneAndRemove({
//     _id: req.params.id
//   }, function(err, book) {


//     if(err) {

//       res.send('error removing')

//     } else {

//       console.log(book);
//       res.status(204);
//     }
//   });
// });

app.listen(port, function()
{
  console.log('app listening on port ' + port);
});
