import { useState } from "react";
import { FaCircleDown, FaCircleUp } from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

const TodoList = () => {
  // Tạo một state để lưu trữ danh sách công việc
  const [tasks, setTasks] = useState([
    { text: "Learn React", completed: false },
    { text: "Build a Todo App", completed: false },
    { text: "Play games", completed: false },
    { text: "Go to the gym", completed: false },
    { text: "Read a book", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");

  // Tạo toast thông báo
  const [showToast, setShowToast] = useState(false);

  // Hàm xử lý khi người dùng nhập công việc mới
  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  // Hàm thêm việc vào danh sách
  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  // Hàm xóa việc khỏi danh sách
  const deleteTask = (index) => {
    const isConfirm = window.confirm("Do you want to delete this task?");
    if (!isConfirm) return;

    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Hàm di chuyển công việc lên trên / xuống
  const moveTask = (index, direction) => {
    const newIndex = direction === "up" ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= tasks.length) return;

    const updatedTasks = [...tasks];
    [updatedTasks[index], updatedTasks[newIndex]] = [
      updatedTasks[newIndex],
      updatedTasks[index],
    ];

    setTasks(updatedTasks);
  };

  // Hàm đánh dấu việc đã hoàn thành
  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <section>
      <h1>My Todo App</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Enter a new task..."
        />
        <button className="add-btn" onClick={addTask}>
          <IoMdAddCircleOutline />
        </button>
      </div>
      <ol className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? "completed" : ""}>
            <span
              className="task-text"
              onClick={() => toggleTaskCompletion(index)}
            >
              {task.text}
            </span>
            <button className="delete-btn" onClick={() => deleteTask(index)}>
              <RiDeleteBin6Line />
            </button>
            <button className="move-btn" onClick={() => moveTask(index, "up")}>
              <FaCircleUp />
            </button>
            <button
              className="move-btn"
              onClick={() => moveTask(index, "down")}
            >
              <FaCircleDown />
            </button>
          </li>
        ))}
      </ol>
      {showToast && <div className="toast">Task deleted successfully!</div>}
    </section>
  );
};

export default TodoList;
