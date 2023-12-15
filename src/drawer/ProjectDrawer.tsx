import {
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import * as yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {  ProjectProps } from "../types/type";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useGetStoryBasicInfo,
  useCreateStoryMutation,
  useUpdateStoryMutation,
  useDeleteStoryMutation,
} from '../hooks/CustomRQHooks';
import { Project, Story } from '../types/type';

type FormData = Project & {
  stories: Story[];
};

const ProjectDrawer: React.FC<ProjectProps> = ({
  projectDrawerOpen,
  projectDetail,
  onDrawerClose,
}: ProjectProps) => {
  const createProjectMutation = useCreateProjectMutation();
  const updateProjectMutation = useUpdateProjectMutation();
  const createStoryMutation = useCreateStoryMutation();
  const updateStoryMutation = useUpdateStoryMutation();
  const deleteStoryMutation = useDeleteStoryMutation();
  const { data: storiesData, refetch: refetchStories } = useGetStoryBasicInfo(
    projectDetail?._id || ""
  );

  const stories = (storiesData as Story[])?.filter(
    (story: Story) => story.project._id === projectDetail!._id
  ) || [];

  const validationSchema = yup.object().shape({
    projectName: yup.string().required('Project Name is required'),
    description: yup.string().required('Description is required'),
    startDate: yup.date().required('Start Date is required'),
    endDate: yup.date().required('End Date is required'),
    duration: yup.string().required('Duration is required'),
    stories: yup.array().of(
      yup.object().shape({
        title: yup.string().required('Story Title is required'),
        description: yup.string().required('Story Description is required'),
      })
    ),
  });

 
const {
  control,
  register,
  handleSubmit,
  setValue,
  formState: { errors },
} = useForm<FormData>({
  resolver: yupResolver(validationSchema) as any,
  mode: 'all',
});

  


useEffect(() => {
  if (projectDetail && storiesData as Story[]) {
    setValue('projectName', projectDetail.projectName || '');
    setValue('description', projectDetail.description || '');
    setValue('startDate', projectDetail.startDate || null);
    setValue('endDate', projectDetail.endDate || null);
    setValue('duration', projectDetail.duration || '');

    storiesData.forEach((story: Story, index: number) => {
      const storyIndex = `stories[${index}]`;
      const title = story.title || '';
      const description = story.description || '';

      setValue(`${storyIndex}.title`, title);
      setValue(`${storyIndex}.description`, description);
    });
  }
}, [projectDetail, storiesData, setValue]);



    const onSubmit: SubmitHandler<any> = async (formData) => {
      try {
        if (projectDetail?._id) {
          await updateProjectMutation.mutateAsync(
            {
              ...formData,
              _id: projectDetail?._id,
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
        const storyValues: Story[] = formData.stories || [];
        for (const story of storyValues) {
          if (story.project?._id) {
            if (story._id) {
              await updateStoryMutation.mutateAsync(story, {
                onError: (error) => console.log(error.message),
              });
            } else {
              await createStoryMutation.mutateAsync(story, {
                onError: (error) => console.log(error.message),
              });
            }
          }
        }
        refetchStories();
      } catch (error) {
        console.error('Error while saving:', error);
      }
      onDrawerClose();
    };

    const onDeleteStory = async (storyId: string) => {
      try {
        await deleteStoryMutation.mutateAsync(storyId, {
          onError: (error) => console.log(error.message),
        });
        refetchStories();
      } catch (error) {
        console.error('Error while deleting story:', error);
      }
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
                              sx={{ width: '100%' }} 
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
                              sx={{ width: '100%' }} 
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
                      <Box display={"flex"} columnGap={22} alignItems={"center"}>
                        <Typography variant="h6">Stories</Typography>
                        <Button variant="contained">Add Story</Button>
                      </Box>
                      {stories.map((story: Story, index: number) => (
                      <Box key={story._id} display="flex" alignItems="center" rowGap={2}>
                        <TextField
                          fullWidth
                          label="Story title"
                          error={!!(errors.stories && errors.stories[index]?.title)}
                          helperText={(errors.stories && errors.stories[index]?.title?.message) || ''}
                          {...register(`stories.${index}.title` as const)}
                        />
                        <TextField
                          fullWidth
                          label="Description"
                          error={!!(errors.stories && errors.stories[index]?.description)}
                          helperText={(errors.stories && errors.stories[index]?.description?.message) || ''}
                          {...register(`stories.${index}.description` as const)}
                        />
                        <IconButton onClick={() => onDeleteStory(story._id)}>
                          Delete
                        </IconButton>
                      </Box>
                    ))}
                    </Box>
                  </Box>
                  <Box
                    display={"flex"}  
                    columnGap={2}
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
