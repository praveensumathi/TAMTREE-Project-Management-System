import {
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import * as yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Project, ProjectProps, Storie } from "../types/type";
import Delete from "@mui/icons-material/Delete";

const validationSchema = yup.object().shape({
  title: yup.string().required("title is required"),
  description: yup.string().required("description is required"),
  assignedTo: yup.string().required("assignedto is required"),
  status: yup.string().required("status is required"),
  stories: yup.array().of(
    yup.object().shape({
      name: yup.string().required(),
      description: yup.string().required(),
    })
  ),
});

const ProjectDrawer = ({
  projectDrawerOpen,
  selectedProject,
  onDrawerClose,
  handleProjectUpdate
}: ProjectProps) => {
  const {
    control,
    handleSubmit,
    setValue,
   
    register,
    formState: { errors }
  } = useForm<Project>({
    resolver: yupResolver(validationSchema) as any,
    mode: "all"
  });

  const initialStories: Storie[] = selectedProject?.stories || [];

  const [stories, setStories] = useState<Storie[]>(initialStories);
  const [storyIndices, setStoryIndices] = useState<number[]>(initialStories.map((_, index) => index));


  useEffect(() => {
 
      setValue("title", selectedProject?.title ||"");
      setValue("description", selectedProject?.description||"");
      setValue("assignedTo", selectedProject?.assignedTo||"");
      setValue("status", selectedProject?.status||"");
      if (selectedProject && selectedProject.stories) {
        selectedProject.stories.forEach((story, index) => {
          setValue(`stories.${index}.name`, story?.name || "");
          setValue(`stories.${index}.description`, story?.description || "");
        });
      }
  }, [selectedProject]);

  const onSubmit: SubmitHandler<Project> = async (formData) => {
    const updatedProject: Project =({ ...selectedProject, ...formData,stories });
    handleProjectUpdate(updatedProject);
    onDrawerClose();
  };

  const handleAddStory = () => {
    const newStories = [...stories, { name: "", description: "" }];
    const newIndices = [...storyIndices, stories.length];
    setStories(newStories);
    setStoryIndices(newIndices);
  };

  const handleRemoveStory = (indexToRemove: number) => {
    const updatedStories = stories.filter((_, index) => index !== indexToRemove);
    const updatedIndices = storyIndices.filter((index) => index !== indexToRemove);

    setStories(updatedStories);
    setStoryIndices(updatedIndices);
  };


  

  return (
    <>
     {selectedProject && (
          <Drawer
            sx={{ position: "relative" }}
            anchor="right"
            open={projectDrawerOpen}
            PaperProps={{
              sx: {
                width: "500px",
                height: "100%",
              },
            }}
            onClose={onDrawerClose}
          >
            <Box padding={2} display={"flex"} justifyContent={"space-between"}>
              <Typography variant="h5">
                {selectedProject._id ? "Edit Data" : "Add Project"}
              </Typography>
              <Box onClick={onDrawerClose}>
                <CloseIcon />
              </Box>
            </Box>
            
            <Container>
              {selectedProject&& (<Box display={"flex"} flexWrap={"wrap"} rowGap={2} >
                <form
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Box display={"flex"} flexWrap={"wrap"} rowGap={2}>
                  <Box padding={1} >
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="title"
                        {...field}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                        {...register("title", {
                          required: true,
                        })}
                      />
                    )}
                  />
                  </Box>
                  <Box padding={1}>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="description"
                        {...field}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        {...register("description", {
                          required: true,
                        })}
                      />
                    )}
                  />
                  </Box>
                  <Box padding={1} >
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="status"
                        {...field}
                        error={!!errors.status}
                        helperText={errors.status?.message}
                        {...register("status", {
                          required: true,
                        })}
                      />
                    )}
                  />
                  </Box>
                  <Box padding={1} >
                  <Controller
                    name="assignedTo"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="assigned To"
                        {...field}
                        error={!!errors.assignedTo}
                        helperText={errors.assignedTo?.message}
                        {...register("assignedTo", {
                          required: true,
                        })}
                      />
                    )}
                  />
                  </Box>
                  <Box display={"flex"} gap={30} marginBottom={"10px"}>

                  <Typography variant="h5" >Stories</Typography>
                  <Button variant="contained" onClick={handleAddStory}>Add Story</Button>

                  </Box>
                  <Box>
                    {storyIndices.map((index) => (
                      <Box key={index} display={"flex"} gap={2}justifyContent={"space-between"} alignItems={"center"} marginBottom={"10px"}>
                        <Box>
                        <Controller
                    name={`stories.${index}.name`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="name"
                        {...field}
                        error={!!errors.stories?.[index]?.name}
                        helperText={errors.stories?.[index]?.name?.message}
                        {...register(`stories.${index}.name`, {
                          required: true,
                        })}
                      />
                    )}
                  />
                        </Box>
                        <Box>
                        <Controller
                    name={`stories.${index}.description`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="description"
                        {...field}
                        error={!!errors.stories?.[index]?.description}
                        helperText={errors.stories?.[index]?.description?.message}
                        {...register(`stories.${index}.description`, {
                          required: true,
                        })}
                      />
                    )}
                  />
                        </Box>
                        <IconButton
                          aria-label="settings"
                          onClick={() => handleRemoveStory(index)}
                        >
                          <Delete />
                        </IconButton>
                        
                      </Box>
                      
                    ))}
                    
                  </Box>
                  <Box display="flex"
                    justifyContent="flex-end"
                    gap={1}
                    marginTop={2} >
                    
                    <Button
                      variant="contained"
                      type="submit"
                      color="primary"
                      
                    >
                      Save
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={onDrawerClose}
                    >
                      cancel
                    </Button>
                    
                  </Box>
                  </Box>
                </form>
              </Box>
              )}
              
            </Container>
          </Drawer>
        )}
     
    </>
  );
}

export default ProjectDrawer;
