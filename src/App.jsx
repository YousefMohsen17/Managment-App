import SideBar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import AddingProject from "./components/AddingProject.jsx";
import ProjectInfo from "./components/ProjectInfo.jsx";
import { useState, useRef } from "react";
import ModalWindow from "./components/ModalWindow.jsx";

function App() {
  const [formDisplay, setFormDisplay] = useState(false);
  const [dialogDisplay, setDialogDisplay] = useState(false);
  const [projectDisplay, setProjectDisplay] = useState(false);
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
      setDialogDisplay(true);
      dialog.current.showModal();
    } else {
      setCreatedProjects((prevCreated) => [...prevCreated, newTitle]);
      setFormDisplay(false);
      setProjectDisplay(false);

      setProjectInfo((prevCreated) => [...prevCreated, newProject]);
    }
  }
  function handleClick(index) {
    setProjectDisplay(true);
    setFormDisplay(false);
    setTargetProject(projectInfo[index]);
  }
  function handleDelete(e) {
    setFormDisplay(false);
    setProjectDisplay(false);
    const targetEl = createdProjects.indexOf(
      e.target.previousSibling.innerHTML
    );
    createdProjects.splice(targetEl, 1);
    projectInfo.splice(targetEl, 1);
  }

  let content;
  if (formDisplay) {
    content = (
      <AddingProject
        titleRef={inputUser.title}
        descRef={inputUser.desc}
        dateRef={inputUser.date}
        onCancel={() => {
          setFormDisplay(false);
          setProjectDisplay(false);
        }}
        onSave={handleSave}
      />
    );
  } else if (!formDisplay && projectDisplay && targetProject) {
    content = <ProjectInfo inputUser={targetProject} onDelete={handleDelete} />;
  } else {
    content = (
      <Header
        onClick={() => {
          setFormDisplay(true);
        }}
      />
    );
  }

  return (
    <>
      {dialogDisplay && (
        <ModalWindow ref={dialog} onOk={() => setDialogDisplay(false)} />
      )}
      <main className="h-screen my-8 flex gap-8">
        <SideBar
          onAdd={() => setFormDisplay(true)}
          projects={createdProjects}
          onClick={handleClick}
        />
        {content}
      </main>
    </>
  );
}

export default App;
