import { useEffect, useState } from "react";
import { Project, ProjectDrawerProps, Story } from "../types/type";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import ProjectDialog from "../pageDialogs/Projects";

export const ProjectEditDrawer = ({
  open,
  project,
  onClose,
}: ProjectDrawerProps) => {
  const { control, handleSubmit, setValue } = useForm<Project>();
  const [projects, setProjects] = useState<Project[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [deleteStoryIndex, setDeleteStoryIndex] = useState<number | null>(null);
  const [storyToDelete, setStoryToDelete] = useState<Story | null>(null);

  useEffect(() => {
    if (project) {
      setValue("title", project.title);
      setValue("description", project.description);
      setValue("startDate", project.startDate ?? "");
      project.stories?.map((story, index) => {
        setValue(`stories.${index}.title`, story.title);
        setValue(`stories.${index}.description`, story.description);
      });
    }
  }, [project, setValue]);

  const onSubmit: SubmitHandler<Project> = (data) => {
    console.log(data);
  };

  const handleDeleteProject = (index: number | null) => {
    if (
      index !== null &&
      project &&
      project.stories &&
      project.stories[index]
    ) {
      const storyToDelete = project.stories[index];
      setDeleteStoryIndex(index);
      setStoryToDelete(storyToDelete);
      setDialogOpen(true);
    }
  };
  const deleteStory = (projectId: string, storyId: string) => {
    setProjects((prevProjects) => {
      const updatedProjects = prevProjects.map((project) => {
        3;
        if (project._id === projectId) {
          const updatedStories = project.stories.filter(
            (story) => story._id !== storyId
          );
          console.log(project._id);

          return {
            ...project,
            stories: updatedStories,
          };
        }
        return project;
      });
      return updatedProjects;
    });
  };

  return (
    <>
      {project && (
        <Drawer
          sx={{ position: "relative" }}
          anchor="right"
          open={open}
          onClose={onClose}
          PaperProps={{
            sx: {
              width: "500px",
              height: "100%",
            },
          }}
        >
          <Box p={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom={2}
            >
              <Typography variant="h5">Project Details</Typography>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box display={"flex"} rowGap={1} flexDirection={"column"}>
                <Box>
                  <Controller
                    name="title"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        label="Title"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        {...field}
                      />
                    )}
                  />
                </Box>
                <Box>
                  <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        label="Description"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        {...field}
                      />
                    )}
                  />
                </Box>
                <Box>
                  <Controller
                    name="startDate"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label="Start Date"
                        type="date"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={field.value.toISOString().split("T")[0]}
                        onChange={(e) => {
                          const dateValue = new Date(e.target.value);
                          field.onChange(dateValue);
                          setValue("startDate", dateValue);
                        }}
                      />
                    )}
                  />
                </Box>
                <Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    marginBottom={2}
                  >
                    <Typography variant="h6">STORIES</Typography>
                    <Button variant="contained">+ Add Stories</Button>
                  </Box>
                  <Box>
                    <Box>
                      {project &&
                        project.stories?.map((story, index) => (
                          <Box display={"flex"} columnGap={2}>
                            <Controller
                              key={index}
                              name={`stories.${index}.title`}
                              control={control}
                              defaultValue={story.title}
                              render={({ field }) => (
                                <TextField
                                  label={`Title`}
                                  fullWidth
                                  margin="normal"
                                  variant="outlined"
                                  {...field}
                                />
                              )}
                            />
                            <Controller
                              key={index}
                              name={`stories.${index}.description`}
                              control={control}
                              defaultValue={story.description}
                              render={({ field }) => (
                                <TextField
                                  label={`Description`}
                                  fullWidth
                                  margin="normal"
                                  variant="outlined"
                                  {...field}
                                />
                              )}
                            />
                            <IconButton
                              onClick={() => handleDeleteProject(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        ))}
                    </Box>
                  </Box>
                </Box>
                <Box display={"flex"} gap={5} justifyContent={"flex-end"}>
                  <Button variant="outlined" color="primary" onClick={onClose}>
                    cancel
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Drawer>
      )}
      <ProjectDialog
        open={dialogOpen}
        project={project}
        story={storyToDelete}
        onClose={() => {
          setDialogOpen(false);
          setDeleteStoryIndex(null);
          setStoryToDelete(null);
        }}
        onDelete={() => {
          if (deleteStoryIndex !== null && project && storyToDelete) {
            deleteStory(project._id, storyToDelete._id);
            setDialogOpen(false);
          } else {
            setDialogOpen(false);
          }
        }}
      />
    </>
  );
};
