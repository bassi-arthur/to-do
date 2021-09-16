import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  category: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTestCategory, setNewTestCategory] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask() {
    if (!newTaskTitle && newTaskTitle != " ") return;
    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      category: newTestCategory,
      isComplete: false,
    };
    setTasks((oldState) => [...oldState, newTask]);
    setNewTaskTitle("");
    setNewTestCategory("");
  }

  function handleToggleTaskCompletion(id: number) {
    const newTask = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            isComplete: !task.isComplete,
          }
        : task
    );
    setTasks(newTask);
  }

  function handleRemoveTask(id: number) {
    const filteredTask = tasks.filter((task) => task.id !== id);
    setTasks(filteredTask);
  }

  function handleToggleAllTasksCompletion() {
    const newTask = tasks.map((task) => {
      return {
        ...task,
        isComplete: true,
      };
    });
    setTasks(newTask);
  }

  function handleRemodeAllTasks() {
    setTasks([]);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tarefas</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar nova tarefa"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <input
            type="text"
            placeholder="Adicionar a categoria da tarefa"
            onChange={(e) => setNewTestCategory(e.target.value)}
            value={newTestCategory}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
                <p>{task.category}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
        <div className="button-group">
          <button onClick={handleToggleAllTasksCompletion}>
            Completar todas as tarefas
          </button>
          <button
            className="delete-all-tasks-button"
            onClick={handleRemodeAllTasks}
          >
            Deletar todas as tarefas
          </button>
        </div>
      </main>
    </section>
  );
}
