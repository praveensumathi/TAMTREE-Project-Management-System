import { Box, Typography } from "@mui/material";
import { useDrag, DragPreviewImage } from "react-dnd";
import { DragTaskProps, Task } from "../types/type";
import DropTarget from "./DropTarget";

const DragTasks = ({ tasks, setTask, storyId }: DragTaskProps) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: "task",
    item: { id: tasks._id, storyId: storyId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleDrop = (id: string, droppedStatus: string | null) => {
    setTask((prevTasks: Task[]) => {
      const updatedTasks = prevTasks.map((t) => {
        if (t._id === id) {
          return {
            ...t,
            status: droppedStatus as
              | "DEPLOYED"
              | "IN PROGRESS"
              | "DONE"
              | "TO DO",
          };
        }
        return t;
      });

      console.log("Updated tasks:", updatedTasks);
      return updatedTasks;
    });
  };

  const drop = (id: string, droppedStatus: string | null) => {
    console.log("Dropped task with ID:", id);
    console.log("Dropped status:", droppedStatus);
    handleDrop(id, droppedStatus);
  };

  return (
    <>
      <DragPreviewImage connect={preview} src="/custom-drag-preview.png" />
      <DropTarget
        status={tasks.status}
        onDrop={(droppedStatus) => drop(tasks._id, droppedStatus)}
        setTask={setTask}
        handleDropCallback={handleDrop}
        storyId={storyId}
      >
        <Box
          ref={drag}
          sx={{
            backgroundColor: "lightblue",
            borderRadius: "8px",
            padding: "5px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            margin: "5px",
            opacity: isDragging ? 0.5 : 1,
            cursor: "pointer",
          }}
        >
          <Typography>{tasks.title}</Typography>
          <Typography>{tasks.description}</Typography>
        </Box>
      </DropTarget>
    </>
  );
};

export default DragTasks;
