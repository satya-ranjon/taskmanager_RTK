import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="container relative py-3">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img src="./images/logo.svg" />
        </Link>
        <div className="flex-1 max-w-xs search-field group">
          <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
          <input
            type="text"
            placeholder="Search Task"
            className="search-input addStyleText "
            id="lws-searchTask"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
