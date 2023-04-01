import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProjectsQuery } from "../features/projects/projectsApi";
import {
  useUpdateTaskMutation,
  useGetTaskQuery,
} from "../features/tasks/tasksApi";
import { useGetTeamsQuery } from "../features/teams/teamsApi";

const initialState = {
  taskName: "",
  teamMember: "",
  project: "",
  deadline: "",
};
const EditTask = () => {
  // GET teamMember
  const { data: getTeamMember, isSuccess: getTeamMemberSuccess } =
    useGetTeamsQuery();

  // GET teamMember
  const { data: getProjects, isSuccess: getProjectsSuccess } =
    useGetProjectsQuery();

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
    const findTeamMember = getTeamMember?.find((m) => m.id == value);
    setInputValue({
      ...inputValue,
      [name]: findTeamMember,
    });
  };
  const handleProjectsSelected = (e) => {
    const { name, value } = e.target;
    const findProject = getProjects?.find((p) => p.id == value);
    setInputValue({
      ...inputValue,
      [name]: findProject,
    });
  };

  // Load Existing data
  const { taskId } = useParams();
  const { data } = useGetTaskQuery(taskId);
  useEffect(() => {
    if (data?.id) {
      setInputValue({
        taskName: data?.taskName,
        teamMember: data?.teamMember,
        project: data?.project,
        deadline: data?.deadline,
      });
    }
  }, [data]);

  // Send to data server
  const [updateTask, { isSuccess }] = useUpdateTaskMutation();
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
      updateTask({ id: data?.id, data: inputValue });
    }
  };

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess]);

  return (
    <div className="container relative">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
          Edit Task for Your Team
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
                value={inputValue.taskName}
                placeholder="Implement RTK Query"
                onChange={handleInputChange}
              />
            </div>

            <div className="fieldContainer">
              <label>Assign To</label>
              <select
                id="lws-projectName"
                name="teamMember"
                value={inputValue?.teamMember?.id}
                // required
                onChange={handleTeamMemberSelected}>
                <option value="" hidden>
                  Select Job
                </option>
                {getTeamMemberSuccess &&
                  getTeamMember?.slice().map((team, index) => (
                    <option key={index} value={team.id}>
                      {team.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="fieldContainer">
              <label htmlFor="lws-projectName">Project Name</label>

              <select
                name="project"
                defaultValue=" "
                id="lws-teamMember"
                // required
                value={inputValue?.project.id}
                onChange={handleProjectsSelected}>
                <option value="" hidden>
                  Select Project
                </option>
                {getProjectsSuccess &&
                  getProjects?.slice().map((project, index) => (
                    <option key={index} value={project.id}>
                      {project.projectName}
                    </option>
                  ))}
              </select>
            </div>
            <div className="fieldContainer">
              <label htmlFor="lws-deadline">Deadline</label>
              <input
                type="date"
                name="deadline"
                value={inputValue?.deadline}
                id="lws-deadline"
                // required
                onChange={handleInputChange}
              />
            </div>

            <div className="text-right">
              <button type="submit" className="lws-submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditTask;
