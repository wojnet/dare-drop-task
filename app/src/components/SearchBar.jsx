import { useState, useRef } from "react";
import SearchIcon from "../assets/search-icon.svg";

const SearchBar = () => {
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef(null);

    const inputFocus = () => {
        inputRef.current.focus();
    }

    const updateValueState = (event) => {
        
    }

    return (
        <div className="SearchBar" onClick={inputFocus}>
            <img src={SearchIcon} alt="Search Icon" />
            <input type="text"
                value={inputValue}
                onChange={ (event) => setInputValue(event.target.value || "") }
                ref={inputRef}
                placeholder="Find streamer"
            />
        </div>
    );
}

export default SearchBar;