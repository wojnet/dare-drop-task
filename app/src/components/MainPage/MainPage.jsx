import React, { useState } from "react";
import SubmitForm from "./SubmitForm";
import StreamerList from "./StreamerList";
import SearchBar from "../SearchBar";

const MainPage = ({ socket, streamersData }) => {
    const [searchString, setSearchString] = useState("");

    return (
        <div className="MainPage">
            <SubmitForm socket={socket} />
            <section className="StreamerList--Title">
                <h3>STREAMER LIST</h3>
                <p>A list of submitted streamers that you can upvote or downvote</p>
            </section>
            <SearchBar searchString={searchString} setSearchString={setSearchString} />
            <StreamerList streamersData={streamersData} searchString={searchString} />
        </div>
    );
}

export default MainPage;