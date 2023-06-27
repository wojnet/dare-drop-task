const express = require("express");
const router = express.Router();
const db = require("../services/database/database.js");

const allowedStreamingPlatforms = ["twitch", "youtube", "facebook"];

//[POST] /streamers - recieve streamer submissions from the frontend (emit socket io update)

router.post("/", (req, res) => {
    const { name, platform, description } = req.body;

    if (!allowedStreamingPlatforms.includes(platform)) {
        return res.status(400).send("invalid platform name");
    }
    
    let query = "INSERT INTO streamers (name, platform, description) VALUES (?, ?, ?);";
    db.run(query, [name, platform, description], (err) => {
        if (err) return res.status(500).end();
    });

    const io = req.app.get("socketio");
    io.emit("refetch-streamers");

    res.status(200);
    res.end();
});


//[GET] /streamers - return all the stored streamer submissions

router.get("/", (req, res) => {
    let query = "SELECT * FROM streamers ORDER BY id DESC;";
    db.all(query, (err, rows) => {
        if (err) return res.status(500).end();

        res.status(200).json(rows);
        res.end();
    });
});


//[GET] /streamers/[streamerId] - return data about a specific streamer

router.get("/:streamerId", (req, res) => {
    const { streamerId } = req.params;

    let query = "SELECT * FROM streamers WHERE id = ? ORDER BY id DESC LIMIT 1;";
    db.get(query, [streamerId], (err, row) => {
        if (err) return res.status(500).end();

        res.status(200).json(row);
        res.end();
    });
});


//[PUT] /streamers/[streamerId]/vote - recieve vote and update the vote count (emit socket io update)

router.put("/:streamerId/vote", (req, res) => {
    const { streamerId } = req.params;
    const { type } = req.body;

    let columnName;
    
    switch(type) {
        case "upvote":
            columnName = "upvotes";
            break;
        case "downvote":
            columnName = "downvotes";
            break;
    }

    let query = `UPDATE streamers SET ${columnName} = ${columnName} + 1 WHERE id = ?;`;
    db.run(query, [streamerId], (result, err) => {
        if (err) return res.status(500).end();
    });

    const io = req.app.get("socketio");
    io.emit("refetch-streamers", {id: streamerId});

    res.status(200);
    res.end(req.params.streamerId + " - voted");
});

module.exports = router;