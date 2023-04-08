import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, Profil, Playlist } from "./Pages";
import { ProtectedRoute, Navbar } from "./Components";
import { AuthStateContext } from "./Contexts/AuthContext";
import { UseStateContext } from "./Contexts/ContextProvider";
import SettingPage from "./Pages/Setting/Setting";
import Course from "./Pages/Course/Course";
import Layout from "./Pages/Layout/Layout";
import Sidebar from "./Components/SideBar/SideBar";

import "./style.css";
import PlayLesson from "./Pages/Course/PlayLesson";
import {  ToastContainer } from "react-toastify/dist/components";

function App() {
  const { user } = AuthStateContext();
  const { themeMode, activeSidebar } = UseStateContext();


  return (
    <div
      className={` ${
        themeMode === "Dark" ? "dark" : ""
      } App h-screen w-full flex  justify-center dark:bg-secondary-dark-bg  text-gray-800 overflow-hidden   `}
    >
      <div className=" h-full w-full flex dark:bg-gray-700 bg-white   ">
        <BrowserRouter>
          <div className="dark:bg-secondary-dark-bg  box-shadow h-full   w-full flex items-start">

            {/* toast container  */}
            <ToastContainer />
            
            {/* side bar contaienr */}
            <>{user && <Sidebar />}</>

            {/* main container   */}
            <div
              className={` relative  duration-300 transition-all  w-full    `}
            >
              <div className=" w-full  ">{user && <Navbar />}</div>

              {user && <Layout />}

              <div className=" h-full max-h-[100vh] overflow-y-scroll custumScrollBar  ">
                <Routes>
                  <Route path="/">
                    <Route path="login" element={<Login />} />
                    <Route
                      index
                      element={
                        <ProtectedRoute>
                          <Profil />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="settings"
                      element={
                        <ProtectedRoute>
                          <SettingPage />
                        </ProtectedRoute>
                      }
                    />
                  </Route>

                  <Route path="/course">
                    <Route
                      index
                      element={
                        <ProtectedRoute>
                          <Course />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path=":moduleid"
                      element={
                        <ProtectedRoute>
                          <Playlist />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path=":moduleid/:lessonid"
                      element={
                        <ProtectedRoute>
                          <PlayLesson />
                        </ProtectedRoute>
                      }
                    />
                  </Route>
                </Routes>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
