import React from "react";
import { Button, Dialog } from "@mui/material";
import { UseStateContext } from "../../../Contexts/ContextProvider";
import { useEffect } from "react";
import { logout_func } from "./logout_f";
import { AuthStateContext } from "../../../Contexts/AuthContext";

const Logout = ({ open = false }) => {
  const { layout, changeLayout } = UseStateContext();
  const { dispatch } = AuthStateContext(); 
  useEffect(() => {
    changeLayout("logout", open);
  }, []);

  

  return (
    <div>
      <Dialog open={layout.logout}>
        <div className="p-6 flex flex-col gap-4">
          <div>
            <p className="text-xl font-bold mb-3">Logout</p>
            <p>You will be logged out , do you confirm ?</p>
          </div>
          <div className="flex justify-center gap-2">
            <Button variant="contained" color="info" onClick={() => {logout_func(dispatch, changeLayout)}}>
              Logout
            </Button>
            <Button
              onClick={() => {
                changeLayout("logout", false);
              }}
              color="error"
              variant='contained'
            >
              Cancel
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Logout;
