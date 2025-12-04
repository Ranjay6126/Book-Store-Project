import express from 'express';
import {Book} from '../models/BookModel.js';

const router = express.Router();

//Route for Save a new Book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publicYear) {
      return res.status(400).send({
        message: "send all required fields : title, author, publishYear",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publicYear: req.body.publicYear,
    };

    const book = await Book.create(newBook);
    // const result = console.log("result", req.body)
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for get All Books from database:
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Route fo the get one book from the database by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


//Route for the Update the books
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publicYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publicYear",
      });
    }

    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).send({
      message: "Book updated successfully",
      book: result,
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Delete a book with mongoose
router.delete("/:id", async(req,res)=>{
    try{
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(400).json({message:'Book not found'});
        } else{
            return res.status(400).json({message:"Book deleted Successfully"})
        }

    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
});

export default router;