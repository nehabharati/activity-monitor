import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Container, ListGroup, Button, Modal } from "react-bootstrap";
import activity from "./components/activity";
import events from "./components/resources";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function App() {
  const [show, setShow] = useState(false);
  const [showing, setShowing] = useState(false);
  const [resources] = useState(events);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleShowing = () => setShowing(true);
  const handleClosing = () => setShowing(false);

  function getCalendar() {
    let calendar = document.getElementById("calendar");
    calendar.style.display = "block";
    handleClose();
  }

  return (
    <Container>
      <Button className="mt-4" onClick={handleShowing}>
        Overview
      </Button>
      <Modal show={showing} onHide={handleClosing}>
        <Modal.Header closeButton>
          <Modal.Title>Overview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Click on any person's name and see their activity. On clicking the
          "View detailed activity" button, you can see their activity
          information in a calendar
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosing}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <h1 className="text-secondary mt-2">Activity monitor</h1>
      <div className="mt-4">
        {activity.map((element) => {
          return (
            <div
              className="mt-2"
              style={{ cursor: "pointer" }}
              key={element.id}
            >
              <ListGroup>
                <ListGroup.Item
                  variant="primary"
                  onClick={handleShow}
                  className="mb-4 mt-4"
                >
                  {element.real_name}
                </ListGroup.Item>
              </ListGroup>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Overview</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <b>Activity during the days active</b>
                  {element.activity_periods.map((time) => {
                    return (
                      <div
                        className="mt-4"
                        key={`${element.real_name}-${element.id}`}
                      >
                        <ListGroup>
                          <ListGroup.Item>
                            <b>Start time:</b> {time.start_time}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <b>End time:</b> {time.end_time}
                          </ListGroup.Item>
                        </ListGroup>
                      </div>
                    );
                  })}
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={getCalendar}>View detailed activity</Button>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          );
        })}
        <div
          id="calendar"
          style={{ height: "500pt", display: "none" }}
          className="mt-4 mb-4"
        >
          <Calendar
            events={resources}
            startAccessor="start"
            endAccessor="end"
            defaultDate={moment().toDate()}
            localizer={localizer}
          />
        </div>
      </div>
    </Container>
  );
}
export default App;
