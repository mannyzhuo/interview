"use client";

import { useEffect, useState, KeyboardEventHandler } from "react";
import { Task, Choice } from "./types";
import classNames from "classnames";

import styles from "./page.module.css";

import TodoListItem from "./item";

function App(): JSX.Element {
  const [leftCount, setLeftCount] = useState(0);
  const [taskAll, setTaskAll] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState("");
  const [choice, setChoice] = useState(Choice.All);
  const [showList, setShowList] = useState<Task[]>([]);

  useEffect(() => {
    if (choice === Choice.All) {
      setShowList(taskAll);
    } else if (choice === Choice.Active) {
      setShowList(
        taskAll.filter((task, id) => {
          return task.completed === false;
        })
      );
    } else if (choice === Choice.Completed) {
      setShowList(taskAll.filter((task) => task.completed));
    }
  }, [choice, taskAll]);

  useEffect(() => {
    const activeTasks = taskAll.filter((task) => !task.completed);
    setLeftCount(activeTasks.length);
  }, [taskAll]);

  const addTask = () => {
    if (taskName.trim()) {
      const newtaskAll = [
        ...taskAll,
        { text: taskName.trim(), completed: false },
      ];
      setTaskAll(newtaskAll);
      setTaskName("");
    }
  };

  const toggleTaskCompletion = (id: number) => {
    setTaskAll((prevValue) => {
      return prevValue.map((item, index) => {
        if (index === id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      });
    });
  };

  const clearCb = () => {
    setTaskAll(taskAll.filter((item) => !item.completed));
  };

  return (
    <main className={styles.app}>
      <div>
        <div>
          <h2 className={styles.h2}>TODO</h2>
        </div>
      </div>

      <article style={{ marginTop: "50px" }}>
        <div className={styles.new}>
          <div className={styles.inputSpace}></div>
          <input
            type="text"
            name="todo"
            className={styles.input}
            autoFocus
            placeholder="Create a new todo..."
            value={taskName}
            onChange={(event) => {
              setTaskName(event.target.value);
            }}
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
              if (event.key === "Enter") {
                addTask();
              }
            }}
          />
        </div>
        <section className={styles.container}>
          {showList.map((task, index) => {
            return (
              <>
                <TodoListItem
                  key={index}
                  id={index}
                  text={task.text}
                  completed={task.completed}
                  toggleCompletion={toggleTaskCompletion}
                />
                {index !== showList.length - 1 ? (
                  <hr style={{ borderColor: "#594e4e0d" }} />
                ) : (
                  ""
                )}
              </>
            );
          })}

          <div className={styles.controlerBox}>
            <div>
              <p>{leftCount} items left</p>
            </div>
            <div className={styles.choices}>
              <div
                className={classNames({
                  [styles.all]: true,
                  [styles.active]: choice == Choice.All,
                })}
                onClick={() => setChoice(Choice.All)}
              >
                <p>All</p>
              </div>
              <div
                className={classNames({
                  [styles.active]: true,
                  [styles.active]: choice == Choice.Active,
                })}
                onClick={() => setChoice(Choice.Active)}
              >
                <p>Active</p>
              </div>
              <div
                className={classNames({
                  [styles.completed]: true,
                  [styles.active]: choice == Choice.Completed,
                })}
                onClick={() => setChoice(Choice.Completed)}
              >
                <p>Completed</p>
              </div>
            </div>
            <div className={styles.complete} onClick={clearCb}>
              <p>Clear Completed</p>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}

export default App;
