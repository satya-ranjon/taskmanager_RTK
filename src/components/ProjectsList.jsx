import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProjectsQuery } from "../features/projects/projectsApi";
import {
  filterAddProject,
  filterRemoveProject,
} from "../features/projects/projectsSlice";

const ProjectsList = () => {
  const {
    data: projects,
    isError,
    isLoading,
    isSuccess,
  } = useGetProjectsQuery();
  const dispatch = useDispatch();

  const { projectId } = useSelector((state) => state.projectsid);

  // decided what to render
  let content;
  if (isLoading) {
    content = <h4>Loading ......</h4>;
  }
  if (!isLoading && isError) {
    content = <h4>Some error occurred !</h4>;
  }
  if (!isLoading && !isError && isSuccess && projects?.length === 0) {
    content = <h4>Projects Not Found .!</h4>;
  }
  if (
    !isLoading &&
    !isError &&
    isSuccess &&
    projects?.length > 0 &&
    projectId
  ) {
    content = projects.map((project) => {
      const handleCheck = (e) => {
        if (e.target.checked) {
          dispatch(filterAddProject(project.id));
        }
        if (!e.target.checked) {
          dispatch(filterRemoveProject(project.id));
        }
      };
      return (
        <div className="checkbox-container" key={project.id}>
          <input
            type="checkbox"
            checked={projectId?.indexOf(project.id) !== -1}
            className={project.colorClass}
            onChange={handleCheck}
          />
          <p className="label">{project.projectName}</p>
        </div>
      );
    });
  }

  return (
    <div>
      <h3 className="text-xl font-bold">Projects</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
};

export default ProjectsList;
