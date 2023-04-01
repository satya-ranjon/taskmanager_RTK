import { useSelector } from "react-redux";
import { useGetProjectsQuery } from "../features/projects/projectsApi";
import { useGetTasksQuery } from "../features/tasks/tasksApi";
import { TaskItem } from "./TaskItem";

const TaskList = () => {
  const { data, isError, isLoading, isSuccess } = useGetTasksQuery();

  const { projectId } = useSelector((state) => state.projectsid);
  const { search } = useSelector((state) => state.tasks);

  let tasks = [];
  if (isSuccess && projectId?.length > 0) {
    tasks = data.filter((item) => projectId?.indexOf(item?.project?.id) !== -1);
  }
  if (search) {
    tasks = tasks.filter((item) => item.taskName.includes(search));
  }

  // decided what to render
  let content;
  if (isLoading) {
    content = <h4>Loading ......</h4>;
  }
  if (!isLoading && isError) {
    content = <h4>Some error occurred !</h4>;
  }
  if (!isLoading && !isError && isSuccess && tasks?.length === 0) {
    content = <h4>Tasks Not Found .!</h4>;
  }
  if (!isLoading && !isError && isSuccess && tasks?.length > 0) {
    content = tasks.map((task) => <TaskItem key={task.id} task={task} />);
  }

  return <div className="lws-task-list">{content}</div>;
};

export default TaskList;
