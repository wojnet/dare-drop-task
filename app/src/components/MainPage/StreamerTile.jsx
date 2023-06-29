import { useNavigate } from "react-router-dom";
import VoteButton from "../VoteButton.jsx";
import { platformLogos } from "../../helpers/platforms.js";
import StreamerImage from "../../assets/streamer1.jpg";

const StreamerTile = ({ id, name, platform, description, upvotes, downvotes, voteStatus }) => {
    const navigate = useNavigate();

    const navigateToStreamerPage = () => {
        navigate(`/streamer/${id}`);
    };

    return (
        <div className="StreamerTile" onClick={navigateToStreamerPage}>
            <section className="StreamerTile--Top">
                <section>
                    <VoteButton
                        type={"upvote"}
                        number={upvotes}
                        id={id}
                        isPressed={voteStatus === "upvoted" ? true : false}
                    /> 
                    <VoteButton
                        type={"downvote"}
                        number={downvotes}
                        id={id}
                        isPressed={voteStatus === "downvoted" ? true : false}
                    /> 
                </section>
                <section>
                    <h3 className="StreamerTile--Name">{`${name}`.toUpperCase()}</h3>
                    <img className="StreamerTile--Platform" src={platformLogos[platform] || null} alt={`${platform} logo`} />
                </section>
            </section>
            <img src={StreamerImage} alt="Streamer image" className="StreamerTile--Image" />
            <p className="StreamerTile--Description">{description}</p>
        </div>
    );
}

export default StreamerTile;