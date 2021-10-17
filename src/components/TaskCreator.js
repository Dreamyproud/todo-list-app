import React, { useState } from "react";
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'

export const TaskCreator = props => {
  const [newTaskName, setNewTaskName] = useState("");

  const updateNewTaskValue = e => setNewTaskName(e.target.value);

  const createNewTask = () => {
    props.callback(newTaskName);
    setNewTaskName('');
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      createNewTask();
    }
  }

  return (
    <div className="my-1">

      <InputGroup className="mb-3">
        <FormControl
          value={newTaskName}
          placeholder="Nueva tarea"
          aria-label="Nueva tarea"
          aria-describedby="basic-addon2"
          onChange={updateNewTaskValue}
          onKeyDown={handleKeyDown}
        />
        <Button variant="secondary" style={{ backgroundColor: '#3a368e' }} onClick={createNewTask}><div class="text-white"><i class="bi bi-plus-square-fill"></i> Agregar tarea</div></Button>
      </InputGroup>

    </div>
  );
};
