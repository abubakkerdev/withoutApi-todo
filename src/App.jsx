import { useReducer } from "react";
import AddTask from "./AddTask";
import TaskLists from "./TaskLists";
import DeleteAll from "./DeleteAll";

const reducer = (state, action) => {
  switch (action.type) {
    case "taskAdd":
      return {
        ...state,
        taskList: [
          ...state.taskList,
          {
            id: action.id,
            task: action.task,
            checked: false,
          },
        ],
      };

    case "taskDelete":
      return {
        ...state,
        taskList: state.taskList.filter((el) => el.id !== action.id),
      };

    case "taskUpdate":
      return {
        ...state,
        taskList: state.taskList.map((el) => {
          if (el.id == action.data.id) {
            return action.data;
          } else {
            return el;
          }
        }),
      };

    case "taskAllCheck":
      return {
        ...state,
        checkedAll: action.data,
        taskList: state.taskList.map((el) => {
          return { ...el, checked: action.data };
        }),
      };
    case "taskAllDelete":
      return {
        ...state,
        checkedAll: false,
        taskList: state.taskList.filter((el) => el.checked !== true),
      };

    default:
      return {
        ...state,
        error: new Error(`Unknown Action:  ${action.type}`),
      };
  }
};

let taskId = 4;

const initialValue = {
  checkedAll: false,
  taskList: [
    { id: 1, task: "one", checked: true },
    { id: 2, task: "two", checked: false },
    { id: 3, task: "three", checked: false },
  ],
  error: null,
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialValue);

  const handleAddTask = (data) => {
    if (data != "") {
      dispatch({ type: "taskAdd", task: data, id: taskId++ });
    }
  };

  const handleDeleteTask = (id) => {
    dispatch({ type: "taskDelete", id: id });
  };

  const handleUpdateTask = (data) => {
    dispatch({ type: "taskUpdate", data: data });
  };
  const handleDeleteAllTask = () => {
    dispatch({ type: "taskAllDelete" });
  };
  const handleCheckAll = (e) => {
    dispatch({ type: "taskAllCheck", data: e.target.checked });
  };

  const handlePressInput = (data, e) => {
    if (e.key == "Enter") {
      if (data != "") {
        dispatch({ type: "taskAdd", task: data, id: taskId++ });
      }
    }
  };

  return (
    <>
      {state.error ? (
        <h2>{state.error.message}</h2>
      ) : (
        <div>
          <DeleteAll
            check={state.checkedAll}
            deleteAll={handleDeleteAllTask}
            checkAll={handleCheckAll}
          />
          <br /> <br />
          <AddTask addTask={handleAddTask} pressInput={handlePressInput} />
          <TaskLists
            tasks={state.taskList}
            deleteTask={handleDeleteTask}
            updateTask={handleUpdateTask}
          />
        </div>
      )}
    </>
  );
}

export default App;
