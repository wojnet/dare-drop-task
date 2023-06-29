import SearchIcon from "../assets/search-icon.svg";

const SearchBar = ({ searchString, setSearchString }) => {
    const handleChangeValue = (event) => {
        let value = event.target.value;
        setSearchString(value || "");
    }

    return (
        <div className="SearchBar">
            <img src={SearchIcon} alt="Search Icon" />
            <input type="text"
                value={searchString}
                onChange={handleChangeValue}
                placeholder="Find streamers"
            />
        </div>
    );
}

export default SearchBar;