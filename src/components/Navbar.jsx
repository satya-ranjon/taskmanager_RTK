import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addSearch } from "../features/tasks/tasksSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const debounce = (fun, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fun(...args);
      }, delay);
    };
  };

  const doSearch = (e) => {
    dispatch(addSearch(e.target.value));
  };

  const handleSearch = debounce(doSearch, 500);

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
            onChange={handleSearch}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
