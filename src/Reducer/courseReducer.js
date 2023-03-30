import { async } from "@firebase/util";
import { where } from "firebase/firestore";
import { AuthStateContext } from "../Contexts/AuthContext";
import { course_action } from "../Data/Action/action";
import { fetchData } from "../Firebase/functions/firestoreFunc";

export const InitialState = {
  module_id: "",
  lesson_id: "",
  status: {
    fetch_data: false,
    error_fetch: false,
  },
  modules: [],
};

export const course_reducer = async (state, action) => {
  const { user } = AuthStateContext();

  switch (action.type) {
    case course_action.START_FETCH_COURSE: {
      const dispatch = action.payload;
      dispatch({ type: course_action.FETCH_COURSE });

      return {
        ...state,
        status: {
          ...state.statuts,
          fetch_data: true,
        },
      };
    }

    case course_action.FETCH_COURSE: {
      const course_data = await fetchData({ path: `students/${user.uid}/learn` });
      const modules = course_data.find((item) => {return  item.id == 'course'});

      return {
        ...state,
        modules: modules
      };
    }

    case course_action.SET_LESSON_ID: {


      return {
        ...state,
        lesson_id: action.paylaod || "",
      };
    }

    case course_action.SET_MODUE_ID: {
    

      return {
        ...state,
        module_id: action.paylaod || '',
      };
    }
  }
};
