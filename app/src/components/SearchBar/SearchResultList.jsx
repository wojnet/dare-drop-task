import SearchResult from "./SearchResult";
import StreamerImage from "../../assets/streamer1.jpg";

const SearchResultList = ({ searchText, isFocused, searchResultsData }) => {
    if (!searchText || !isFocused) return;

    const searchResultElements = searchResultsData.map(result => <SearchResult key={result.id} id={result.id} name={result.name} image={StreamerImage} />);

    return (
        <div className="SearchResultList">
            {searchResultElements}
        </div>
    )
}

export default SearchResultList;