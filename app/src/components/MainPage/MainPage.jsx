import React, { useState, useEffect } from "react";
import axios from "axios";
import SubmitForm from "./SubmitForm";
import StreamerList from "./StreamerList";

const MainPage = ({ socket, streamersData, setStreamersData }) => {
    const fetchStreamers = async () => {
        const streamersResult = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/streamers`);
        setStreamersData([...streamersResult.data]);
    }

    useEffect(() => {
        socket.on("refetch-streamers", async (data) => {
            await fetchStreamers();
        });

        fetchStreamers();
    }, []);

    return (
        <div className="MainPage">
            <SubmitForm socket={socket} />
            <h1>Streamer List</h1>
            <StreamerList streamersData={streamersData} />
        </div>
    );
}

export default MainPage;