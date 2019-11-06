module.exports = (app, db) => {

    app.post("/save/:id", (req, res) => {
        db.Article.update({
            _id: req.params.id
        }, {
            $set: {
                saved: true
            }
        }).then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send(err)
        });
    });

    app.post("/unsave/:id", (req, res) => {
        db.Article.update({
            _id: req.params.id
        }, {
            $set: {
                saved: false
            }
        }).then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send(err)
        });
    });

    app.post("/unnote/:id", (req, res) => {
        db.Note.deleteOne({
            _id: req.params.id
        }).then((result) => {
            res.status(200);
        }).catch((error) => {
            res.send(err);
        })
    });

    app.post("/note/:id", (req, res) => {
        db.Note.insert({
            title: req.body.title,
            body: req.body.body
        }).then((noteDb) => {
            db.Article.update({
                    _id: req.params.id
                }, {
                    $set: {
                        note: noteDb._id
                    }
                })
                .then((result) => {
                    res.send(result);
                })
                .catch((err) => {
                    res.send(err);
                });
        }).catch((err) => {
            res.send(err)
        });
    });
};