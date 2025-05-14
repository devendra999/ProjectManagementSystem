
import React, { useState, useEffect } from 'react';
import dateFormat, { masks } from "dateformat";
import SingleProject from './components/SingleProject';
import './App.css';
const nowDate = new Date();

const allProjects = [
  {
    id: 41254,
    name: 'project 1',
    price: 4545,
    due_date: dateFormat(nowDate),
    description: 'lorm lipalis',
    created_at: dateFormat(nowDate),
    updated_at: dateFormat(nowDate),
    tasks: [
      {
        name: 'task 1',
        project_id: 545478,
        due_date: dateFormat(nowDate),
        description: 'lorm lipalis',
        created_at: dateFormat(nowDate),
        updated_at: dateFormat(nowDate)
      },
      {
        name: 'task 2',
        project_id: 878798,
        due_date: dateFormat(nowDate),
        description: 'lorm lipalis',
        created_at: dateFormat(nowDate),
        updated_at: dateFormat(nowDate)
      },
    ]
  },
  {
    id: 41254545,
    name: 'project 2',
    price: 4545,
    due_date: dateFormat(nowDate),
    description: 'lorm lipalis',
    created_at: dateFormat(nowDate),
    updated_at: dateFormat(nowDate),
    tasks: [
      {
        name: 'task 1',
        project_id: 54,
        due_date: dateFormat(nowDate),
        description: 'lorm lipalis',
        created_at: dateFormat(nowDate),
        updated_at: dateFormat(nowDate)
      },
      {
        name: 'task 2',
        project_id: 554,
        due_date: dateFormat(nowDate),
        description: 'lorm lipalis',
        created_at: dateFormat(nowDate),
        updated_at: dateFormat(nowDate)
      },
    ]
  },
  {
    id: 412454545454545,
    name: 'project 3',
    price: 4545,
    due_date: dateFormat(nowDate),
    description: 'lorm lipalis',
    created_at: dateFormat(nowDate),
    updated_at: dateFormat(nowDate),
    tasks: []
  }
]

