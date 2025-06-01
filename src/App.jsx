import SideBar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import AddingProject from "./components/AddingProject.jsx";
import ProjectInfo from "./components/ProjectInfo.jsx";
import { useState, useRef } from "react";
import ModalWindow from "./components/ModalWindow.jsx";

function App() {
  const [displayToUser, setDisplayToUser] = useState("");
  const [createdProjects, setCreatedProjects] = useState([]);
  const [projectInfo, setProjectInfo] = useState([]);
  const [targetProject, setTargetProject] = useState("");
  const inputUser = {
    title: useRef(),
    desc: useRef(),
    date: useRef(),
  };
  const dialog = useRef();
  function handleSave() {
    const newTitle = inputUser.title.current.value;
    const newProject = {
      title: newTitle,
      desc: inputUser.desc.current.value,
      date: inputUser.date.current.value,
    };
    if (
      newProject.title === "" ||
      newProject.desc === "" ||
      newProject.date === ""
    ) {
      setDisplayToUser("modal");
      dialog.current.showModal();
    } else {
      setDisplayToUser("no-project");
      setCreatedProjects((prevCreated) => [...prevCreated, newTitle]);
      setProjectInfo((prevCreated) => [...prevCreated, newProject]);
    }
  }
  function handleClick(index) {
    setDisplayToUser("project-info");
    setTargetProject(projectInfo[index]);
  }
  function handleDelete(e) {
    setDisplayToUser("no-project");
    const targetEl = createdProjects.indexOf(
      e.target.previousSibling.innerHTML
    );
    createdProjects.splice(targetEl, 1);
    projectInfo.splice(targetEl, 1);
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
    content = <ProjectInfo inputUser={targetProject} onDelete={handleDelete} />;
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
      {displayToUser === "modal" && (
        <ModalWindow ref={dialog} onOk={() => setDisplayToUser("addProject")} />
      )}
      <main className="h-screen my-8 flex gap-8">
        <SideBar
          onAdd={() => setDisplayToUser("add-project")}
          projects={createdProjects}
          onClick={handleClick}
        />
        {content}
      </main>
    </>
  );
}

export default App;
