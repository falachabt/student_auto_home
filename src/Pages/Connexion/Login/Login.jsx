import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import logo from "../../../Data/Image/logo192.png";
import { signInFunciton } from "./login ";
import { useNavigate } from "react-router-dom";
import { AuthStateContext } from "../../../Contexts/AuthContext";

const Login = () => {
  const { user, dispatch } = AuthStateContext();
  const navigate = useNavigate();

  if (user !== null) {
    navigate("/");
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-main-bg">
      <div className="flex h-full  items-center justify-center">
        <form
          id="sign_in_form"
          className=" box-shadow-1 rounded-lg border bordr-solid border-main-blue p-4 flex flex-col justify-center gap-4 sm:w-[400px] min-w-[320px] "
        >
          <div className="flex flex-col justify-center items-center">
            <img
              src={logo}
              alt="auto Home logo"
              className="w-[90px] h-[90px] "
            />
            <p className="text-center text-main-blue font-bold text-2xl">
              Admin Auto Home
            </p>
            <p className="text-14 text-gray-700">
              Please login to use the platform
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <TextField
              required
              id="email"
              label="Email"
              placeholder="admin@adminah.com"
              autoComplete="none"
            />

            <TextField
              id="password"
              label="Password"
              type="password"
              //   autoComplete="current-password"
            />
          </div>
          <div className=" text-center gap-2 flex justify-center flex-col">
            <Button
              onClick={() => {
                signInFunciton("sign_in_form", dispatch, navigate);
              }}
              variant="contained"
              disableElevation
            >
              Login
            </Button>
            <p>Or</p>
            <Button variant="contained" disableElevation>
              Continue with google
            </Button>
          </div>
        </form>
      </div>

      
    </div>
  );
};

export default Login;
