import { useState } from "react";

const TaskList = ({ task, taskDelete, taskUpdate }) => {
  const [edit, setEdit] = useState(false);
  let content;

  if (edit) {
    content = (
      <>
        <input
          type="text"
          value={task.task}
          onKeyUp={(e) => {
            if (e.target.value != "") {
              e.key == "Enter" && setEdit(false);
            }
          }}
          onChange={(e) => {
            taskUpdate({
              ...task,
              task: e.target.value,
            });
          }}
        />

        <button onClick={() => setEdit(false)}>Save</button>
      </>
    );
  } else {
    content = (
      <>
        {task.task}
        <button onClick={() => setEdit(true)}>Edit</button>
      </>
    );
  }

  return (
    <>
      <input
        type="checkbox"
        checked={task.checked}
        onChange={(e) => {
          taskUpdate({
            ...task,
            checked: e.target.checked,
          });
        }}
      />
      {content}
      <button onClick={() => taskDelete(task.id)}>Delete</button>
    </>
  );
};

function TaskLists({ tasks, deleteTask, updateTask }) {
  return (
    <ul>
      {tasks.map((el) => (
        <li key={el.id}>
          <TaskList task={el} taskDelete={deleteTask} taskUpdate={updateTask} />
        </li>
      ))}
    </ul>
  );
}

export default TaskLists;

// import React, { useState } from "react";

// const TaskList = ({ task }) => {
//   const [edit, setEdit] = useState(false);

//   return (
//     <>
//       <input type="checkbox" />

//       {edit ? (
//         <>
//           <input type="text" value={task} />
//           <button onClick={() => setEdit(false)}>Save</button>
//         </>
//       ) : (
//         <>
//           {task}
//           <button onClick={() => setEdit(true)}>Edit</button>
//         </>
//       )}

//       <button>Delete</button>
//     </>
//   );
// };

// function TaskLists({ tasks }) {
//   return (
//     <ul>
//       {tasks.map((el) => (
//         <li key={el.id}>
//           <TaskList task={el.task} />
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default TaskLists;
