import {
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import * as yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Project, ProjectProps } from "../types/type";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "../hooks/CustomRQHooks";



const validationSchema = yup.object().shape({
  projectName: yup.string().required("projectName is required"),
  description: yup.string().required("description is required"),
  startDate: yup.date().required("Start Date is required"),
  endDate: yup.date().required("End Date is required"),
  duration: yup.string().required("duration is required"),
});

const ProjectDrawer = ({
  projectDrawerOpen,
  projectDetail,
  onDrawerClose,
}: ProjectProps) => {

  const createProjectMutation = useCreateProjectMutation();
  const updateProjectMutation = useUpdateProjectMutation();
  const {
    control,
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm<Project>({
    resolver: yupResolver(validationSchema) as any,
    mode: "all",
  });

  console.log(projectDetail);
  

  useEffect(() => {
    setValue("projectName", projectDetail?.projectName || "");
    setValue("description", projectDetail?.description || "");
    setValue("startDate", projectDetail?.startDate || null);
    setValue("endDate", projectDetail?.endDate || null);
    setValue("duration", projectDetail?.duration || "");
  }, [projectDetail]);

  const onSubmit: SubmitHandler<Project> = async (formData) => {
   

    if (projectDetail) {
      if (projectDetail._id) {
        await updateProjectMutation.mutateAsync(
          {
            ...formData,
            _id: projectDetail._id,
          },
          {
            onError: (error) => console.log(error.message),
          }
        );
      } else {
        await createProjectMutation.mutateAsync(formData, {
          onError: (error) => console.log(error.message),
        });
      }
    }
    onDrawerClose();
  };


  return (
    <>
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
              {projectDetail?._id ? "Edit Data" : "Add Project"}
            </Typography>
            <Box onClick={onDrawerClose}>
              <IconButton>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>

          <Container>
            {projectDetail && (
              <Box display={"flex"} flexWrap={"wrap"} rowGap={2}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box display={"flex"} flexWrap={"wrap"} rowGap={2}>
                    <Box padding={1}>
                      <Controller
                        name="projectName"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            label="Project Name"
                            {...field}
                            error={!!errors.projectName}
                            helperText={errors.projectName?.message}
                            {...register("projectName", {
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
                    <Box padding={1}>
                      <Controller
                        name="startDate"
                        control={control}
                        rules={{ required: "Start Date is required" }}
                        render={({ field }) => {
                          const dateValue = field.value
                            ? dayjs(field.value)
                            : null;
                          return (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                {...field}
                                label="Start Date"
                                value={dateValue}
                                onChange={(date: Dayjs | null) => {
                                  const newDateValue = date
                                    ? date.toDate()
                                    : null;
                                  field.onChange(newDateValue);
                                }}
                              />
                            </LocalizationProvider>
                          );
                        }}
                      />
                    </Box>
                    <Box padding={1}>
                      <Controller
                        name="endDate"
                        control={control}
                        rules={{ required: "End Date is required" }}
                        render={({ field }) => {
                          const dateValue = field.value
                            ? dayjs(field.value)
                            : null;
                          return (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                {...field}
                                label="End Date"
                                value={dateValue}
                                onChange={(date: Dayjs | null) => {
                                  const newDateValue = date
                                    ? date.toDate()
                                    : null;
                                  field.onChange(newDateValue);
                                }}
                              />
                            </LocalizationProvider>
                          );
                        }}
                      />
                    </Box>
                    <Box
                     position={"absolute"}
                     bottom={7}
                     right={10}
                     display={"flex"}
                     columnGap={2}
                    >
                      <Button variant="contained" type="submit" autoFocus color="primary">
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
};

export default ProjectDrawer;
