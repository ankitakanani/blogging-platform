//components
import { useContext } from "react";
import { Link } from "react-router-dom";
import Identicon from "react-identicons";
import { useNavigate } from 'react-router-dom';

//context
import { Context } from "../context/Context";
import SectionContainer from "./SectionContainer.jsx";
import MobileNav from "./MobileNav.jsx";
import headerNavLinks from "../config/headerNavLinks";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
  const { user, dispatch } = useContext(Context);
  const Navigate = useNavigate();

  var headerNavLink = headerNavLinks(user)
  const handleLogout = () => {
    toast.success("Successfully logged out")
    dispatch({ type: "LOGOUT" });
    Navigate('/login');

  };
  return (

    <SectionContainer>
      <div className="flex flex-col justify-between">
        <header className="flex items-center justify-between py-10">
          <div>
            <div className="flex items-center justify-between">
              <div className="hidden h-6 text-2xl font-semibold sm:block">
                Brivity Blog Post
              </div>

            </div>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">

              {headerNavLink.map((link) => (
                link.title == "LOGOUT" ?
                  <a onClick={handleLogout}
                    key={link.title}
                    className="p-1 font-medium text-gray-900 sm:p-4 dark:text-gray-100 cursor-pointer"
                  >
                    {link.title}
                  </a>
                  :
                  <Link to={link.navLink}
                    key={link.title}
                    className="p-1 font-medium text-gray-900 sm:p-4 dark:text-gray-100"
                  >
                    {link.title}
                  </Link>
              ))}
            </div>

            <MobileNav headerNavLinks={headerNavLink} />
          </div>
        </header>
      </div>
    </SectionContainer>


  );
};

export default Navbar;

