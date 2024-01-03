import { useState } from "react";

function AddTask({ addTask, pressInput }) {
  const [inputValue, setInputValue] = useState("");
  return (
    <>
      <input
        type="text"
        value={inputValue}
        onKeyUp={(e) => {
          pressInput(inputValue, e);
          e.key == "Enter" && setInputValue("");
        }}
        placeholder="create your task"
        onChange={(e) => setInputValue(e.target.value)}
      />

      <button
        onClick={() => {
          addTask(inputValue);
          setInputValue("");
        }}
      >
        Add Task
      </button>
    </>
  );
}

export default AddTask;
