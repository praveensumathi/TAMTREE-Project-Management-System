import { Box, Button, IconButton, TextField, Theme } from "@mui/material";
import { Column, Id, Task } from "../../types/type";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { CSS } from "@dnd-kit/utilities";

import DeleteIcon from "@mui/icons-material/Delete";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import Taskcard from "./Taskcard";

interface Containerprops {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;


  createTask:(columnId:Id) => void;
  updateTask:(id: Id, content: string) => void;
  deleteTask:(id:Id) => void;
  tasks:Task[];
  

}

function ColumnContainer(props: Containerprops) {
  const { column, deleteColumn, updateColumn ,createTask,tasks,deleteTask,updateTask} = props;
  const tasksInColumn = tasks.filter((task) => task.columnId === column.id)
  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() =>{
    return tasks.map(task => task.id)
  },[tasks])
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = (_theme?: Theme) => ({
    transition,
    transform: CSS.Transform.toString(transform),
  });

  if (isDragging) {
    return (
      <Box
        ref={setNodeRef}
        sx={(theme) => ({
          ...style(theme),
          borderRadius: 4,
          opacity: 40,
          border: "2px",
          width: "300px",
          height: "500px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "Background",
        })}
      ></Box>
    );
  }

  return (
    <Box
      ref={setNodeRef}
      sx={(theme) => ({
        ...style(theme),
        borderRadius: 4,
        border: "2px",
        width: "300px",
        height: "450px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "bisque",
        marginBottom:4
      })}
    >
      <Box
        onClick={() => {
          setEditMode(true);
        }}
        {...attributes}
        {...listeners}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "antiquewhite",
          color: "text.primary",
          height: "60px",
          cursor: "grab",
          borderRadius: "4px",
          borderBottomLeftRadius: 0,
          padding: "12px",
          fontWeight: "bold",
          border: "4px solid columnBackgroundColor",
        }}
      >
        <Box display={"flex"} gap={2} fontSize={"20px"} alignItems={"center"} justifyContent={"center"}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "aliceblue",
              fontSize: "20px",
              paddingX: 2,
              paddingY: 1,
              borderRadius: "50%",
            }}
          >
            {tasksInColumn.length}
          </Box>
          {!editMode && column.title}
          {editMode && (
            <TextField
              value={column.title}
              variant="outlined"
              sx={{fontSize:5}}
              className="MuiInputBase-root MuiOutlinedInput-root bg-black focus-within:MuiOutlinedInput-focus"
              InputProps={{
                classes: {
                  notchedOutline: "border-rose-500",
                  input: "px-2",
                },
              }}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
        </Box>
        <IconButton
          onClick={() => {
            deleteColumn(column.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
      <Box sx={{display:"flex",flexGrow:2,flexDirection:"column",gap:4,padding:2,overflowX:"hidden",overflowY:"auto"}}>
        <SortableContext items={tasksIds}>
        {tasks.map((task) =>(
        <Taskcard key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask}/>
         ))}
         </SortableContext>
      </Box>
      <Box padding={1}>
        <Button variant="contained"
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            padding:1,
          }}
          onClick={() => {
            createTask (column.id)
          }}
        >
          <ControlPointIcon />
          Add task
        </Button>
      </Box>
    </Box>
  );
}

export default ColumnContainer;
