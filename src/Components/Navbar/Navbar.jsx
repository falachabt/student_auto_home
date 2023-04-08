import { Menu } from "@material-ui/core";
import {
  Book,
  DarkMode,
  Dehaze,
  Home,
  Light,
  LightMode,
  Logout,
  Person,
  Settings,
} from "@mui/icons-material";
import React from "react";
import { NavLink } from "react-router-dom";
import { UseStateContext } from "../../Contexts/ContextProvider";
import UserAvatar from "./items/userAvartar/UserAvatar";

const Navbar = () => {
  const { setActiveSidebar, themeMode, setThemeMode } = UseStateContext();

 
  return (
    <div className=" sticky top-0 left-0 right-0 z-40 w-full flex dark:bg-main-dark-bg py-2 px-6  text-gray-700 dark:text-gray-100 border-b  ">
      <div className=" h-full w-full flex justify-center gap-4 p-1">
        <header className="header w-full">
          <section className=" flex items-center justify-between w-full ">
            {/* nom du centre l'apprenant en cas de nom centre auto home sera afficher  */}
            <p className=" text-[1.5rem] ">Auto Home</p>

            <form action="search.html" method="post">
              <input
                type="text"
                name="search_box"
                required
                placeholder="search courses..."
                maxLength="100"
              />
              <button type="submit" className="fas fa-search"></button>
            </form>

            <div className=" flex items-center gap-2  ">
              <div
                className=" rounded-md border p-2  cursor-pointer  "
                onClick={(e) => {
                  setActiveSidebar((prev) => {
                    return !prev;
                  });
                }}
              >
                <Dehaze />
              </div>
              <div  className="fas fa-user">
              </div>

              {/* button for the use details */}
              <div className="rounded-md p-2 cursor-pointer border">
                <UserAvatar type = 'second' />
              </div>

              {/* Change theme button */}
              <div
                className="rounded-md p-2 cursor-pointer border"
                onClick={(e) => {
                  setThemeMode(themeMode === "Dark" ? "Light" : "Dark");
                }}
              >
                {themeMode === "Dark" ? <LightMode /> : <DarkMode />}
              </div>
            </div>
          </section>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
