import SideBar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import AddingProject from "./components/AddingProject.jsx";
import ProjectInfo from "./components/ProjectInfo.jsx";
import ModalWindow from "./components/ModalWindow.jsx";
import { useState, useRef } from "react";

function App() {
  const [displayToUser, setDisplayToUser] = useState("");
  const [projectInfo, setProjectInfo] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [targetProject, setTargetProject] = useState("");
  const inputTask = useRef();

  function handleChange() {
    setTaskName(inputTask.current.value);
  }
  const inputUser = {
    title: useRef(),
    desc: useRef(),
    date: useRef(),
  };
  const modalRef = useRef();
  function handleSave() {
    const newTitle = inputUser.title.current.value;
    const newProject = {
      title: newTitle,
      desc: inputUser.desc.current.value,
      date: inputUser.date.current.value,
      id: crypto.randomUUID(),
      tasks: [],
    };
    if (
      newProject.title === "" ||
      newProject.desc === "" ||
      newProject.date === ""
    ) {
      modalRef.current.open();
    } else {
      setDisplayToUser("no-project");
      setProjectInfo((prevCreated) => [...prevCreated, newProject]);
    }
  }
  function handleClick(index) {
    setDisplayToUser("project-info");
    setTargetProject(projectInfo[index]);
  }
  function handleDelete(id) {
    setProjectInfo((prevProjects) =>
      prevProjects.filter((project) => project.id !== id)
    );
    setDisplayToUser("no-project");
  }

  function handleAddTaskToProject() {
    setProjectInfo((prevProjects) => {
      const updatedProjects = prevProjects.map((project) =>
        project.id === targetProject.id
          ? { ...project, tasks: [...project.tasks, taskName] }
          : project
      );
      const updatedTargetProject = updatedProjects.find(
        (project) => project.id === targetProject.id
      );
      setTargetProject(updatedTargetProject);
      return updatedProjects;
    });
    setTaskName("");
  }
  function handleClearTask(index) {
    setTargetProject((prevtarget) => ({
      ...prevtarget,
      tasks: prevtarget.tasks.filter((_, i) => index !== i),
    }));
  }
  let content;
  if (displayToUser === "add-project") {
    content = (
      <AddingProject
        titleRef={inputUser.title}
        descRef={inputUser.desc}
        dateRef={inputUser.date}
        onCancel={() => {
          setDisplayToUser("no-project");
        }}
        onSave={handleSave}
      />
    );
  } else if (displayToUser === "project-info") {
    content = (
      <ProjectInfo
        targetProject={targetProject}
        onDelete={() => handleDelete(targetProject.id)}
        taskName={taskName}
        ref={inputTask}
        onChange={handleChange}
        onAddTask={handleAddTaskToProject}
        onClear={handleClearTask}
      />
    );
  } else {
    content = (
      <Header
        onClick={() => {
          setDisplayToUser("add-project");
        }}
      />
    );
  }

  return (
    <>
      <ModalWindow
        ref={modalRef}
        onOk={() => setDisplayToUser("add-project")}
      />

      <main className="h-screen my-8 flex gap-8">
        <SideBar
          onAdd={() => setDisplayToUser("add-project")}
          projects={projectInfo}
          onClick={handleClick}
        />
        {content}
      </main>
    </>
  );
}

export default App;
