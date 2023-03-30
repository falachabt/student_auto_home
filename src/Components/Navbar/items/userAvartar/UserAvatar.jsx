import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar, Zoom } from "@mui/material";
import {
  LogoutOutlined,
  Person,
  PersonPinCircleOutlined,
} from "@mui/icons-material";

import { UseStateContext } from "../../../../Contexts/ContextProvider";
import { AuthStateContext } from "../../../../Contexts/AuthContext";

const UserAvatar = ({ type = "main" }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { screenSize, changeLayout } = UseStateContext();
  const { user } = AuthStateContext();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <button
        id="basic-demo-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        className={` ${type === "main" && " flex gap-3"}`}
        variant="soft"
        color="info"
        onClick={handleClick}
      >
        {type === "main" ? (
          <>
            <Avatar variant="soft" />
            {screenSize > 750 && (
              <p className=" hover:underline underline-offset-2 ">
                {user.email}
              </p>
            )}
          </>
        ) : (
          <Person />
        )}
      </button>
      <Menu
        // id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        TransitionComponent={Zoom}
      >
        <MenuItem
          sx={{ width: type !== 'main'?  '150px' : anchorEl ? anchorEl.clientWidth : "auto" }}
          onClick={handleClose}
          color="info"
        >
          <PersonPinCircleOutlined />
          Profile
        </MenuItem>
        <MenuItem
          sx={{
            width: anchorEl && screenSize > 800 ? anchorEl.clientWidth : "auto",
          }}
          onClick={() => {
            setAnchorEl(null);
            changeLayout("logout", true);
          }}
          variant="info"
          className="dark:bg-main-dark-bg bg-main-bg mt-2"
        >
          <LogoutOutlined />
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserAvatar;
