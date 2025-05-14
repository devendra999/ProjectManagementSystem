const SingleTask = (props) => {
    const { task, removeTask, projectId, editTask } = props;
    // console.log(task);
    return (
        <>
            <div className="single_task">
                <h4>{task?.name} <div className="button">
                    <button onClick={() => editTask(projectId, task?.project_id, task?.name, task?.description, task?.due_date)} className="green">Edit</button>
                    <button onClick={() => removeTask(projectId, task?.project_id)} className="delt">Delt</button>
                </div>
                </h4>
                <p>{task?.description}</p>
                {task?.due_date && <button>Due Date : {task?.due_date}</button>}
                <button>Created : {task?.created_at}</button>
                <button>Updated : {task?.updated_at}</button>
            </div>
        </>
    )
}

export default SingleTask;