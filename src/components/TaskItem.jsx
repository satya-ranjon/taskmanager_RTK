import React, { useState } from "react";
import getMonthName from "../utils/getMonthName";
import DeleteButton from "./ui/DeleteButton";
import EditButton from "./ui/EditButton";

export const TaskItem = ({ task }) => {
  const { taskName, teamMember, project, deadline, status } = task || {};
  const { name, avatar } = teamMember || {};
  const { projectName, colorClass } = project || {};

  const [selectStatus, setSelectStatus] = useState(status);

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
        {selectStatus == "completed" ? <DeleteButton /> : <EditButton />}

        <select
          className="lws-status"
          defaultValue={selectStatus}
          onChange={(e) => setSelectStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
};
