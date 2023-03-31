import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetProjectsQuery } from "../features/projects/projectsApi";
import { useAddTaskMutation } from "../features/tasks/tasksApi";
import { useGetTeamsQuery } from "../features/teams/teamsApi";
const initialState = {
  taskName: "",
  teamMember: "",
  project: "",
  deadline: "",
};
const AddTask = () => {
  // GET teamMember
  const [teamMemberIsLoad, setTeamMemberIsLoad] = useState(false);
  const [teamMemberData, setTeamMemberData] = useState();
  const {
    data: getTeamMember,
    isSuccess: getTeamMemberSuccess,
    isLoading: getTeamMemberIsLoading,
  } = useGetTeamsQuery(undefined, { skip: !teamMemberIsLoad });

  useEffect(() => {
    if (getTeamMemberSuccess && getTeamMember?.length > 0) {
      setTeamMemberData(getTeamMember);
    }
  }, [getTeamMemberSuccess]);

  // GET teamMember
  const [projectsIsLoad, setProjectsIsLoad] = useState(false);
  const [projectsData, setProjectsData] = useState();
  const {
    data: getProjects,
    isSuccess: getProjectsSuccess,
    isLoading: getProjectsIsLoading,
  } = useGetProjectsQuery(undefined, { skip: !projectsIsLoad });

  useEffect(() => {
    if (getProjectsSuccess && getProjects?.length > 0) {
      setProjectsData(getProjects);
    }
  }, [getProjectsSuccess]);

  /// Handle Input Data
  const [inputValue, setInputValue] = useState(initialState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleTeamMemberSelected = (e) => {
    const { name, value } = e.target;
    const findTeamMember = teamMemberData?.find((m) => m.id == value);
    setInputValue({
      ...inputValue,
      [name]: findTeamMember,
    });
  };
  const handleProjectsSelected = (e) => {
    const { name, value } = e.target;
    const findProject = projectsData?.find((p) => p.id == value);
    setInputValue({
      ...inputValue,
      [name]: findProject,
    });
  };

  // Send to data server
  const [addTask, { isLoading, isError, isSuccess }] = useAddTaskMutation();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!inputValue.taskName) {
      setError(" Add Task Name ");
    } else if (!inputValue.teamMember.id) {
      setError(" Add Team Member");
    } else if (!inputValue.project.id) {
      setError(" Add Project Name ");
    } else if (!inputValue.deadline) {
      setError(" Add Dead Line");
    } else {
      addTask(inputValue);
    }
  };

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess]);

  return (
    <div className="container relative">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
          Create Task for Your Team
        </h1>

        {<h5 className="mt-4 mb-8 text-1xl bg-red text-center ">{error}</h5>}
        <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="fieldContainer">
              <label htmlFor="lws-taskName">Task Name</label>
              <input
                type="text"
                name="taskName"
                id="lws-taskName"
                // required
                placeholder="Implement RTK Query"
                onChange={handleInputChange}
              />
            </div>

            <div className="fieldContainer">
              <label>Assign To</label>
              <select
                id="lws-projectName"
                name="teamMember"
                // required
                onChange={handleTeamMemberSelected}
                onClick={() => setTeamMemberIsLoad(true)}>
                <option value="" hidden>
                  Select Job
                </option>
                {getTeamMemberSuccess &&
                  teamMemberData?.slice().map((team, index) => (
                    <option key={index} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                {getTeamMemberIsLoading && <option>Loading...</option>}
              </select>
            </div>
            <div className="fieldContainer">
              <label htmlFor="lws-projectName">Project Name</label>

              <select
                name="project"
                defaultValue=" "
                id="lws-teamMember"
                // required
                onChange={handleProjectsSelected}
                onClick={() => setProjectsIsLoad(true)}>
                <option value="" hidden>
                  Select Project
                </option>
                {getProjectsSuccess &&
                  projectsData?.slice().map((project, index) => (
                    <option key={index} value={project.id}>
                      {project.projectName}
                    </option>
                  ))}
                {getProjectsIsLoading && <option>Loading ...</option>}
              </select>
            </div>
            <div className="fieldContainer">
              <label htmlFor="lws-deadline">Deadline</label>
              <input
                type="date"
                name="deadline"
                id="lws-deadline"
                // required
                onChange={handleInputChange}
              />
            </div>

            <div className="text-right">
              <button type="submit" className="lws-submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddTask;
