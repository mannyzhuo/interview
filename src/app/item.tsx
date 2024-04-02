import { useEffect, useState, KeyboardEventHandler } from "react";
import { Task } from "./types";
import classNames from "classnames";

import styles from "./item.module.css";

const TodoListItem = (
  props: {
    id: number;
    completed: boolean;
    toggleCompletion: (id: number) => void;
  } & Task
): JSX.Element => {
  const handleDoneClick = () => {
    props.toggleCompletion(props.id);
  };

  return (
    <section className={styles.item}>
      <input className={styles.input}
        id={"check" + props.id}
        type="checkbox"
        
        onChange={handleDoneClick}
        checked={props.completed}
      />
      <label htmlFor={`check${props.id}`}> </label>
      <p
        className={classNames({
          [styles.p]: true,
          [styles.througn]: props.completed,
        })}
        onClick={handleDoneClick}
      >
        {props.text}
      </p>
    </section>
  );
};

export default TodoListItem;
