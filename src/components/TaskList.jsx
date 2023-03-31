import { useGetTasksQuery } from "../features/tasks/tasksApi";
import { TaskItem } from "./TaskItem";

const TaskList = () => {
  const { data: tasks, isError, isLoading, isSuccess } = useGetTasksQuery();

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
