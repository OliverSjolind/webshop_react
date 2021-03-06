const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();

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


app.get('/p/:product', function (req, res, next) {
    let productUrl = req.params.product;

    let db = new sqlite3.Database('products.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) console.error(err.message);
        console.log('Connected to the products database.');
    });

    db.serialize(() => {

        db.get(`SELECT * FROM products WHERE url = ?`, [productUrl], (err, product) => {
            if (err) console.error(err.message);

            res.json(product)

        });
    });

    db.close((err) => {
        if (err) return console.error(err.message);
        console.log('Closed the database connection.');
    });
});

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
            let stockSqlite = `SELECT * FROM products AS a, product_categories AS b WHERE b.category_id = ? AND a.id = b.product_id`
            if (req.query) {
                // Price Range
                if (req.query.pr) {
                    let priceRange = req.query.pr.split('-')
                    stockSqlite += ` AND price BETWEEN ${priceRange[0]} and ${priceRange[1]}`
                }

                // Search
                if (req.query.s) {
                    stockSqlite += ` AND name LIKE '%${req.query.s}%'`
                }
                // Order by
                if (req.query.ob)
                    switch (req.query.ob) {
                        case 'priceAsc': stockSqlite += ' ORDER BY price ASC';
                            break;
                        case 'priceDesc': stockSqlite += ' ORDER BY price DESC';
                    }
            }
            console.log(stockSqlite)

            db.all(stockSqlite, [categoryId], (err, products) => {
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

app.get('/s/:searchinput', function (req, res) {
    let searchInput = req.params.searchinput;

    let db = new sqlite3.Database('products.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) console.error(err.message);
        console.log('Connected to the products database.');
    });

    db.serialize(() => {
        db.get(`SELECT id FROM categories WHERE name = ?`, [categoryName], (err, row) => {

            db.all(`SELECT * FROM products WHERE name LIKE '%${searchInput}%'`, (err, products) => {
                if (err) console.error(err.message);
                res.json(products)
            });
        });

        db.close((err) => {
            if (err) console.error(err.message);
            console.log('Closed the database connection.');
        });
    });
})

app.get('/c/:category/getPriceRange', function (req, res) {
    let categoryName = req.params.category;

    let db = new sqlite3.Database('products.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) console.error(err.message);
        console.log('Connected to the products database.');
    });

    db.serialize(() => {
        db.get(`SELECT id FROM categories WHERE name = ?`, [categoryName], (err, row) => {
            if (err) console.error(err.message)
            let categoryId = row.id;

            db.all(`SELECT price FROM products AS a, product_categories AS b WHERE b.category_id = ? AND a.id = b.product_id`, [categoryId], (err, prices) => {
                if (err) {
                    console.error(err.message);
                }
                res.json(prices)
            });
            db.close((err) => {
                if (err) console.error(err.message);
                console.log('Closed the database connection.');
            });
        });
    });
});


////
const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);