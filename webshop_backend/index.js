const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();

app.get('/c/:category', function (req, res) {
    let categoryName = req.params.category;

    let db = new sqlite3.Database('products.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) console.error(err.message);
        console.log('Connected to the products database.');
    });

    db.serialize(() => {
        db.get(`SELECT id FROM categories WHERE name = ?`, [categoryName], (err, row) => {
            if (err) console.error(err.message)

            let categoryId = row.id;

            db.all(`SELECT * FROM products AS a, product_categories AS b WHERE b.category_id = ? AND a.id = b.product_id`, [categoryId], (err, products) => {
                if (err) {
                    console.error(err.message);
                }
                res.json(products)
            });
            db.close((err) => {
                if (err) console.error(err.message);
                console.log('Closed the database connection.');
            });
        });
    });
});

app.get('/getFrontpageProducts', function (req, res) {
    console.log(req.header('User-Agent'));

    let db = new sqlite3.Database('products.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) console.error(err.message);
        console.log('Connected to the products database.');
    });

    db.serialize(() => {
        db.all(`SELECT * FROM products ORDER BY random() LIMIT 8`, (err, products) => {
            if (err) {
                console.error(err.message);
            }
            res.json(products)
        });
    });
    db.close((err) => {
        if (err) console.error(err.message);
        console.log('Closed the database connection.');
    });
});

////
const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
