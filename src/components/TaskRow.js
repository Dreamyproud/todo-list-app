import React from "react";
import { Button } from "react-bootstrap";


export const TaskRow = props => {

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      props.toggleTask(props.task)
    }
  }

  return (
    <tr key={props.task.name}>
      <td>
        <input
          type="checkbox"
          checked={props.task.done}
          onChange={() => props.toggleTask(props.task)}
          onKeyDown={handleKeyDown}
        />
      </td>
      <td>{props.task.name}</td>
      <td>
        <Button variant="primary" onClick={() => props.handleShow(props.task)}>
          <i class="bi bi-pencil-square"></i>
        </Button>{' '}
        <Button variant="danger" onClick={() => props.deleteTask(props.task)}>
          <i class="bi bi-trash"></i>
        </Button>
      </td>


    </tr>


  );
};