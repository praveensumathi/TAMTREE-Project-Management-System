import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

import {
  Box,
  Container,
  Divider,
  Drawer,
  TextField,
  Typography,
} from "@mui/material";
import { Project } from "../../../types/type";
import Button from "@mui/material/Button";

import CloseIcon from "@mui/icons-material/Close";

interface ProjectProps {
  projectDrawerOpen: boolean;
  projectDetail: Project;
  onDrawerClose: () => void;
}

const validationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  assignedTo: yup.string().required(),
  status: yup.string().required(),
  stories: yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
  }),
});

function ProjectDrawer({
  projectDrawerOpen,
  projectDetail,
  onDrawerClose,
}: ProjectProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "all",
    defaultValues: {
      title: "sindhu kitchen",
      description: "food app",
      assignedTo: "praveen",
      status: "completed",
    },
  });

  const handleDrawerCloseClick = () => {
    onDrawerClose();
  };

  useEffect(() => {
    if (projectDetail._id) {
      setValue("title", projectDetail.title);
      setValue("description", projectDetail.description);
      setValue("assignedTo", projectDetail.assignedTo);
      setValue("status", projectDetail.status);
    }
  }, [projectDetail, setValue]);

  //   const submitForm = async (formData: Project) => {
  //     console.log(formData);
  //   };
  return (
    <>
      <Box>
        {projectDetail && (
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
          >
            <Box padding={2} display={"flex"} justifyContent={"space-between"}>
              <Typography variant="h5">
                {projectDetail._id != "" ? " Data" : "Add Project"}
              </Typography>
              <Box onClick={handleDrawerCloseClick}>
                <CloseIcon />
              </Box>
            </Box>
            <Divider />
            <Container>
              <Box py={3}>
                <form>
                  <TextField
                    fullWidth
                    label="Title"
                    {...register("title", { required: true })}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    style={{ marginBottom: "10px" }}
                  />
                  <TextField
                    fullWidth
                    label="description"
                    {...register("description", { required: true })}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    style={{ marginBottom: "10px" }}
                  />
                  <TextField
                    fullWidth
                    label="assignedTo"
                    {...register("assignedTo", { required: true })}
                    error={!!errors.assignedTo}
                    helperText={errors.assignedTo?.message}
                    style={{ marginBottom: "10px" }}
                  />
                  <TextField
                    fullWidth
                    label="status"
                    {...register("status", { required: true })}
                    error={!!errors.status}
                    helperText={errors.status?.message}
                    style={{ marginBottom: "10px" }}
                  />
                  <Typography variant="h5">stories</Typography>
                  <Box display={"flex"} justifyContent={"space-between"}>
                    <Box display={"flex"}>
                      <TextField
                        fullWidth
                        label="name"
                        {...register("stories.name", { required: true })}
                        error={!!errors.stories?.name}
                        helperText={errors.stories?.name?.message}
                        style={{ marginRight: "10px" }}
                      />
                      <TextField
                        fullWidth
                        label="description"
                        {...register("stories.description", { required: true })}
                        error={!!errors.stories?.description}
                        helperText={errors.stories?.description?.message}
                        style={{ marginBottom: "10px" }}
                      />
                    </Box>
                    <Box>
                      <IconButton aria-label="settings">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>

                  <Box position={"absolute"} bottom={0} right={0} padding={2}>
                    <Button
                      variant="contained"
                      type="submit"
                      color="primary"
                      //   onClick={handleSubmit((formData) => submitForm(formData))}
                      style={{ margin: "10px" }}
                    >
                      Save
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      type="submit"
                      onClick={handleDrawerCloseClick}
                    >
                      cancel
                    </Button>
                  </Box>
                </form>
              </Box>
            </Container>
          </Drawer>
        )}
      </Box>
    </>
  );
}

export default ProjectDrawer;
