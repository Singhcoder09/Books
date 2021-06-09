const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const Book = mongoose.model('Book');

exports.createBook =  (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
    });
// Save a Book in the MongoDB
book.save().then(data => {
        res.status(200).json(data);
    }).catch(err =>{
        res.status(500).json({
            message:"Fail",
            error: err.message
        });
    });    
};

exports.getBook = (req, res) => {
    Book.findById(req.params.id).select('-__v')
        .then(book => {
            res.status(200).json(book);
        }).catch(err => {
            if(err.kind === 'objectId') {
                return res.status(404).send({
                    message: "Book not found with id " + req.params.id,
                    error: err
                });
            }
            return res.status(500).send({
                message: "Error retriveving book with id " + req.params.id,
                error: err
            });
        });
};

exports.books = (req, res) => {
    Book.find().select('-__v').then(bookInfos => {
        res.status(200).json(bookInfos);
    }).catch(error => {
        //log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    });
};

exports.deleteBook = async (req, res) => {
    Book.findByIdAndRemove(req.params.id).select('-__v-_id')
        .then(book => {
            if(!book){
                res.status(404).json({
                    message: "No book found whith id = " + req.params.id,
                    error: "404",
                });
            }
            res.status(200).json({});
        }).catch(err => {
            return res.status(500).send({
                message: "Error -> Can't delete book with id = " + req.params.id,
                error: err.message
            });
        });
};

exports.updateBook = async (req, res) => {
    //Find inventory and update it
    Book.findByIdAndUpdate(req.body._id,{
        title: req.body.title,
        author: req.body.author
    },
    {new: false}
    ).select('-__v')
        .then(book => {
            if(!book) {
                return res.status(404).send({
                    message: "Error -> Can't update an book with id = " + req.params.id,
                    error: "Not Found!"
                });
            }
            res.status(200).json(book);
        }).catch(err => {
            return res.status(500).send({
            message: "Error -> Can't update a book with id = " + req.params.id,
            error: err.message
            });
        });
};