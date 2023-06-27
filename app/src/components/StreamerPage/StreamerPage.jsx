import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import VoteButton from "../VoteButton";

const StreamerPage = ({ socket, streamersData, setStreamersData }) => {
    const { id } = useParams();

    return (
        <div className="StreamerPage">
            <h1>{streamersData[id]?.name}</h1>
            <p>{streamersData[id]?.platform}</p>
            <p>{streamersData[id]?.description}</p>
        </div>
    );
}

export default StreamerPage;