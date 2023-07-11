const express = require("express");
const app = express();
const port = 4000;
const { query } = require('./database');
const books = require("./books");
require("dotenv").config();

app.use(express.json());

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})

function getNextIdFromCollection(collection) {
    if (collection.length === 0) return 1;
    const lastRecord = collection[collection.length - 1];
    return lastRecord.id + 1;
}

app.get("/books", async (req, res) => {
    try {
        const allBooks = await query("SELECT * FROM book_inventory");
        res.status(200).json(allBooks.rows);
    } catch (err) {
        console.error(err);
    }
});

app.get("/books/:id", async (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    try {
        const book = await query("SELECT * FROM book_inventory WHERE id = $1", [bookId]);

        if (job.rows.length > 0) {
            res.status(200).json(job.rows[0]);
        } else {
            res.status(404).send({ message: "Book not found" });
        }
    } catch (err) {
        console.error(err);
    }
});

app.post("/books", async (req, res) => {
    const { title, author, genre, quantity } = req.body;
    try {
        const newBook = await query(
        "INSERT INTO book_inventory (title, author, genre, quantity) VALUES ($1, $2, $3, $4) RETURNING *",
        [title, author, genre, quantity]
    );
        res.status(201).json(newBook.rows[0]);
    } catch (err) {
        console.log(err);
    }
});

app.patch("/books/:id", async (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const { title, author, genre, quantity } = req.body;
    try {
        const updatedBook = {
            ...
        }
    } catch (err) {
        console.error(err);
    }
});

app.delete("/books/:id", async (req, res) => {
    const bookId = parseInt(req.params.id, 10);

    try {
        const deleteBook = await query("DELETE FROM book_inventory WHERE id = $1", [bookId]);

        if(deleteBook.rowCount > 0) {
            res.status(200).send({ message: "Book deleted successfully" });
        } else {
            res.status(404).send({ message: "Book not found" });
        }
    } catch (err) {
        console.error(err);
    }
});