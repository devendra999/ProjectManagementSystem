import SingleTask from './SingleTask';

const SingleProject = (props) => {
    const { project, removeProject, editProject, manageTask, removeTask, editTask } = props;
    return (
        <>
            <div className="col">
                <div className="single_project">
                    <h3>{project?.name} <div className="button">
                        <button onClick={() => editProject(project?.name, project?.price, project?.description, project?.due_date, project?.id)} className='green'>Edit</button>
                        <button onClick={() => removeProject(project?.id)} className='delt'>Delt</button>
                    </div></h3>
                    <p>Price : {project?.price}</p>
                    <p>Due Date : {project?.due_date}</p>
                    <p>Description : {project?.description}</p>
                    <p>Created At : {project?.created_at}</p>
                    <p>Updated At : {project?.updated_at}</p>
                    <div className="all_tasks">
                        <h4>Tasks : <button onClick={() => manageTask(project?.id)} >Add Task</button></h4>
                        {project?.tasks.length > 0 ? project?.tasks.map((task) => <SingleTask key={task?.id} task={task} removeTask={removeTask} projectId={project?.id} editTask={editTask} />) : 'No task available'

                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleProject;