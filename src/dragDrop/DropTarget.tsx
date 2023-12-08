import React, { useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { DraggableItem, DropTargetProps, Task } from "../types/type";
import { Box } from "@mui/material";

const DropTarget = ({
  onDrop,
  status,
  children,
  setTask,
  handleDropCallback,
  storyId,
}: DropTargetProps) => {
  // console.log("status", status);
  const monitor = useRef<any>();
  const [isDropped, setIsDropped] = useState(false);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "task",
      drop: (item: DraggableItem) =>
        addItemToSection(item.id, status || "", storyId),
      collect: (m) => {
        monitor.current = m;
        return {
          isOver: !!m.isOver(),
          canDrop: !!m.canDrop(),
        };
      },
    }),
    [status, setTask, handleDropCallback, storyId]
  );

  // DropTarget.jsx

  // ...

  const addItemToSection = (id: string, status: string, storyId: string) => {
    const finalStatus = status || null;
    console.log(storyId);

    setTask((prev) => {
      const updatedTasks = prev.map((t) => {
        if (t._id === id) {
          // Check storyId
          return {
            ...t,
            status: finalStatus as
              | "DEPLOYED"
              | "IN PROGRESS"
              | "DONE"
              | "TO DO",
          };
        }
        return t;
      });

      handleDropCallback(id, finalStatus, updatedTasks);
      setIsDropped(true);
      return updatedTasks;
    });

    console.log("Dropped:", id);
    alert(`Dropped: ${status}`);
  };

  // ...

  useEffect(() => {
    console.log("isOver:", isOver);
    console.log("canDrop:", monitor.current?.canDrop());
    if (isDropped) {
      setIsDropped(false);
    }
  }, [isOver, status, isDropped]);

  return (
    <Box ref={drop}>
      {children}
      {isOver && <div>Dropping on {status} status</div>}
    </Box>
  );
};

export default DropTarget;
