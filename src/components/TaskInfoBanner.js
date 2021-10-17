import React from "react";
import Card from 'react-bootstrap/Card'

export const TaskInfoBanner = props => {


  return (

    <div style={{ marginTop: '20px', textAlign: 'center', marginBottom: '20px' }}>
      <Card border="primary" style={{ width: '12rem' }}>
        <Card.Header>Tareas por completar</Card.Header>
        <Card.Body>
          <Card.Title>{props.taskItems.filter(t => !t.done).length}</Card.Title>
        </Card.Body>
      </Card>
    </div>

  );
};
