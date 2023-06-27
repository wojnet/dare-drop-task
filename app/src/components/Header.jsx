import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";
import Logo from "../assets/logo.svg";

const Header = ({ streamersData }) => {
    const [isReturnArrowVisible, setIsReturnArrowVisible] = useState(false);
    const navigate = useNavigate();

    const handleReturn = () => {
        navigate("/");
    }

    useEffect(() => {
        setIsReturnArrowVisible(
            window.location.pathname.split("/")[1] === "streamer" ? true : false
        );
    }, [window.location.pathname]);

    return (
        <header className="Header">
            <Link to="/">
                <img src={Logo} alt="Stream Spotlight Logo" className="Header--Logo" />
            </Link>
            { isReturnArrowVisible && 
                <button className="Button--2" style={{ marginInline: "20px auto" }} onClick={handleReturn}>❮ RETURN</button> 
            }
            <SearchBar streamersData={streamersData} />
        </header>
    );
}

export default Header;