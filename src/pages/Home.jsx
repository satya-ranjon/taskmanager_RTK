import React from "react";
import ProjectsList from "../components/ProjectsList";
import TaskList from "../components/TaskList";
import TeamMembers from "../components/TeamMembers";
import AddButton from "../components/ui/AddButton";

const Home = () => {
  return (
    <div className="container relative">
      <div className="sidebar">
        <ProjectsList />
        <TeamMembers />
      </div>

      <div className="lg:pl-[16rem] 2xl:pl-[23rem]">
        <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
          <AddButton />
          <TaskList />
        </main>
      </div>
    </div>
  );
};

export default Home;
