import { useNavigate } from "react-router-dom";
import VoteButton from "../VoteButton.jsx";
import StreamerImage from "../../assets/streamer1.jpg";
import TwitchLogo from "../../assets/platformIcons/twitch.svg";
import YoutubeLogo from "../../assets/platformIcons/youtube.svg";
import FacebookLogo from "../../assets/platformIcons/facebook.svg";

const StreamerTile = ({ id, name, platform, description, upvotes, downvotes }) => {
    const navigate = useNavigate();

    const navigateToStreamerPage = () => {
        navigate(`/streamer/${id}`);
    };

    const platformLogos = {
        twitch: TwitchLogo,
        youtube: YoutubeLogo,
        facebook: FacebookLogo
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
                    <img className="StreamerTile--Platform" src={platformLogos[platform] || null} alt={`${platform} logo`} />
                </section>
            </section>
            <img src={StreamerImage} alt={`${name} image`} className="StreamerTile--Image" />
            <p className="StreamerTile--Description">{description}</p>
        </div>
    );
}

export default StreamerTile;