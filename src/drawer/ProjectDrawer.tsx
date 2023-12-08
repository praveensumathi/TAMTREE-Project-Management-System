import { useEffect } from "react";
import { SubmitHandler, useForm, useFormState } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { useState } from "react";
import {
  Box,
  Container,
  Divider,
  Drawer,
  TextField,
  Typography,
} from "@mui/material";
import { Project, ProjectProps } from "../types/type";
import Button from "@mui/material/Button";

import CloseIcon from "@mui/icons-material/Close";

const validationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  assignedTo: yup.string().required(),
  status: yup.string().required(),
  stories: yup.array().of(
    yup.object().shape({
      name: yup.string().required(),
      description: yup.string().required(),
      // tasks: yup.array().of(yup.object().shape({
      //   tname:yup.string()
      // }))
    })
  ),
});

function ProjectDrawer({
  projectDrawerOpen,
  projectDetail,
  onDrawerClose,
  onSaveClick,
}: ProjectProps) {
  const [myProjectDetail, setMyProjectDetail] =
    useState<Project>(projectDetail);

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
      stories: [],
    } as Project,
  });

  const handleDrawerCloseClick = () => {
    onDrawerClose();
  };

  useEffect(() => {
    if (myProjectDetail._id) {
      setValue("title", myProjectDetail.title);
      setValue("description", myProjectDetail.description);
      setValue("assignedTo", myProjectDetail.assignedTo);
      setValue("status", myProjectDetail.status);
      if (myProjectDetail.stories) {
        myProjectDetail.stories.forEach((story, index) => {
          setValue(`stories.${index}.name`, story.name);
          setValue(`stories.${index}.description`, story.description);
        });
      }
    }
  }, [myProjectDetail, setValue]);

  const submitForm = (formData: Project) => {
    console.log(formData);
    onSaveClick(formData);
  };

  return (
    <>
      <Box>
        {myProjectDetail && (
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
                {myProjectDetail._id != "" ? "  Edit Data" : "Add Project"}
              </Typography>
              <Box onClick={handleDrawerCloseClick}>
                <CloseIcon />
              </Box>
            </Box>
            <Divider />
            <Container>
              <Box py={3}>
                <form
                  onSubmit={handleSubmit((formdata) => submitForm(formdata))}
                >
                  <TextField
                    fullWidth
                    label="Title"
                    {...register("title", { required: true })}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    sx={{ marginBottom: "10px" }}
                  />
                  <TextField
                    fullWidth
                    label="description"
                    {...register("description", { required: true })}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    sx={{ marginBottom: "10px" }}
                  />
                  <TextField
                    fullWidth
                    label="assignedTo"
                    {...register("assignedTo", { required: true })}
                    error={!!errors.assignedTo}
                    helperText={errors.assignedTo?.message}
                    sx={{ marginBottom: "10px" }}
                  />
                  <TextField
                    fullWidth
                    label="status"
                    {...register("status", { required: true })}
                    error={!!errors.status}
                    helperText={errors.status?.message}
                    sx={{ marginBottom: "10px" }}
                  />
                  <Typography variant="h5">stories</Typography>
                  <Box>
                    {myProjectDetail.stories?.map((story, index) => (
                      <Box key={index} display={"flex"} alignItems={"center"}>
                        <TextField
                          fullWidth
                          label="name"
                          {...register(`stories.${index}.name`, {
                            required: true,
                          })}
                          error={!!errors.stories?.[index]?.name}
                          helperText={errors.stories?.[index]?.name?.message}
                          sx={{ marginRight: "10px", marginBottom: "10px" }}
                        />
                        <TextField
                          fullWidth
                          label="description"
                          {...register(`stories.${index}.description`, {
                            required: true,
                          })}
                          error={!!errors.stories?.[index]?.description}
                          helperText={
                            errors.stories?.[index]?.description?.message
                          }
                        />
                        <IconButton
                          aria-label="settings"
                          // onClick={() => {
                          //   handleStoryDeleteClick(story);
                          // }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                  <Box position={"absolute"} bottom={0} right={0} padding={2}>
                    <Button
                      variant="contained"
                      type="submit"
                      color="primary"
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
