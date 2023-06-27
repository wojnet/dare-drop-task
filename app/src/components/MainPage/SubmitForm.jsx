import React, { useState, useEffect } from "react";
import axios from "axios";

const SubmitForm = ({ socket }) => {
    const [streamerInfo, setStreamerInfo] = useState({
        name: "",
        platform: "twitch",
        description: "",
    });

    const updateStreamerInfo = (event, property) => {
        setStreamerInfo(prev => {
            let newObject = {...prev};
            newObject[property] = event.target.value;
            return newObject;
        })
    }

    const submitStreamer = async (event) => {
        event.preventDefault();
        if (streamerInfo.description.length > 1000) {
           alert("Too much characters in description field!")

        } else {
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/streamers`, {
                name: streamerInfo.name,
                platform: streamerInfo.platform,
                description: streamerInfo.description
            })
            .then((res) => console.log(res))
            .then(() => {
                setStreamerInfo(prev => {
                    let newObject = {...prev, name: "", description: ""};
                    return newObject;
                });
            })
            .catch((err) => console.error(err));
        }
    }

    return (
        <form className="SubmitForm" onSubmit={submitStreamer}>
            <label htmlFor="streamerName">Name</label>
            <input
                type="text"
                id="streamerName"
                value={streamerInfo?.name}
                onChange={ (event) => updateStreamerInfo(event, "name") }
                required
            />

            <label htmlFor="streamerPlatform">Platform</label>
            <select
                id="streamerPlatform" 
                value={streamerInfo?.platform}
                onChange={ (event) => updateStreamerInfo(event, "platform") }
            >
                <option value="twitch">Twitch</option>
                <option value="youtube">YouTube</option>
                <option value="facebook">Facebook</option>
            </select>

            <label htmlFor="streamerDescription">Description
                <span 
                    style={{ fontSize: 14, color: streamerInfo.description.length > 1000 ? "#D66" : "#777" }}
                >
                    {` (${streamerInfo.description.length}/1000)`}
                </span>
            </label>
            <textarea
                type="text"
                id="streamerDescription"
                value={streamerInfo?.description}
                onChange={ (event) => updateStreamerInfo(event, "description") }
            />

            <input type="submit" value="Submit Streamer" className="Button" />
        </form>
    );
}

export default SubmitForm;