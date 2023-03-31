import { useGetProjectsQuery } from "../features/projects/projectsApi";

const ProjectsList = () => {
  const {
    data: projects,
    isError,
    isLoading,
    isSuccess,
  } = useGetProjectsQuery();

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
  if (!isLoading && !isError && isSuccess && projects?.length > 0) {
    content = projects.map((project) => (
      <div className="checkbox-container" key={project.id}>
        <input type="checkbox" className={project.colorClass} />
        <p className="label">{project.projectName}</p>
      </div>
    ));
  }

  return (
    <div>
      <h3 className="text-xl font-bold">Projects</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
};

export default ProjectsList;
