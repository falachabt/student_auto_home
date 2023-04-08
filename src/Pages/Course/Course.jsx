import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import { AuthStateContext } from "../../Contexts/AuthContext";
import { fetchData } from "../../Firebase/functions/firestoreFunc";
import Module from "./Module";

const Course = () => {
  const [modules, setModules] = useState([]);
  const breadcumbs = [
    {
      name: "Your Course",
      link: "/course",
    },
  ];
  const { user } = AuthStateContext();

  useEffect(() => {

    fetchData({
      path: `students/${user.uid}/modules`,
    }).then((data) => {
      setModules(data);
    });
  }, []);

  return (
    <div className="p-5 mb-56">
      <section className="courses px-4">
        <Header items={breadcumbs} />

        <div className="box-container custumScrollBar">
          {modules?.map((module, index) => {
            return <Module module={module} key={index} />;
          })}
        </div>
      </section>
    </div>
  );
};

export default Course;
