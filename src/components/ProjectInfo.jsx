import { useState, useRef } from "react";

export default function ProjectInfo({ inputUser, onDelete }) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const inputTask = useRef();
  const [addTask, setAddTask] = useState([]);
  const [taskName, setTaskName] = useState("");
  function handleChange() {
    setTaskName(inputTask.current.value);
  }
  function handleClear(index) {
    setAddTask((prevTasks) => prevTasks.filter((_, i) => i !== index));
  }
  function handleAddingTask() {
    setAddTask((prevCreated) => [...prevCreated, inputTask.current.value]);
    setTaskName("");
  }
  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {inputUser.title}
          </h1>
          <button
            className="text-stone-600 hover:text-stone-950"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
        <p className="mb-4 text-stone-400">
          {formatter.format(new Date(inputUser.date))}
        </p>
        <p className="text-stone-600 whitespace-pre-wrap">{inputUser.desc}</p>
      </header>
      <section>
        <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
        <div className="flex items-center gap-4">
          <input
            className="w-64 px-2 py-1 rounded-sm bg-stone-200"
            type="text"
            value={taskName}
            onChange={handleChange}
            ref={inputTask}
          />
          <button
            className="text-stone-700 hover:text-stone-950"
            onClick={handleAddingTask}
          >
            Add Task
          </button>
        </div>
        {addTask.length <= 0 ? (
          <p className="text-stone-800 my-4">
            This project does not have any tasks yet.
          </p>
        ) : (
          <ul className="p-4 mt-8 rounded-md bg-stone-100">
            {addTask.map((task, index) => {
              return (
                <li className="flex justify-between my-4" key={index}>
                  <span>{task}</span>
                  <button
                    onClick={() => handleClear(index)}
                    className="text-stone-700 hover:text-red-500"
                  >
                    Clear
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
