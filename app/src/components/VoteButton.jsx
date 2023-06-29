import axios from "axios";
import UpvoteIcon from "../assets/voteIcons/upvote.svg";
import PressedUpvoteIcon from "../assets/voteIcons/pressedUpvote.svg";
import DownvoteIcon from "../assets/voteIcons/downvote.svg";
import PressedDownvoteIcon from "../assets/voteIcons/pressedDownvote.svg";

export const VoteButton = ({ type, number, id, isPressed }) => {
    let icon;
    switch(type) {
        case "upvote":
            icon = isPressed ? PressedUpvoteIcon : UpvoteIcon;
            break;
        case "downvote":
            icon = isPressed ? PressedDownvoteIcon : DownvoteIcon;
            break;
        default:
            icon = null;
            break;
    }

    const vote = async (event, type) => {
        event.stopPropagation();
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/streamers/${id}/vote`, { 
            type: type,
            socketId: sessionStorage.getItem("socketId")
        });
    }

    return (
        <div className="VoteButton" onClick={(event) => vote(event, type)}>
            <img src={icon} alt={`${type} icon`} />
            <p>{number | "N/A"}</p>
        </div>
    )
}

export default VoteButton;