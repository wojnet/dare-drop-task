import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { socket } from "./service/socket";
import Header from "./components/Header";
import MainPage from "./components/MainPage/MainPage";
import StreamerPage from "./components/StreamerPage/StreamerPage";

const App = () => {
    const [streamersData, setStreamersData] = useState([]);

    const fetchStreamerById = async (streamerId) => {
        const streamerResult = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/streamers/${streamerId}`);
        setStreamersData(prev => {
            let newArray = [...prev];
            return newArray.map(streamer => streamer.id === streamerId ? {...streamerResult} : streamer);
        });
    }

    const fetchAllStreamers = async () => {
        const streamersResult = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/streamers`);
        setStreamersData([...streamersResult.data]);
    }

    useEffect(() => {
        const onConnect = async (data) => {
            if (data) {
                await fetchStreamerById(data.id);
            } else {
                await fetchAllStreamers();
            }
        }

        fetchAllStreamers();

        socket.connect();
        socket.on("refetch-streamers", onConnect);

        return () => {
            socket.off("refetch-streamers", onConnect);
            socket.disconnect();
        };
    }, []);

    return (
        <div className="App">
            <Header streamersData={streamersData} />
            <Routes>
                <Route path="/" element={<MainPage socket={socket} streamersData={streamersData} setStreamersData={setStreamersData} />} />
                <Route path="/streamer/:id" element={<StreamerPage socket={socket} streamersData={streamersData} />} />
            </Routes>
        </div>
    );
}

export default App;