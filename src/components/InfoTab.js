import React from "react";
import { TaskHead } from "./TaskHead.js";
import { TaskRow } from "./TaskRow.js";

export const InfoTab = props => {

  const taskTableRows = () =>
    props.taskItems
      .filter(task => task.done === props.flagTask)
      .map(task => (
        <TaskRow key={task.name} task={task} toggleTask={props.toggleTask} handleShow={props.handleShow} deleteTask={props.deleteTask} />
      ));

  const taskTableRowsAll = () =>
    props.taskItems
      .sort((a, b) => b['done'] - a['done'])
      .map(task => (
        <TaskRow key={task.name} task={task} toggleTask={props.toggleTask} handleShow={props.handleShow} deleteTask={props.deleteTask} />
      ));

  return (
    <table style={{ textAlign: 'center', verticalAlign: 'middle' }} className="table table-striped table-bordered">
      <thead>
        <TaskHead />
      </thead>
      <tbody>{props.isAll === true ? taskTableRowsAll() : taskTableRows()}</tbody>
    </table>
  );
};