import { Box, Button } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useMemo, useState } from "react";

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import ColumnContainer from "./ColumnContainer";
import { createPortal } from "react-dom";
import Taskcard from "./Taskcard";
import { Column, Id, Task } from "../../types/type";

function Board() {

  const initialColumns = [
    { id: 1, title: 'To do' },
    { id: 2, title: 'In progress' },
    { id: 3, title: 'Completed' },
    { id: 4, title: 'Deployed' },
  ]
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  console.log(columns);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [tasks, setTasks] = useState<Task[]>([])

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState< Task | null>(null);



  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  return (
    <Box
      margin={"auto"}
      display={"flex"}
      width={"full"}
      alignItems={"center"}
      sx={{ overflowX: "auto", overflowY: "hidden", paddingX: "40px" }}
    >
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <Box margin={"auto"} sx={{ display: "flex", gap: 4 }}>
          <Box sx={{ display: "flex", gap: 4 }}>
            <SortableContext items={columnsId}>
              {columns.map((vcolumn) => (
                <ColumnContainer
                  key={vcolumn.id}
                  column={vcolumn}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  updateTask={updateTask} 
                  deleteTask={deleteTask}
                  tasks={tasks.filter(task => task.columnId === vcolumn.id)} />
              ))}
            </SortableContext>
          </Box>
          <Button
            onClick={() => {
              createColumn();
            }}
            sx={{
              height: "40px",
              width: "150px",
              cursor: "pointer",
              border: 1,
              borderColor: "Background",
              padding: 1,
              backgroundColor: "skyblue",
              display: "flex",
              alignItems:"center",
              gap: 1,
            }}
          >
            <ControlPointIcon />
            Add Column
          </Button>
        </Box>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                updateTask={updateTask}
                deleteTask={deleteTask} tasks = {
                  tasks.filter(task=>task.columnId=== activeColumn.id)
                }
                />
            )}
            {
                  activeTask && <Taskcard task={activeTask}  updateTask={updateTask}
                  deleteTask={deleteTask}/>
                }
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </Box>
  );

 

function createTask(columnId:Id,){
  const newTask:Task = {
    id:generateId(),
    columnId,
    title : `Task ${tasks.length + 1}`,
    description:"description"

  };
  setTasks([...tasks,newTask])
}

function updateTask(id:Id,content:string){
  const newTasks = tasks.map(task=> {
    if (task.id !== id) return task;
    return {...task,content}
  });
  setTasks(newTasks);
}


function deleteTask(id:Id){
  const newTasks = tasks.filter((task) =>task.id !== id);
  setTasks(newTasks);
}


  function createColumn() {
    const newId = generateId();

    const columnToAdd: Column = {
      id: newId,
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd]);
  }

  function deleteColumn(id: Id) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);

    const newTasks = tasks.filter(t =>t.columnId !== id);
    setTasks(newTasks)
  }

  function updateColumn (id:Id, title:string) {
    const newColumns = columns.map((col)=> {
      if (col.id !== id ) return col;
      return {
        ...col,title
      };
    
    } );
    setColumns(newColumns);
  }

  function onDragStart(event:DragStartEvent) {
    if (
      event.active &&
      event.active.data &&
      event.active.data.current &&
      event.active.data.current.type === "Column"
    ) {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (
      event.active &&
      event.active.data &&
      event.active.data.current &&
      event.active.data.current.type === "Task"
    ) {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeId
      );

      const overColumnIndex = columns.findIndex(
        (col) => col.id === overId
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver (event:DragOverEvent) {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask)return ;

    //dropping a task over another task

if (isActiveATask&& isOverATask) {
  setTasks(tasks => {
    const activeIndex = tasks.findIndex(t=>t.id ===activeId);
    const overIndex = tasks.findIndex(t=>t.id ===overId);

   
      tasks[activeIndex].columnId = tasks[overIndex].columnId
    

    return arrayMove(tasks,activeIndex,overIndex);
  });
}

const isOverAColumn = over.data.current?.type === "Column";
    // dropping a task over a column 

    if (isActiveATask && isOverAColumn) {
      setTasks(tasks => {
        const activeIndex = tasks.findIndex(t=>t.id ===activeId);
          tasks[activeIndex].columnId = overId;
        return arrayMove(tasks,activeIndex,activeIndex);
      });
    }
  }
}

function generateId() {
  return Math.floor(Math.random() * 10001)
 }

export default Board;
