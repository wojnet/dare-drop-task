import { useState, useEffect, useRef } from "react";
import SearchResultList from "./SearchResultList";
import SearchIcon from "../../assets/search-icon.svg";

const SearchBar = ({ streamersData }) => {
    const [inputValue, setInputValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [searchResultsData, setSearchResultsData] = useState([]);
    const inputRef = useRef(null);

    const inputFocus = () => {
        inputRef.current.focus();
    }

    const filterStreamers = (data, string) => {
        return [...data].filter(streamer => streamer.name.toLowerCase().includes(string.toLowerCase()));
    }

    const handleChangeValue = (event) => {
        let value = event.target.value;

        setSearchResultsData(filterStreamers(streamersData, value));

        setInputValue(value || "");
    }

    useEffect(() => {
        const onFocusIn = () => {
            setIsFocused(true);
        }

        const onFocusOut = () => {
            setIsFocused(false);
        }

        inputRef.current.addEventListener("focusin", onFocusIn);
        inputRef.current.addEventListener("blur", onFocusOut);


        return () => {
            inputRef.current.removeEventListener("focusin", onFocusIn);
            inputRef.current.removeEventListener("blur", onFocusOut);
        };
    }, []);

    return (
        <div className="SearchBar" onClick={inputFocus}>
            <img src={SearchIcon} alt="Search Icon" />
            <input type="text"
                value={inputValue}
                onChange={handleChangeValue}
                ref={inputRef}
                placeholder="Find streamer"
            />
            <SearchResultList searchText={inputValue} isFocused={isFocused} searchResultsData={searchResultsData} />
        </div>
    );
}

export default SearchBar;