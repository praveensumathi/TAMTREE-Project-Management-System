import { Box, Divider, IconButton, TextField, Theme, Typography } from "@mui/material";
import { Id, Task } from "../../types/type";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, title: string, description: string) => void;
}

function Taskcard({ task, deleteTask, updateTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = (_theme?: Theme) => ({
    transition,
    transform: CSS.Transform.toString(transform),
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditedDescription(e.target.value);
  };

  const handleTitleClick = () => {
    setEditMode(true);
  };

  const handleDescriptionClick = () => {
    setEditMode(true);
  };

  const handleUpdateTask = () => {
    updateTask(task.id, editedTitle, editedDescription);
    setEditMode(false);
  };

  const handleDeleteTask = () => {
    deleteTask(task.id);
  };

//   const toggleEditMode = () => {
//     setEditMode((prev) => !prev);
//     setMouseIsOver(false);
//   };

  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      sx={{
        backgroundColor: isDragging ? "skyblue" : "darkseagreen",
        padding: 2.5,
        height: "100px",
        minHeight: "100px",
        alignItems: "center",
        display: "flex",
        textAlign: "left",
        borderRadius: "8px",
        position: "relative",
        ringWidth: isDragging ? 2 : 0,
        ringColor: "rose.500",
        ringOffset: 2,
        cursor: "grab",
        ...style(), // Apply the style function
        "&:hover": {
          ringWidth: 2,
          ringColor: "rose.500",
          ringOffset: 2,
          cursor: "grab",
        },
      }}
    >
      {editMode ? (
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} >
          <TextField
            multiline
            fullWidth
            variant="outlined"
            value={editedTitle}
            onClick={handleTitleClick}
            onChange={handleTitleChange}
            autoFocus
            placeholder="Task title"
            onBlur={handleUpdateTask}
          />
          <TextField
            multiline
            fullWidth
            variant="outlined"
            rows={4}
            value={editedDescription}
            onClick={handleDescriptionClick}
            onChange={handleDescriptionChange}
            placeholder="Task description"
            onBlur={handleUpdateTask}
          />
        </Box>
      ) : (
        <Box >
        <Typography contentEditable={true} variant="body1" component="p" sx={{ width: "100%" }}>
          {task.title} 
        </Typography>
        <Divider/>
        <Typography contentEditable={true} variant="body1" component="p" sx={{ width: "100%" }}>
          {task.description}
          
        </Typography>
       
   </Box>
      )}

      {!editMode && mouseIsOver && (
        <IconButton
          onClick={handleDeleteTask}
          sx={{
            position: "absolute",
            right: 3,
            top: 40,
            transform: "translateY(-50%)",
            backgroundColor: "antiquewhite",
            padding: "5px",
            opacity: 0.6,
            "&:hover": {
              backgroundColor: "blue",
              opacity: 0.8,
            },
          }}
        >
          <DeleteIcon />
        </IconButton>
      )}
    </Box>
  );
}

export default Taskcard;
