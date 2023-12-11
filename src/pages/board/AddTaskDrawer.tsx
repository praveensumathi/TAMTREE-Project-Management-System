import React, { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Drawer, Typography } from "@mui/material";
import { ITaskDrawerProps, Task } from "../../types/type";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const taskValidationSchema = yup.object<Task>().shape({
  _id: yup.string(),
  tname: yup.string().required(),
  description: yup.string().required(),
  duration: yup.string().required(),
  status: yup.number().required(),
});

function AddTaskDrawer({
  openDrawer,
  onClose,
  onNewSave,
  selectedTask,
  SelectedStoryId,
}: ITaskDrawerProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(taskValidationSchema),
    mode: "all",
    defaultValues: {
      tname: "About header section",
      description: "About header section description",
      duration: "1 month",
      status: 1,
    } as Task,
  });

  const handleCloseClick = () => {
    onClose();
  };
  const handleCancel = () => {
    onClose();
  };
  const submitForm = (formdata: any) => {
    onNewSave(formdata, SelectedStoryId);
  };
  useEffect(() => {
    if (selectedTask?._id) {
      setValue("_id", selectedTask?._id);
      setValue("tname", selectedTask.tname);
      setValue("description", selectedTask.description);
      setValue("duration", selectedTask.duration);
      setValue("status", selectedTask.status);
    }
  }, [selectedTask]);

  return (
    <>
      <Box>
        <Drawer
          sx={{ position: "relative" }}
          anchor="right"
          open={openDrawer}
          PaperProps={{
            sx: {
              width: "300px",
              padding: "20px",
            },
          }}
        >
          <Box
            padding={2}
            color={"purple"}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Typography variant="h5">
              {selectedTask?._id != "" ? "Edit Task " : "Add Task"}
            </Typography>
            <Box onClick={handleCloseClick}>
              <CloseIcon />
            </Box>
          </Box>

          <Divider />
          <Box py={3}>
            <form onSubmit={handleSubmit((formdata) => submitForm(formdata))}>
              <TextField
                fullWidth
                label="id"
                {...register("_id", { required: true })}
                error={!!errors._id}
                helperText={errors._id?.message}
                sx={{ marginBottom: "10px" }}
              />
              <TextField
                fullWidth
                label="tname"
                {...register("tname", { required: true })}
                error={!!errors.tname}
                helperText={errors.tname?.message}
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
                label="duration"
                {...register("duration", { required: true })}
                error={!!errors.duration}
                helperText={errors.duration?.message}
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

              <Box position={"absolute"} bottom={0} right={0} padding={3}>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  style={{ margin: "10px" }}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  onClick={handleCancel}
                >
                  cancel
                </Button>
              </Box>
            </form>
          </Box>
        </Drawer>
      </Box>
    </>
  );
}

export default AddTaskDrawer;
