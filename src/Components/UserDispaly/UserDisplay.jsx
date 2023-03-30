import { Avatar, LinearProgress } from "@mui/material";
import { where } from "firebase/firestore";
import React, { Component } from "react";
import { insertLoadingSkeleton } from "../../Data/utils";
import { fetchData } from "../../Firebase/functions/firestoreFunc";
import { User } from "../../Object/User";
import { AuthContext } from "../../Contexts/AuthContext";

export class UserDetails extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loaded: false,
      error: false,
    };
  }

  componentDidMount() {
    this.getUserDetails();
    
  }

  async getUserDetails() {
    const { user } = this.context;
    let currentUser = user 
    
    if(typeof currentUser != 'object'){
      currentUser = JSON.parse(user)
    }

    try {
      if (this.state.loaded) {
        return;
      }

      const userCredential = await fetchData({
        path: "students",
        custumQueryProps: [where("id", "==", currentUser.uid)],
      });

      const fetched = userCredential[0];

      this.setState({
        user: fetched ? new User({ ...fetched }) : { name: "----" },
        loaded: true,
      });
    } catch (err) {
      console.error(err);
      this.setState({
        error: true,
        loaded: true,
        err_message: err.message,
      });
    }
  }

  render() {
    const { user, loaded } = this.state;

    return (
      <div className="rounded-md box-shadow dark:bg-main-dark-bg p-4 flex w-full  m-2  ">
        <div className="">
          {!loaded ? (
            <div className="animate-pulse w-[45px] h-[45px] rounded-full inset-0 bg-gray-300"></div>
          ) : (
            <Avatar src={user.profil_img || ""} />
          )}
        </div>
        <div className=" px-4 flex flex-col gap-2 w-[90%]">
          <div className="w-full flex justify-start">
            <span>
              <h1 className="dark:text-gray-300 text-xl font-bold">
                {user.nom} {user.prenom}
              </h1>
              {!loaded &&
                insertLoadingSkeleton({ number: 1, width: 200, height: 25 })}
            </span>
          </div>

          <div className="flex gap-2 items-center text-gray-400">
            <span className="w-[55px]">
              <img
                className=""
                src="https://firebasestorage.googleapis.com/v0/b/autohome-2.appspot.com/o/students%2Fdesign%2F%F0%9F%A6%86%20icon%20_guarantee%20badge_badge_icon.svg?alt=media&token=652aca24-90ac-4926-8474-46925060b2c8"
                alt=""
              />
            </span>
            <span className="text-[19px] pb-3 font-semibold flex w-full pl-2">
              {!loaded &&
                insertLoadingSkeleton({ number: 1, width: 150, height: 20 })}
              {loaded === true && (user.badge || 0) + "  Badges"}
            </span>
          </div>

          <div className="flex gap-2 items-center">
            <span className="w-[55px] ">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/autohome-2.appspot.com/o/students%2Fdesign%2F%F0%9F%A6%86%20icon%20_calendar%20deadline_calendar_icon.svg?alt=media&token=f7259cbc-399e-4ca4-95b7-bebdef45eab5"
                alt=""
              />
            </span>
            <div className="w-full pb-1 pl-2">
              <div className="flex text-white font-bold">23 days</div>
              <LinearProgress
                sx={{ height: 8, borderRadius: 3 }}
                variant={loaded ? "determinate" : "indeterminate"}
                value={32}
              />
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <div className="w-[55px] ">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/autohome-2.appspot.com/o/students%2Fdesign%2FGroup%2055exp_icon.svg?alt=media&token=d875ea08-f103-4f1d-a27c-a6a9367da260"
                alt=""
              />
            </div>
            <div className="w-full pb-1 pl-2">
              <div>
                <span className=" w-full flex justify-end text-gray-300 text-base ">
                  {user.xp || 0} xp / {user.maxXp || 8000} xp
                </span>
              </div>
              <LinearProgress
                sx={{ height: 8, borderRadius: 3 }}
                variant={loaded ? "determinate" : "indeterminate"}
                value={Math.round((user.xp / user.maxXp) * 100)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
