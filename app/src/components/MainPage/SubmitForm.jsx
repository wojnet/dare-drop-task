import { useState } from "react";
import axios from "axios";
import { platformNames } from "../../helpers/platforms";

const SubmitForm = () => {
    const [isNameHighlighted, setIsNameHighlighted] = useState(false);
    const [isDescriptionHighlighted, setIsDescriptionHighlighted] = useState(false);
    const [streamerInfo, setStreamerInfo] = useState({
        name: "",
        platform: "twitch",
        description: ""
    });

    const HighlightedStyles = {
        border: "1px solid var(--errorRed)",
        animation: "shake 1s ease-in-out"
    }

    const highlightName = () => {
        if (!isNameHighlighted) {
            setIsNameHighlighted(true);
            setTimeout(() => setIsNameHighlighted(false), 1000);
        }
    }

    const highlightDescription = () => {
        if (!isDescriptionHighlighted) {
            setIsDescriptionHighlighted(true);
            setTimeout(() => setIsDescriptionHighlighted(false), 1000);
        }
    }

    const updateStreamerInfo = (event, property) => {
        setStreamerInfo(prev => {
            let newObject = {...prev};
            newObject[property] = event.target.value;
            return newObject;
        })
    }

    const submitStreamer = async (event) => {
        event.preventDefault();
        let isDataValid = true;

        if (streamerInfo.name.length <= 0) {
            highlightName();
        }

        if (streamerInfo.description.length > 1000) {
            highlightDescription();
        }

        if (isDataValid) {
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/streamers`, {
                name: streamerInfo.name,
                platform: streamerInfo.platform,
                description: streamerInfo.description
            })
            .then(() => {
                setStreamerInfo(prev => {
                    let newObject = {...prev, name: "", description: ""};
                    return newObject;
                });
            })
            .catch((err) => console.error(err));
        }
    }

    const dropdownOptionElements = Object.keys(platformNames)
        .map(platform => <option key={platform} value={platform}>{platformNames[platform]}</option>);

    return (
        <form className="SubmitForm" onSubmit={submitStreamer}>
            <h2 className="SubmitForm--Title">SUBMIT STREAMER</h2>
            <label htmlFor="streamerName">Name</label>
            <input
                type="text"
                id="streamerName"
                style={isNameHighlighted ? HighlightedStyles : {}}
                value={streamerInfo?.name}
                onChange={ (event) => updateStreamerInfo(event, "name") }
            />

            <label htmlFor="streamerPlatform">Platform</label>
            <select
                id="streamerPlatform" 
                value={streamerInfo?.platform}
                onChange={ (event) => updateStreamerInfo(event, "platform") }
            >
                {dropdownOptionElements}
            </select>

            <label htmlFor="streamerDescription">
                Description
                <span style={{ fontSize: 14, color: streamerInfo.description.length > 1000 ? "#D66" : "#777" }}>
                    {` (${streamerInfo.description.length}/1000)`}
                </span>
            </label>
            <textarea
                type="text"
                id="streamerDescription"
                style={isDescriptionHighlighted ? HighlightedStyles : {}}
                value={streamerInfo?.description}
                onChange={ (event) => updateStreamerInfo(event, "description") }
            />

            <input type="submit" value="Submit Streamer" className="Button" />
        </form>
    );
}

export default SubmitForm;