import StreamerTile from "./StreamerTile";

const StreamerList = ({ streamersData, searchString }) => {
    const streamerTileElements = [...streamersData]
        .filter(streamer => `${streamer.name.toLowerCase()}`.includes(searchString.toLowerCase() || ""))
        .map(streamer => <StreamerTile
            key={streamer.id}
            id={streamer.id}
            name={streamer.name}
            platform={streamer.platform}
            description={streamer.description}
            upvotes={streamer.upvotes}
            downvotes={streamer.downvotes}
            voteStatus={streamer.voteStatus}
        />);

    if (streamerTileElements.length <= 0) {
        return (<h3>NO RESULTS</h3>)
    }

    return (
        <div className="StreamerList">
            { streamerTileElements }
        </div>
    );
}

export default StreamerList;