import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import VoteButton from "../VoteButton";
import StreamerImage from "../../assets/streamer1.jpg";

const StreamerPage = ({ socket, streamersData }) => {
    const { id } = useParams();
    const streamerData = streamersData.filter(streamer => streamer.id.toString() === id)[0];

    return (
        <div className="StreamerPage">
            <img src={StreamerImage} alt="Streamer image" />
            <h1>{streamerData.name}</h1>
            <p>{streamerData.platform}</p>
            <p>{streamerData.description}</p>
            <VoteButton type={"upvote"} number={streamerData.upvotes} id={id} /> 
            <VoteButton type={"downvote"} number={streamerData.downvotes} id={id} /> 
        </div>
    );
}

export default StreamerPage;