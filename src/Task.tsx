import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import PopModal from "./PopModal";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
// import { Task } from "./Task";

export type Task = {
  createDate?: string;

  description?: string;
  isComplete?: boolean;
  taskDate?: string;
  title?: string;
  userid?: string;
  _id?: string;
};
interface ParentProps {
  setTasks?: React.Dispatch<React.SetStateAction<Task[] | undefined>>;
}

const Task: React.FC<ParentProps> = () => {
  const userId = sessionStorage.getItem("userId");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [name, setName] = useState("");

  const [tasks, setTasks] = useState<Task[]>();
  useEffect(() => {
    axios
      .get("https://to-do-backend-4q5y.onrender.com/tasks", {
        headers: {
          userid: userId,
        },
      })
      .then((res) => {
        setTasks(res.data.userTasks);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("https://to-do-backend-4q5y.onrender.com/user/name", {
        headers: {
          userid: sessionStorage.getItem("userId"),
        },
      })
      .then((res) => {
        setName(res.data.userName);
      });
  }, [userId]);

  const createTask = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    axios
      .post(
        "https://to-do-backend-4q5y.onrender.com/tasks",
        {
          title: title,
          description: description,
          taskDate: taskDate,
        },
        {
          headers: {
            userid: userId,
          },
        }
      )
      .then((res) => {
        res.data.createDate
          ? setTasks((prevTask): Task[] | undefined =>
              prevTask ? [...prevTask, res.data] : undefined
            )
          : alert(res.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (deleteTask: {
    createDate?: string;
    description?: string;
    isComplete?: boolean;
    taskDate?: string;
    title?: string;
    userid?: string;
    _id?: unknown;
  }) => {
    axios
      .delete(`https://to-do-backend-4q5y.onrender.com/tasks/${deleteTask._id}`)
      .then(() => {
        const deleteT = tasks?.filter((task) => task._id != deleteTask._id);
        setTasks(deleteT);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCheck = (e: ChangeEvent<HTMLInputElement>, updateTask: Task) => {
    console.log(e.target.checked);
    axios
      .put(`https://to-do-backend-4q5y.onrender.com/tasks/${updateTask._id}`, {
        isComplete: e.target.checked,
      })
      .then((res) => {
        console.log(res.data);
        const updateT = tasks?.map((task) => {
          return task._id == updateTask._id
            ? { ...task, isComplete: res.data.updatedTask.isComplete }
            : task;
        });
        setTasks(updateT);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="p-2">
        <h1 className="text-4xl font-bold capitalize font-headertxt py-1">
          Hi {name}
        </h1>
        <h2 className="text-3xl capitalize font-bold font-headertxt py-2">
          Create Task
        </h2>
        <form action="" className="flex font-headertxt text-xl">
          <div>
            Title:{" "}
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              required
              className="border-solid border-2 border-black bg-slate-300 cursor-pointer px-3 py-1 rounded-2xl"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="px-4">
            Description:{" "}
            <input
              type="text"
              name="Description"
              placeholder="Task Description"
              required
              className="border-solid border-2 border-black bg-slate-300 cursor-pointer px-3 py-1 rounded-2xl"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>
          <div>
            Completion Date:{" "}
            <input
              type="date"
              name="TaskDate"
              required
              className="border-solid border-2 border-black bg-slate-300 cursor-pointer px-3 py-1 rounded-2xl"
              onChange={(e) => setTaskDate(e.target.value)}
              value={taskDate}
            />
          </div>
          <div className="px-4">
            <input
              type="submit"
              value="Create Task"
              className="border-solid border-2 border-black bg-sky-300 cursor-pointer px-3 py-1 rounded-2xl hover:bg-sky-500"
              onClick={createTask}
            />
          </div>
        </form>
      </div>
      <h2 className="font-headertxt font-extrabold text-3xl py-2 p-3">
        My Task
      </h2>

      <div className="flex w-full font-headertxt font-bold p-3 text-center gap-2 items-center">
        <div className="w-[3%]"></div>
        <div className="w-[20%] border-solid border-2 border-black bg-lime-500 rounded-2xl py-1">
          Title
        </div>
        <div className="w-[30%] border-solid border-2 border-black bg-lime-500 px-3 py-1 rounded-2xl">
          Description
        </div>
        <div className="w-[13%] border-solid border-2 border-black bg-lime-500 px-3 py-1 rounded-2xl">
          Completion Date
        </div>
        <div className="w-[12%] border-solid border-2 border-black bg-lime-500 px-3 py-1 rounded-2xl">
          Created Date
        </div>
        <div className="w-[10%] border-solid border-2 border-black bg-lime-500 px-3 py-1 rounded-2xl">
          Completed
        </div>
        <div></div>
      </div>
      {tasks?.map((task: Task) => (
        <div
          key={task._id}
          className="flex w-full font-headertxt px-3 items-center text-center gap-2"
        >
          <div className="w-[3%]">
            <Checkbox
              color="success"
              checked={task.isComplete}
              onChange={(e) => {
                handleCheck(e, task);
              }}
              sx={{
                "& .MuiSvgIcon-root": { fontSize: 35 },
                textAlign: "center",
                cursor: "pointer",
              }}
            />
          </div>
          <div className="w-[20%]">{task.title}</div>
          <div className="w-[30%] text-wrap">{task.description}</div>
          <div className="w-[13%]">{task.taskDate}</div>
          <div className="w-[12%]">{task.createDate}</div>
          <div className="w-[10%]">{task.isComplete ? "Yes" : "No"}</div>

          <div className="flex items-center">
            <PopModal task={task} setTasks={setTasks} tasks={tasks} />
            <div onClick={() => handleDelete(task)}>
              <DeleteIcon
                fontSize="large"
                sx={{
                  bgcolor: "red",
                  borderRadius: "10px",
                  border: "2px solid black",
                  padding: "1px",
                  marginLeft: "7px",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Task;
