import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import HighlightOffTwoToneIcon from "@mui/icons-material/HighlightOffTwoTone";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { Task } from "./Task";

// type Task = {
//   createDate?: string;
//   userid?: string;
//   title?: string;
//   description?: string;
//   taskDate?: string;
//   isComplete?: boolean;
//   _id?: string;
// };

interface ChildProps {
  task: Task;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[] | undefined>>;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
};

const PopModal: React.FC<ChildProps> = ({ task, setTasks, tasks }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [title, setTitle] = React.useState<string | undefined>(task.title);
  const [description, setDescription] = React.useState<string | undefined>(
    task.description
  );
  const [taskDate, setTaskDate] = React.useState<string | undefined>(
    task.taskDate
  );
  const [isComplete, setIsComplete] = React.useState<boolean | undefined>(
    task.isComplete
  );

  const updateTask = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    axios
      .put(`https://to-do-backend-4q5y.onrender.com/tasks/${task._id}`, {
        title: title,
        description: description,
        taskDate: taskDate,
        isComplete: isComplete,
      })
      .then((res) => {
        const newTask: Task = {};
        if (title) {
          newTask.title = title;
        }
        if (description) {
          newTask.description = description;
        }
        if (taskDate) {
          newTask.taskDate = taskDate;
        }
        if (isComplete) {
          newTask.isComplete = isComplete;
        }
        const updatedTask = tasks.map((t) => {
          return t._id == task._id ? res.data.updatedTask : t;
        });
        setTasks(updatedTask);
      })
      .catch((error) => {
        console.log(error);
      });
    setOpen(false);
  };

  return (
    <div>
      <EditIcon
        onClick={handleOpen}
        fontSize="large"
        sx={{
          bgcolor: "orange",
          borderRadius: "10px",
          border: "2px solid black",
          padding: "4px",
          marginLeft: "7px",
          cursor: "pointer",
        }}
      >
        Update Task
      </EditIcon>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <HighlightOffTwoToneIcon
            onClick={handleClose}
            fontSize="large"
            className="float-right cursor-pointer pl-2 md:pl-0"
          />
          <form action="" className="font-headertxt text-xl">
            <div className="flex items-center gap-3 pb-5">
              <h4>Title: </h4>
              <input
                type="text"
                name="title"
                placeholder="Task Title"
                className="border-solid border-2 border-black bg-slate-300 cursor-pointer px-3 py-1 rounded-2xl"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <div className="flex items-center gap-3 pb-5">
              <h4>Description: </h4>
              <input
                type="text"
                name="Description"
                placeholder="Task Description"
                className="border-solid border-2 border-black bg-slate-300 cursor-pointer px-3 py-1 rounded-2xl"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
            <div className="flex items-center gap-2 pb-5">
              <h4>Completion Date: </h4>
              <input
                type="date"
                name="TaskDate"
                className="border-solid border-2 border-black bg-slate-300 cursor-pointer px-3 py-1 rounded-2xl"
                onChange={(e) => setTaskDate(e.target.value)}
                value={taskDate}
              />
            </div>
            <div className="flex items-center gap-2 pb-5">
              <h4>Completed: </h4>
              <input
                type="checkbox"
                name="TaskDate"
                className="border-solid border-2 border-black bg-slate-300 cursor-pointer px-3 py-1 rounded-2xl"
                onChange={(e) => setIsComplete(e.target.checked)}
                checked={isComplete}
              />
            </div>
            <div className="">
              <input
                type="submit"
                value="Update Task"
                className="border-solid border-2 border-black bg-sky-300 cursor-pointer px-3 py-1 rounded-2xl hover:bg-sky-500"
                onClick={updateTask}
              />
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default PopModal;
