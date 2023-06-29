import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VoteButton from "../VoteButton";
import StreamerImage from "../../assets/streamer1.jpg";
import { platformLogos, platformNames } from "../../helpers/platforms";

const StreamerPage = ({ streamersData }) => {
    const { id } = useParams();
    const [failedFetchAttempts, setFailedFetchAttempts] = useState(0);
    const [isDataFetched, setIsDataFetched] = useState(false); 

    const [streamerData, setStreamerData] = useState({
        id: "",
        name: "",
        platform: "",
        description: "",
        upvotes: "",
        downvotes: "",
        voteStatus: "unvoted"
    });

    const getStreamerData = () => {
        let filteredData = streamersData.filter(streamer => streamer.id == id);
        if (filteredData.length > 0) {
            setStreamerData(filteredData[0]);
            setIsDataFetched(true);
        } else {
            setTimeout(() => {
                setFailedFetchAttempts(prev => prev + 1);
                getStreamerData();
            }, 1000);
        }
    }

    useEffect(() => {
        if (streamersData.length > 0) getStreamerData();
    }, [streamersData]);
    
    if (failedFetchAttempts >= 5) return (
        <>
            <h1>FETCH FAILED</h1>
            <p style={{ color: "var(--lightGray)" }}>Information about this streamer could not be obtained</p>
        </>
    );

    if (!isDataFetched) return (
        <h1>FETCHING...</h1>
    );

    return (
        <div className="StreamerPage">
            <img src={StreamerImage} alt="Streamer image" />
            <section className="StreamerPage--Right">
                <h1 className="StreamerPage--Title">{streamerData?.name.toUpperCase()}</h1>

                <section className="StreamerPage--Platform">
                    <img src={platformLogos[streamerData.platform] || null} alt={`${streamerData?.platform} logo`} />
                    <h1>{platformNames[streamerData.platform]}</h1>
                </section>

                <section className="StreamerPage--VoteButtons">
                    <VoteButton 
                        type={"upvote"} 
                        number={streamerData?.upvotes}
                        id={id}
                        isPressed={streamerData.voteStatus === "upvoted" ? true : false} 
                    /> 
                    <VoteButton 
                        type={"downvote"}
                        number={streamerData?.downvotes}
                        id={id}
                        isPressed={streamerData.voteStatus === "downvoted" ? true : false}
                    />
                </section>

                <p className="StreamerPage--Description">{streamerData?.description}</p>
            </section> 
        </div>
    );
}

export default StreamerPage;