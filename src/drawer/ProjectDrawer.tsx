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
import { Project, ProjectProps, Story } from "../types/type";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import {
  useCreateProjectMutation,
  useGetStoryBasicInfo,
  useUpdateProjectMutation,
} from "../hooks/CustomRQHooks";
import Delete from "@mui/icons-material/Delete";

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

  const [stories, setStories] = useState<
    { title?: string; description?: string }[]
  >([]);
  const { data: StoriesData } = useGetStoryBasicInfo(projectDetail._id);

  const storiesBasiInfo = StoriesData || [];
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

  const handleAddStory = () => {
    setStories([...stories, { title: "", description: "" }]);
  };
  const handleDeleteStory = (index: number) => {
    const updatedStories = [...stories];
    updatedStories.splice(index, 1);
    setStories(updatedStories);
  };

  const handleStoryChange = (
    index: number,
    field: keyof { title?: string; description?: string },
    value: string
  ) => {
    const updatedStories = [...stories];
    updatedStories[index] = {
      ...updatedStories[index],
      [field]: value,
    };
    setStories(updatedStories);
  };

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
              width: "400px",
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
              <Box
                display={"flex"}
                flexWrap={"wrap"}
                rowGap={2}
                position={"relative"}
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box display={"flex"} flexWrap={"wrap"} rowGap={2}>
                    <TextField
                      fullWidth
                      label="Project Name"
                      error={!!errors.projectName}
                      helperText={errors.projectName?.message}
                      {...register("projectName")}
                    />
                    <TextField
                      fullWidth
                      label="description"
                      error={!!errors.description}
                      helperText={errors.description?.message}
                      {...register("description")}
                    />
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
                              sx={{ width: "100%" }}
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
                              sx={{ width: "100%" }}
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
                    <TextField
                      fullWidth
                      label="Duration"
                      error={!!errors.duration}
                      helperText={errors.duration?.message}
                      {...register("duration")}
                    />
                    <Box>
                      <Box
                        display={"flex"}
                        columnGap={22}
                        alignItems={"center"}
                      >
                        <Typography variant="h6">Stories</Typography>
                        <Button variant="contained" onClick={handleAddStory}>
                          Add Story
                        </Button>
                      </Box>
                      {stories.map((story, index) => (
                        <Box
                          key={index}
                          display="flex"
                          gap={2}
                          marginTop={1}
                        >
                          <TextField
                            label={`Title`}
                            value={story.title || ""}
                            onChange={(e) =>
                              handleStoryChange(index, "title", e.target.value)
                            }
                          />
                          <TextField
                            label={`Description`}
                            value={story.description || ""}
                            onChange={(e) =>
                              handleStoryChange(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                          />
                          <IconButton onClick={() => handleDeleteStory(index)}>
                            <Delete />
                          </IconButton>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                  <Box
                    display={"flex"}
                    marginTop={2}
                    gap={2}
                    justifyContent={"flex-end"}
                  >
                    <Button
                      variant="contained"
                      type="submit"
                      autoFocus
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
