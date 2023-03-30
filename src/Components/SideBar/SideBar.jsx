import React, { useEffect, useState } from "react";
import {
  Book,
  Close,
  Home,
  Logout,
  Person,
  Settings,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { UseStateContext } from "../../Contexts/ContextProvider";
import { AuthStateContext } from "../../Contexts/AuthContext";
import { fetchData } from "../../Firebase/functions/firestoreFunc";
import { where } from "firebase/firestore";

function Sidebar() {
  const { activeSidebar, setActiveSidebar, screenSize } = UseStateContext();
  const { user } = AuthStateContext();
  const [userDetails, setUserDetails] = useState({
    main: user,
  });
  const [state, setState] = useState({
    fetch_user: false,
  });

  useEffect(() => {
    setState({ ...state, fetch_user: true });
    fetchData({
      path: "students",
      custumQueryProps: [where("id", "==", user.uid)],
    }).then((data) => {
      if (data[0]) {
        setUserDetails({
          ...userDetails,
          ...data[0],
          photo_URL:
            "https://firebasestorage.googleapis.com/v0/b/autohome-2.appspot.com/o/students%2Fdesign%2FdefaultProfil.svg?alt=media&token=66b901d1-c671-4486-951c-cff2d00722ce",
        });
      }
      setState({ ...state, fetch_user: false });
    });
  }, []);

  const menus = [
    {
      icon: <Home />,
      name: "Home",
      link: "/",
    },
    {
      icon: <Person />,
      name: "Profil",
      link: "/profil",
    },
    {
      icon: <Book />,
      name: "Course",
      link: "/course",
    },
    {
      icon: <Settings />,
      name: "Settings",
      link: "/settings",
    },
  ];

  return (
    <div
      className={` max-[500px]:fixed   relative top-0 left-[-256px] w-64 bg-main-bg dark:bg-main-dark-bg h-screen   border-r border-gray-300 z-50  duration-300 ${
        activeSidebar === true ? " translate-x-[256px] " : "w-0"
      } `}
    >
      <div  className="text-right relative bottom-[-30px] py-2 px-2 min-[900px]:hidden ">
        <button
          onClick={(e) => {
            setActiveSidebar(false);
          }}
        >
          <i className=" bg-red-500 rounded-md cursor-pointer p-1   text-white text-center leading-18 text-2xl">
            <Close />
          </i>
        </button>
      </div>

      <div className=" flex justify-center items-center flex-col w-full  p-6 max-[500px]:pt-0 text-center">
        <img
          src={userDetails.photo_URL}
          className=" h-20 w-20 rounded-full object-contain mb-4"
          alt="photo_url_of_user"
        />
        <h3 className="name text-2xl text-black overflow-hidden overflow-ellipsis whitespace-nowrap">
          {userDetails.nom} {userDetails.prenom}
        </h3>
        <p className="role text-lg text-gray-400">student</p>
      </div>

      {/* link to navigate cross the application  */}
      <nav className="  flex flex-col flex-start justify-start ">
        {menus.map((menu, index) => {
          return (
            <NavLink
              to={menu.link}
              className={({ isActive }) =>
                isActive
                  ? "bg-main-blue text-gray-100 rounded-md mx-4  "
                  : " hover:bg-gray-500 hover:px-4 transition-all duration-300 dark:text-gray-200  "
              }
            >
              <p className="flex px-4 py-2 text-xl  font-semibold justify-start items-start hover:py-4 ">
                <i className=" mr-6 text-main-color ">{menu.icon}</i>
                <span>{menu.name}</span>
              </p>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}

export default Sidebar;
