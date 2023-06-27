import { useNavigate } from "react-router-dom";

const SearchResult = ({ id, name, image }) => {
    const navigate = useNavigate();

    const handleClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        navigate(`/streamer/${id}`);
    }

    return (
        <div className="SearchResult" onClick={handleClick}>
            <img src={image} alt={`${name} image`} />
            <p>{name}</p>
        </div>
    );
}

export default SearchResult;