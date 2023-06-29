import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { socket } from "./service/socket";
import Header from "./components/Header";
import MainPage from "./components/MainPage/MainPage";
import StreamerPage from "./components/StreamerPage/StreamerPage";

const App = () => {
    const [streamersData, setStreamersData] = useState([]);

    const updateStreamerData = async (streamerId, returnedVoteStatus) => {
        const streamerResult = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/streamers/${streamerId}`);
        setStreamersData(prev => {
            let data = [...prev];
            return data.map(streamer => streamer.id == streamerId ? {...streamerResult.data, voteStatus: returnedVoteStatus } : streamer);
        });
    }

    const fetchAllStreamers = async () => {
        const streamersResult = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/streamers`);
        let data = [...streamersResult.data];
        data.forEach(streamer => {
            streamer["voteStatus"] = "unvoted";
        });
        setStreamersData(data);
    }

    useEffect(() => {
        const onFetchAllStreamers = async () => {
            console.log("ON FETCH ALL STREAMERS");
            await fetchAllStreamers();
        };

        const onUpdateStreamerData = async (data) => {
            console.log("ON UPDATE STREAMER DATA");
            await updateStreamerData(data.id, data.returnedVoteStatus);
        };

        const onConnect = () => {
            sessionStorage.setItem("socketId", socket.id);
        }

        const onDisconnect = () => {
            sessionStorage.removeItem("socketId");
        }

        fetchAllStreamers();

        socket.connect();
        sessionStorage.setItem("socketId", socket.id);

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("fetch-all-streamers", onFetchAllStreamers);
        socket.on("update-streamer-data", onUpdateStreamerData);

        return () => {
            socket.off("fetch-all-streamers", onFetchAllStreamers);
            socket.off("update-streamer-data", onUpdateStreamerData);
            socket.disconnect();
        };
    }, []);

    // useEffect(() => {
    //     console.log(streamersData);
    // }, [streamersData]);

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