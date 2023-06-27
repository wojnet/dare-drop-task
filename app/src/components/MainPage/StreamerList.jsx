import { useEffect } from "react";
import StreamerTile from "./StreamerTile";

const StreamerList = ({ streamersData }) => {
    const streamerTileElements = [...streamersData].map(streamer => <StreamerTile key={streamer.id} id={streamer.id} name={streamer.name} platform={streamer.platform} description={streamer.description} upvotes={streamer.upvotes} downvotes={streamer.downvotes} />);

    return (
        <div className="StreamerList">
            {streamerTileElements}
        </div>
    );
}

export default StreamerList;