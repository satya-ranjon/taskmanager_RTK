import React, { useState } from "react";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../features/tasks/tasksApi";
import getMonthName from "../utils/getMonthName";
import DeleteButton from "./ui/DeleteButton";
import EditButton from "./ui/EditButton";

export const TaskItem = ({ task }) => {
  const { taskName, teamMember, project, deadline, status, id } = task || {};
  const { name, avatar } = teamMember || {};
  const { projectName, colorClass } = project || {};

  const [selectStatus, setSelectStatus] = useState(status);

  // Update Task Status
  const [updateTask] = useUpdateTaskMutation();

  const handleUpdateStatus = (e) => {
    const { value } = e.target;
    setSelectStatus(value);
    if (value) {
      updateTask({ id: id, data: { ...task, status: value } });
    }
  };

  // Delete Task

  const [deleteTask] = useDeleteTaskMutation();
  const handleDeleteTask = () => {
    deleteTask(id);
  };

  return (
    <div className="lws-task">
      <div className="flex items-center gap-2 text-slate">
        <h2 className="lws-date">{deadline.split("-")[2]}</h2>
        <h4 className="lws-month">{getMonthName(deadline)}</h4>
      </div>

      <div className="lws-taskContainer">
        <h1 className="lws-task-title">{taskName}</h1>
        <span className={`lws-task-badge ${colorClass}`}>{projectName}</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <img src={avatar} className="team-avater" />
          <p className="lws-task-assignedOn">{name}</p>
        </div>
        {selectStatus == "completed" ? (
          <DeleteButton onClick={handleDeleteTask} />
        ) : (
          <EditButton />
        )}

        <select
          className="lws-status"
          defaultValue={selectStatus}
          onChange={handleUpdateStatus}>
          <option value="pending">Pending</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
};
