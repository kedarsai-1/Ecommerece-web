import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const NavBar = ({ setSearchTerm, count }) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  const photoUrl = user?.photoUrl;
  const FirstName = user?.FirstName;
  const isShopOwner = user?.isShopOwner;

  const handlelogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm min-h-12 py-0 px-4">
      
      {/* LEFT LOGO */}
      <div className="flex-1">
        <Link
          to={isShopOwner ? "/sellershopview" : "/"}
          className="btn btn-ghost text-xl"
        >
          🛍️Bamazon
        </Link>
      </div>

      {/* RIGHT SIDE */}
      {user && (
        <div className="flex items-center gap-3">
          
          {/* CART */}
          {!isShopOwner && (
            <Link to="/bag" className="cursor-pointer">
              🛒 {count}
            </Link>
          )}

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered input-sm w-24 md:w-auto"
          />

          {/* USER NAME */}
          <p className="font-bold">welcome {FirstName}</p>

          {/* AVATAR DROPDOWN */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle btn-sm avatar"
            >
              <div className="w-8 rounded-full">
                <img src={photoUrl} alt="user avatar" />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-2 w-48 p-2 shadow z-[1]"
            >
              {isShopOwner && (
                <li>
                  <Link to="/sellershop">Add Shops</Link>
                </li>
              )}

              <li>
                <Link to="/profile">Profile</Link>
              </li>

              {isShopOwner && (
                <li>
                  <Link to="/items">Add Items</Link>
                </li>
              )}

              <li onClick={handlelogout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>

        </div>
      )}
    </div>
  );
};

export default NavBar;
