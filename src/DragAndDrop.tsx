import React, { useState, useEffect } from "react";

const tasks = [
  {
    id: 1,
    status: "New Order",

    time: "8 hrs",
    days: "5 days left",
  },
  {
    id: 2,
    status: "In Progress",
    time: "6 hrs",
    days: "6 days left",
    done: false,
  },
  {
    id: 3,
    status: "Completed",
    time: "13 hrs",
    days: "4 days left",
  },
  {
    id: 4,
    status: "New Order",
    time: "22 hrs",
    days: "2 days left",
    done: true,
  },
  {
    id: 5,
    status: "In Progress",
    time: "2 hrs",
    days: "1 day left",
    newOrder: true,
    done: false,
  },
  {
    id: 6,
    status: "Completed",
    time: "20 hrs",
    days: "11 days left",
    done: true,
  },
  {
    id: 5,
    status: "Delivered",
    time: "2 hrs",
    days: "1 day left",
    done: false,
  },
];

function DragAndDrop() {
  const [taskList, setTaskList] = useState<any>();

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  const onDragStart = (evt: any) => {
    let element = evt.currentTarget;
    element.classList.add("dragged");
    evt.dataTransfer.setData("text/plain", evt.currentTarget.id);
    evt.dataTransfer.effectAllowed = "move";
  };

  const onDragEnd = (evt: any) => {
    evt.currentTarget.classList.remove("dragged");
  };

  const onDragEnter = (evt: any) => {
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.add("dragged-over");
    evt.dataTransfer.dropEffect = "move";
  };

  const onDragLeave = (evt: any) => {
    let currentTarget = evt.currentTarget;
    let newTarget = evt.relatedTarget;
    if (newTarget.parentNode === currentTarget || newTarget === currentTarget)
      return;
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.remove("dragged-over");
  };

  const onDragOver = (evt: any) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
  };

  const onDrop = (evt: any, value: any, status: any) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove("dragged-over");
    let data = evt.dataTransfer.getData("text/plain");
    let updated = taskList.map((task: any) => {
      if (task.id.toString() === data.toString()) {
        task.status = status;
      }
      return task;
    });
    setTaskList(updated);
  };

  const renderTasks = (taskArray: any, status: any) => {
    return (
      <div
        className={`${status.toLowerCase()} small-box`}
        onDragLeave={onDragLeave}
        onDragEnter={onDragEnter}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, false, status)}
      >
        <section className="drag_container">
          <div className="container">
            <div className="drag_column">
              <div className="drag_row">
                <h4>{status}</h4>
                <button style={{ width: "100%" }}>+</button>
                {taskArray?.map((task: any) => (
                  <div
                    className="card"
                    key={task.name}
                    id={task.id}
                    draggable
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                  >
                    <div className="card_right">
                      <div className="status">{task.status}</div>
                      <div className="days">{task.time}</div>
                      <div className="time">{task.days}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="container">
      {renderTasks(
        taskList?.filter((data: any) => data.status === "To Do"),
        "New Order"
      )}
      {renderTasks(
        taskList?.filter((data: any) => data.status === "In Progress"),
        "In Progress"
      )}
      {renderTasks(
        taskList?.filter((data: any) => data.status === "Completed"),
        "Completed"
      )}
    </div>
  );
}

export default DragAndDrop;
