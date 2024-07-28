import { useState } from "react";
import { Link } from "react-router-dom";
import "./index.scss";

const Header = () => {
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (link:string) => {
    setActiveLink(link);
  };

  return (
    <div className="Header">
      <Link to="/">
        <h1>Logo</h1>
      </Link>
      <nav className="HeaderNavLinks">
        <Link
          to="/add-customer"
          className={`HeaderNavBarLink ${
            activeLink === "/add-customer" ? "active" : ""
          }`}
          onClick={() => handleLinkClick("/add-customer")}
        >
          Add Customer
        </Link>
        <Link
          to="/customer-list"
          className={`HeaderNavBarLink ${
            activeLink === "/customer-list" ? "active" : ""
          }`}
          onClick={() => handleLinkClick("/customer-list")}
        >
          Customer List
        </Link>
        <Link
          to="/favorites"
          className={`HeaderNavBarLink ${
            activeLink === "/favorites" ? "active" : ""
          }`}
          onClick={() => handleLinkClick("/favorites")}
        >
          Favorites
        </Link>
      </nav>
    </div>
  );
};

export default Header;
