import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";

const Header = () => {
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
                <button className="Header--ReturnButton" onClick={handleReturn}>❮ RETURN</button> 
            }
        </header>
    );
}

export default Header;