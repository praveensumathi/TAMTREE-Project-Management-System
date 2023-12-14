import  { useEffect, } from "react";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Drawer, Typography } from "@mui/material";
import { ITaskDrawerProps } from "../../types/type";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "../../hooks/CustomRQHooks";
import { ProjectTask } from "../../types/boardTypes";

const taskValidationSchema = yup.object<ProjectTask>().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  duration: yup.string().required(),
  status: yup.number().required(),
});

function AddTaskDrawer({
  openDrawer,
  onClose,
  selectedTask,
  SelectedStoryId,
  onSuccessSave,
}: ITaskDrawerProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(taskValidationSchema),
    mode: "all",
    defaultValues: {
      title: "",
      description: "",
      duration: "",
      status: 1,
    } as ProjectTask,
  });
  const createTaskMutation = useCreateTaskMutation();

  const updateTaskMutation = useUpdateTaskMutation();
  const handleCloseClick = () => {
    onClose();
  };
  const handleCancel = () => {
    onClose();
  };

  const submitForm = async (formData: ProjectTask) => {
    try {
      if (selectedTask?._id) {
        await updateTaskMutation.mutateAsync(
          { ...formData, _id: selectedTask._id },
          {
            onError: (error) => console.log(error.message),
            onSuccess: () => {
              onSuccessSave();
              reset();
            },
          }
        );
        onClose();
      } else {
        formData.story = SelectedStoryId;
        await createTaskMutation.mutateAsync(formData, {
          onError: (error) => console.log(error.message),
          onSuccess: () => {
            onSuccessSave();
            reset();
          },
        });
      }

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedTask?._id) {
      setValue("title", selectedTask.title);
      setValue("description", selectedTask.description);
      setValue("duration", selectedTask.duration);
      setValue("status", selectedTask.status);

      // setValue("assignedTo", selectedTask.assignedTo);
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
                label="tname"
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
