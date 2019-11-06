const axios = require("axios");
const cheerio = require("cheerio");

module.exports = (app, db) => {

    app.get("/", (req, res) => {
        db.Article.find({
            saved: false
        }).populate("note").then((result) => {
            res.render("index", {
                articles: result
            });
        }).catch((error) => {
            res.send(error);
        });
    });

    app.get("/scrape", function (req, res) {
        console.log("Received request to scrape");

        axios.get("https://www.theonion.com/").then(function (response) {
            console.log("Received data from axios");

            const $ = cheerio.load(response.data);

            let data = [];

            console.log("Searching for articles");

            $("section.content-meta__headline__wrapper a").each(function (i, element) {

                let newArticle = {
                    title: $(element).text(),
                    link: $(element).attr("href")
                };

                if (newArticle.title !== 'Continue Reading' && newArticle.title !== '' && newArticle.title !== undefined && newArticle.title !== null) {

                    db.Article.create(newArticle)
                        .then(function (dbArticle) {
                            data.push(dbArticle);
                        })
                        .catch(function (err) {
                            console.log(err);
                            return err;
                        });
                }
            });

            console.log("Finshed");

            // console.log(data);

            res.render("index", {
                articles: data
            });
        }).catch((error) => {
            res.send(error);
        });
    });

    app.get("/saved", (req, res) => {
        db.Article.find({
            saved: true
        }).populate("note").then((result) => {
            res.render("index", {
                saved: true,
                articles: result
            });
        }).catch((error) => {
            res.send(error);
        });
    });

    app.get("/article/:id", (req, res) => {
        db.Article.findOne({
            _id: req.params.id
        }).populate("note").then((article) => {
            res.json(article);
        }).catch((error) => {
            res.send(error);
        });
    });

    app.get("/clear", (req, res) => {
        db.Article.deleteMany({}).then(() => {
            db.Note.deleteMany({}).then(() => {
                res.render("index", {});
            }).catch((error) => {
                res.send(error);
            });
        }).catch((error) => {
            res.send(error);
        });
    });
};