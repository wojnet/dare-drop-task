import { useNavigate } from "react-router-dom";
import VoteButton from "../VoteButton.jsx";
import StreamerImage from "../../assets/streamer1.jpg";

const StreamerTile = ({ id, name, platform, description, upvotes, downvotes }) => {
    const navigate = useNavigate();

    const navigateToStreamerPage = () => {
        navigate(`/streamer/${id}`);
    };

    const platformDisplayNames = {
        twitch: "Twitch",
        youtube: "YouTube",
        restream: "Restream",
        facebook: "Facebook"
    }

    return (
        <div className="StreamerTile" onClick={navigateToStreamerPage}>
            <section className="StreamerTile--Top">
            <section>
                    <VoteButton type={"upvote"} number={upvotes} id={id} /> 
                    <VoteButton type={"downvote"} number={downvotes} id={id} /> 
                </section>
                <section>
                    <h3 className="StreamerTile--Name">{name.toUpperCase()}</h3>
                    <p className="StreamerTile--Platform">{platformDisplayNames[platform] || "Undefined"}</p>
                </section>
            </section>
            <img src={StreamerImage} alt={`${name} image`} className="StreamerTile--Image" />
            <p className="StreamerTile--Description">{description}</p>
        </div>
    );
}

export default StreamerTile;