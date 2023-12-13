import { useState, useEffect } from "react";
import { StoriesListProps, Story, Task } from "../types/type";
import { Box, Typography } from "@mui/material";
import { TaskStatusList } from "../seed-data/seed-data";
import DragTasks from "./DragTasks";
import Sections from "./Sections";

const StoriesList = ({ stories, setStories }: StoriesListProps) => {
  const [allTasks, setAllTasks] = useState<Task[]>([]);

  useEffect(() => {
    const tasksFromStories = stories.flatMap((story) => story.tasks);

    setAllTasks(tasksFromStories);
    setStories(
      (prevStories: Story[]) =>
        [...prevStories, { tasks: tasksFromStories }] as Story[]
    );
  }, [stories, setStories]);

  console.log(allTasks);

  return (
    <>
      <Sections />
      <Box paddingY={2}>
        {stories.map((story) => (
          <Box key={story._id}>
            <Typography sx={{ backgroundColor: "violet" }}>
              {story.title}
            </Typography>

            <Box display="flex">
              {TaskStatusList.map((status) => (
                <Box key={status.status} sx={{ flex: 1 }}>
                  {allTasks
                    .filter((task) => task.status === status.status)
                    .map((task) => (
                      <DragTasks
                        key={task._id}
                        tasks={task}
                        setTask={setAllTasks}
                        storyId={story._id}
                      />
                    ))}
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default StoriesList;
