import React, { useState, useEffect } from "react";
import { TaskInfoBanner } from "./components/TaskInfoBanner";
import { TaskCreator } from "./components/TaskCreator";
import { InfoTab } from "./components/InfoTab";
import { Tabs, Tab, Row, Col, Container, Modal, Button, FormGroup, Navbar } from "react-bootstrap";


function App() {
  const [taskItems, setTaskItems] = useState([
    { id: 1, name: "Hacer la compra", done: false },
    { id: 2, name: "Revisar el correo", done: false },
    { id: 3, name: "Reunión prototipos", done: true },
    { id: 52, name: "Clase salsa", done: false }
  ]);

  useEffect(() => {
    let data = localStorage.getItem("tasks");
    if (data != null) {
      setTaskItems(JSON.parse(data))
    } else {
      setTaskItems([
        { id: 1, name: "Hacer la compra", done: false },
        { id: 2, name: "Revisar el correo", done: false },
        { id: 3, name: "Reunión prototipos", done: true },
        { id: 52, name: "Clase salsa", done: false }
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskItems));
  }, [taskItems]);



  const createNewTask = taskName => {

    if (taskName !== '' && !taskItems.find(t => t.name === taskName)) {
      if (taskItems.length > 0) {
        const max = taskItems.reduce(function (prev, current) {
          return (prev.y > current.y) ? prev : current
        })
        setTaskItems([...taskItems, { id: max.id + 1, name: taskName, done: false }]);
      } else {
        setTaskItems([...taskItems, { id: 1, name: taskName, done: false }]);
      }
    }
  };

  const editTask = taskIdEdit => {
    if (taskEdit !== '' && !taskItems.find(t => t.name === taskEdit)) {
      setTaskItems(
        taskItems.map(t => (t.id === taskIdEdit ? { id: taskIdEdit, name: taskEdit, done: t.done } : t))
      );
    }
  };

  const toggleTask = task =>
    setTaskItems(
      taskItems.map(t => (t.name === task.name ? { ...t, done: !t.done } : t))
    );

  const [show, setShow] = useState(false);


  const [taskEdit, setTaskEdit] = useState("");

  const [taskIdEdit, setTaskIdEdit] = useState(0);

  const handleClose = flag => {
    if (flag) {
      editTask(taskIdEdit);
    }
    setShow(false);
  }

  const handleShow = task => {
    setTaskIdEdit(task.id);
    setTaskEdit(task.name);
    setShow(true);
  }

  const deleteTask = task => {
    var opcion = window.confirm("¿Estás seguro que deseas eliminar la tarea?");
    if (opcion) {
      const newListTask = taskItems.filter((item) => item.id !== task.id);
      setTaskItems(newListTask);
    }
  }

  return (
    <div>


      <Navbar style={{ backgroundColor: '#4540A5' }}>
        <Container>
          <Navbar.Brand href="/" style={{ color: 'white' }}>
            <div class="icon h2"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M15.41 9H7.59C7 9 7 8.59 7 8c0-.59 0-1 .59-1h7.81c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zM9.59 4C9 4 9 3.59 9 3c0-.59 0-1 .59-1h5.81c.59 0 .59.41.59 1 0 .59 0 1-.59 1H9.59zM0 3.91l1.41-1.3L3 4.2 7.09 0 8.5 1.41 3 6.91l-3-3zM7.59 12h7.81c.59 0 .59.41.59 1 0 .59 0 1-.59 1H7.59C7 14 7 13.59 7 13c0-.59 0-1 .59-1z"></path></svg>
              {' '}
              <Navbar.Text style={{ color: 'white', fontWeight: 'bold', fontSize: '30px' }} >Todo List App</Navbar.Text>
            </div>

          </Navbar.Brand>
        </Container>
      </Navbar>


      <div className="container">
        <TaskInfoBanner taskItems={taskItems} />
        <TaskCreator callback={createNewTask} />

        <Container>
          <Row>
            <Col>
              <Tabs defaultActiveKey="active"
                id="controlled-tab-example">
                <Tab eventKey="active" title="Activas">
                  <br />
                  <InfoTab taskItems={taskItems} toggleTask={toggleTask} flagTask={false} handleShow={handleShow} deleteTask={deleteTask} />
                </Tab>
                <Tab eventKey="completed" title="Completadas">
                  <br />
                  <InfoTab taskItems={taskItems} toggleTask={toggleTask} flagTask={true} handleShow={handleShow} deleteTask={deleteTask} />
                </Tab>
                <Tab eventKey="all" title="Todas">
                  <br />
                  <InfoTab taskItems={taskItems} toggleTask={toggleTask} flagTask={true} isAll={true} handleShow={handleShow} deleteTask={deleteTask} />
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Container>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Editar tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body><FormGroup>
          <label>
            Tarea:
          </label>
          <input
            className="form-control"
            name="task-edit-input"
            type="text"
            value={taskEdit}
            onChange={event => setTaskEdit(event.target.value)}
          />
        </FormGroup></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => handleClose(true)}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>

    </div>

  );
}

export default App;
