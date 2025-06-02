import SideBar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import AddingProject from "./components/AddingProject.jsx";
import ProjectInfo from "./components/ProjectInfo.jsx";
import { useState, useRef } from "react";
import ModalWindow from "./components/ModalWindow.jsx";

function App() {
  const [displayToUser, setDisplayToUser] = useState("");
  const [projectInfo, setProjectInfo] = useState([]);
  const [targetProject, setTargetProject] = useState("");
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
    };
    if (
      newProject.title === "" ||
      newProject.desc === "" ||
      newProject.date === ""
    ) {
      // setDisplayToUser("modal");
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
        inputUser={targetProject}
        onDelete={() => handleDelete(targetProject.id)}
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
