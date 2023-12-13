import React, { useState, useEffect } from "react";
import { TaskListProps, Story } from "../types/type";
import { Box, Typography } from "@mui/material";
import { TaskStatusList } from "../seed-data/seed-data";
import DropTarget from "./DropTarget";
import DragTasks from "./DragTasks";

const TaskList = ({ tasks, setTasks }: TaskListProps) => {
  console.log(tasks);

  const handleDrop = (id: string, droppedStatus: string | null) => {
    console.log("Dropped story with ID:", id);
    console.log("Dropped status:", droppedStatus);
    // Implement the logic to update the tasks or handle the drop event
  };

  return (
    <>
      <Box paddingY={2}>
        {tasks.map((story) => (
          <Box key={story._id}>
            <Typography sx={{ backgroundColor: "violet" }}>
              {story.title}
            </Typography>
            <DropTarget
              onDrop={({ id, droppedStatus }) => handleDrop(id, droppedStatus)}
            >
              <Box display="flex">
                {TaskStatusList.map((status) => (
                  <Box key={status.status} sx={{ flex: 1 }}>
                    {/* {story.tasks
                      .filter((task) => task.status === status.status)
                      .map((task) => (
                        <DragTasks tasks={task} />
                      ))} */}
                  </Box>
                ))}
              </Box>
            </DropTarget>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default TaskList;