function App() {
  const [projects, setProjects] = useState(allProjects);
  const [newProject, setNewProject] = useState({
    name: '',
    price: null,
    description: '',
    due_date: ''
  });
  const [isEditProject, setIsEditProject] = useState(null);
  const [addModal, setAddModal] = useState(false);




  // handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }))
  }

  // handleProject
  const handleProject = () => {

    if (isEditProject) {
      const nowDate = new Date();
      let payload = {
        ...newProject,
        updated_at: dateFormat(nowDate)
      }
      let tempProjects = projects.map((elem) => {
        if (elem.id == isEditProject) {
          return { ...elem, ...payload }
        }
        return elem;
      })
      setProjects(tempProjects);
    } else {
      const now = new Date();
      let payload = {
        id: dateFormat(now),
        created_at: dateFormat(now),
        updated_at: dateFormat(now),
        tasks: [],
        ...newProject
      }

      setProjects((prev) => ([...prev, payload]));

    }

    setNewProject({
      name: '',
      price: null,
      description: '',
      due_date: ''
    });
    setAddModal(false);
  }

  // removeProject
  const removeProject = (id) => {
    let tempProjects = projects.filter((elem) => elem.id !== id);
    setProjects(tempProjects);
  }

  // editProject
  const editProject = (name, price, description, due_date, id) => {
    const formattedDate = dateFormat(due_date, 'yyyy-mm-dd');
    console.log(formattedDate);

    setNewProject({
      name: name,
      price: price,
      description: description,
      due_date: formattedDate
    });
    setIsEditProject(id);
    setAddModal(true);
  }

  // task---------------------------------------------------------------

  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    due_date: ''
  });
  const [taskModal, setTaskModal] = useState(false);
  const [taskProjectId, setTaskProjectId] = useState('');
  const [editTaskProjectId, setEditTaskProjectId] = useState('');
  const [taskId, setTaskId] = useState('');


  // handleTaskChange
  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }))
  }

  // manageTask
  const manageTask = (id) => {
    setTaskModal(true);
    setTaskProjectId(id);
  }

  // handleTask
  const handleTask = () => {
    if (taskId) {
      console.log('edit');


      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === editTaskProjectId
            ? {
              ...project,
              tasks: project.tasks.map((task) =>
                task.project_id === taskId ? { ...task, ...newTask, updated_at: dateFormat(nowDate) } : task
              ),
            }
            : project
        )
      );


    } else {
      console.log('add');
      const now = new Date();
      let payload = {
        ...newTask,
        project_id: dateFormat(now),
        created_at: dateFormat(now),
        updated_at: dateFormat(now),
      }

      // Update the projects state immutably
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === taskProjectId
            ? { ...project, tasks: [...project.tasks, payload] }
            : project
        )
      );
    }


    // Reset the newTask state
    setNewTask({
      name: '',
      description: '',
      due_date: '',
    });

    // Close the task modal
    setTaskModal(false);
    setTaskProjectId('');
    setTaskId('');

  }

  // removeTask
  const removeTask = (prjId, taskId) => {
    setProjects((prevProjects) =>
      prevProjects.map((prj) =>
        prj.id === prjId
          ? { ...prj, tasks: prj.tasks.filter((task) => task?.project_id !== taskId) }
          : prj
      )
    );
  };

  // editTask
  const editTask = (prjId, taskId, name, description, due_date) => {
    const formattedDate = dateFormat(due_date, 'yyyy-mm-dd');
    console.log(formattedDate);
    setNewTask({
      name,
      description,
      due_date: formattedDate
    });
    setTaskId(taskId);
    setEditTaskProjectId(prjId);
    setTaskModal(true);
  };

  console.log(taskProjectId, 'project id');
  console.log(isEditProject, 'project id');
  console.log(projects);


  return (
    <div className="App">
      <div className="header">
        <h2>Project Management System</h2>
        <button onClick={() => setAddModal(true)}>Add Project</button>
      </div>
      <div className="all_projects">
        <div className="row">
          {
            projects.length > 0 ?
              projects.map((project, ind) => <SingleProject key={ind} project={project} removeProject={removeProject} editProject={editProject} manageTask={manageTask} removeTask={removeTask} editTask={editTask} />) : 'No Projects available'
          }
        </div>
      </div>

      {/* add project */}
      {addModal && <div className='modal'>
        <div className="modal_content">
          <div className="modal_header">
            <h3>{isEditProject ? 'Edit Project' : 'New Project'}</h3>
          </div>
          <div className='project_form'>
            <input onChange={handleChange} value={newProject?.name} name="name" type="text" placeholder='Name' className='form_control' />
            <input onChange={handleChange} value={newProject?.price} name="price" type="number" placeholder='Price' className='form_control' />
            <textarea onChange={handleChange} value={newProject?.description} name="description" type="text" placeholder='Description' className='form_control'></textarea>
            <input onChange={handleChange} value={newProject?.due_date} name="due_date" type="date" placeholder='Due Date' className='form_control' />
            <div className="button">
              <button onClick={handleProject}>Submit</button>
              <button onClick={() => setAddModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      </div>}


      {/* add task */}
      {taskModal && <div className='modal'>
        <div className="modal_content">
          <div className="modal_header">
            <h3>{taskId ? 'Edit Task' : 'New Task'}</h3>
          </div>
          <div className='project_form'>
            <input onChange={handleTaskChange} value={newTask?.name} name="name" type="text" placeholder='Name' className='form_control' />
            <textarea onChange={handleTaskChange} value={newTask?.description} name="description" type="text" placeholder='Description' className='form_control'></textarea>
            <input onChange={handleTaskChange} value={newTask?.due_date} name="due_date" type="date" placeholder='Due Date' className='form_control' />
            <div className="button">
              <button onClick={handleTask}>Submit</button>
              <button onClick={() => setTaskModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      </div>}

    </div>
  );
}

export default App;