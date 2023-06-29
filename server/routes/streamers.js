const express = require("express");
const router = express.Router();
const db = require("../services/database/database.js");

const allowedStreamingPlatforms = ["twitch", "youtube", "facebook", "tiktok", "rumble"];


//[POST] /streamers - recieve streamer submissions from the frontend (emit socket io update)

router.post("/", (req, res) => {
    const { name, platform, description } = req.body;

    if (name.length <= 0) {
        return res.status(400).send("No name entered");
    }
 
    if (description.length > 1000) {
        return res.status(400).send("Too long description");
    }

    if (!allowedStreamingPlatforms.includes(platform)) {
        return res.status(400).send("Invalid platform name");
    }
    
    let query = "INSERT INTO streamers (name, platform, description) VALUES (?, ?, ?);";
    db.run(query, [name, platform, description], (err) => {
        if (err) return res.status(500).end();
    });

    const io = req.app.get("socketio");
    io.emit("fetch-all-streamers");

    res.status(200);
    res.end();
});


//[GET] /streamers - return all the stored streamer submissions

router.get("/", (req, res) => {
    let query = "SELECT * FROM streamers ORDER BY id DESC;";
    db.all(query, (err, rows) => {
        if (err) return res.status(500).end();

        res.status(200).json(rows);
    });
});


//[GET] /streamers/[streamerId] - return data about a specific streamer

router.get("/:streamerId", (req, res) => {
    const { streamerId } = req.params;

    let query = "SELECT * FROM streamers WHERE id = ? ORDER BY id DESC LIMIT 1;";
    db.get(query, [streamerId], (err, row) => {
        if (err) return res.status(500).end();

        res.status(200).json(row);
    });
});


//[PUT] /streamers/[streamerId]/vote - recieve vote and update the vote count (emit socket io update)

router.put("/:streamerId/vote", (req, res) => {
    const { streamerId } = req.params;
    const { type, socketId } = req.body;
    const { getConnectedUsers, setConnectedUsers } = req;

    const connectedUsers = getConnectedUsers();
    const connectedUserVotes = [...connectedUsers].filter(user => user.id === socketId)[0].votes;
    const connectedUserIndex = [...connectedUsers].findIndex(user => user.id === socketId);
    
    const currentVoteStatus = getVoteStatus();
    let newVoteStatus;

    const getVoteStatus = () => connectedUserVotes.filter(vote => vote.streamerId === streamerId)[0]?.status || "unvoted";

    const changeVotesByNumber = (column, method) => {
        let query = `UPDATE streamers SET ${column} = ${column} ${method === "increment" ? "+ 1" : method === "decrement" ? "- 1" : ""} WHERE id = ?;`;

        db.run(query, [streamerId], (result, err) => {
            if (err) return res.status(500).end();
        });
    }

    const updateUserArray = (newVoteStatus) => {
        let newUserArray = [...connectedUsers];
        
        switch (newVoteStatus) {
            case "unvoted":
                newUserArray[connectedUserIndex].votes = newUserArray[connectedUserIndex].votes.filter(vote => vote.streamerId !== streamerId);
                
                setConnectedUsers(newUserArray);
                return;
    
            case "upvoted": 
                newUserArray[connectedUserIndex].votes = newUserArray[connectedUserIndex].votes.filter(vote => vote.streamerId !== streamerId);
                newUserArray[connectedUserIndex].votes.push({
                    streamerId: streamerId,
                    status: "upvoted"
                });
    
                setConnectedUsers(newUserArray);
                return;
    
            case "downvoted":
                newUserArray[connectedUserIndex].votes = newUserArray[connectedUserIndex].votes.filter(vote => vote.streamerId !== streamerId);
                newUserArray[connectedUserIndex].votes.push({
                    streamerId: streamerId,
                    status: "downvoted"
                });
    
                setConnectedUsers(newUserArray);
                return;
        }
    }

    const handleVote = (currentVoteStatus) => {
        switch (currentVoteStatus) {
            case "unvoted":
                if (type === "upvote") {
                    changeVotesByNumber("upvotes", "increment");
                    newVoteStatus =  "upvoted";
                } else if (type === "downvote") {
                    changeVotesByNumber("downvotes", "increment");
                    newVoteStatus = "downvoted";
                }
                break;
    
            case "upvoted":
                if (type === "upvote") {
                    changeVotesByNumber("upvotes", "decrement");
                    newVoteStatus =  "unvoted";
                } else if (type === "downvote") {
                    changeVotesByNumber("upvotes", "decrement");
                    changeVotesByNumber("downvotes", "increment");
                    newVoteStatus = "downvoted";
                }
                break;
    
            case "downvoted":
                if (type === "upvote") {
                    changeVotesByNumber("upvotes", "increment");
                    changeVotesByNumber("downvotes", "decrement");
                    newVoteStatus =  "upvoted";
                } else if (type === "downvote") {
                    changeVotesByNumber("downvotes", "decrement");
                    newVoteStatus =  "unvoted";
                }
                break;
        }
    }

    handleVote(currentVoteStatus);
    updateUserArray(newVoteStatus);

    const io = req.app.get("socketio");
    io.emit("update-streamer-data", {id: streamerId, returnedVoteStatus: newVoteStatus});

    res.status(200);
    res.end();
});

module.exports = router;