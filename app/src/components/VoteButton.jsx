import axios from "axios";
import UpvoteIcon from "../assets/upvote.svg";
import DownvoteIcon from "../assets/downvote.svg";

export const VoteButton = ({ type, number, id }) => {
    let icon;
    switch(type) {
        case "upvote":
            icon = UpvoteIcon;
            break;
        case "downvote":
            icon = DownvoteIcon;
            break;
        default:
            icon = null;
            break;
    }

    const vote = async (event, type) => {
        event.stopPropagation();
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/streamers/${id}/vote`, { type: type });
    }

    return (
        <div className="VoteButton" onClick={(event) => vote(event, type)}>
            <img src={icon} alt="vote button" />
            <p>{number | "N/A"}</p>
        </div>
    )
}

export default VoteButton;