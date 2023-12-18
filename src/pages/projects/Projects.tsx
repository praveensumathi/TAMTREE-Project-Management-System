import { Project, Story } from "../../types/type";
import {
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProjectDrawer from "../../drawer/ProjectDrawer";
<<<<<<< HEAD
import ProjectDialogBox from "../../commonDialogBox/ProjectDialogBox";
import {
  useDeleteProjectMutation,
  useGetAllProject,
} from "../../hooks/CustomRQHooks";
import Loader from "../../commonDialogBox/Loader";
import { getStoryByProjectID } from "../../http/StoryApi";
import ViewDialogBox from "../../commonDialogBox/ViewstoryDialog";
=======
import ProjectDialogBox from "../../commonDialogBox/DialogBox";
>>>>>>> a72ab5b166f1a3ca8d01ee4d999ea9f8a253c3b5

const newProject: Project = {
  _id: "",
  projectName: "project",
  description: "project",
  startDate: new Date(),
  endDate: new Date(),
};

const Projects = () => {
  const navigate = useNavigate();
  const deleteProjectMutation = useDeleteProjectMutation();

  const { data: projectData, isLoading, isFetching } = useGetAllProject();

  const projects = projectData || [];

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectDrawerOpen, setProjectDrawerOpen] = useState<boolean>(false);
  const [deleteDialogConfirmationOpen, setDeleteDialogConfirmationOpen] =
    useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<Project | null>(
    null
  );
  const [projectStories, setProjectStories] = useState<{
    [projectId: string]: Story[];
  }>({});

  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedProjectStories, setSelectedProjectStories] = useState<Story[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storiesPromises = projects.map(async (project) => {
          const stories = await getStoryByProjectID(project._id);
          return { projectId: project._id, stories: stories };
        });

        const storiesResults: { projectId: string; stories: Story[] }[] =
          await Promise.all(storiesPromises);

        const storiesObject: { [projectId: string]: Story[] } =
          storiesResults.reduce((acc, { projectId, stories }) => {
            acc[projectId] = stories;
            return acc;
          }, {} as { [projectId: string]: Story[] });

        setProjectStories(storiesObject);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [projects]);

  const handleEditProjectClick = (project: Project) => {
    setSelectedProject(project);
    setProjectDrawerOpen(true);
  };

  const handleAddProjectClick = async () => {
    setSelectedProject(newProject);
    setProjectDrawerOpen(true);
  };

  const handleProjectDeleteClick = (project: Project) => {
    setDeleteConfirmation(project);
    setDeleteDialogConfirmationOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogConfirmationOpen(false);
  };

  const handleDeleteConfirmClick = async () => {
    setDeleteDialogConfirmationOpen(true);

    if (deleteConfirmation?._id) {
      await deleteProjectMutation.mutateAsync(deleteConfirmation._id, {
        onError: (error) => console.log(error.message),
      });
      setDeleteConfirmation(null);
      setDeleteDialogConfirmationOpen(false);
    }
  };

  const handleViewStoriesClick = (projectId: string) => {
    const stories = projectStories[projectId] || [];
    setSelectedProjectStories(stories);
    setViewDialogOpen(true);
  };

  const calculateDuration = (startDate: Date | null, endDate: Date | null) => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      let years = end.getFullYear() - start.getFullYear();
      let months = end.getMonth() - start.getMonth();
      let days = end.getDate() - start.getDate();

      if (days < 0) {
        const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0);
        days = lastMonth.getDate() - start.getDate() + end.getDate();
        months--;
      }

      if (months < 0) {
        months = months + 12;
        years--;
      }

      const yearString = years > 1 ? "years" : "year";
      const monthString = months > 1 ? "months" : "month";
      const dayString = days > 1 ? "days" : "day";

      const yearPart = years > 0 ? `${years} ${yearString} ` : "";
      const monthPart = months > 0 ? `${months} ${monthString} ` : "";
      const dayPart = days > 0 ? `${days} ${dayString}` : "";

      return `${yearPart}${monthPart}${dayPart}`;
    }
    return "";
  };

  return (
    <>
      {isLoading || isFetching ? (
        <Loader loadingText="Fetching data..." />
      ) : (
        <>
          <Container>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              paddingBottom={3}
            >
              <Grid>
                <Typography variant="h5">Projects</Typography>
              </Grid>

              <Grid>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddProjectClick();
                  }}
                >
                  Add project
                </Button>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              {projects!.map((project) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={project._id}>
                  <Card
                    onClick={() => {
                      navigate(`/board/${project._id}`);
                    }}
                    sx={{
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <CardContent
                      sx={{
                        padding: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="h6"
                          title={project.projectName}
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "70%",
                            cursor: "pointer",
                          }}
                        >
                          {project.projectName}
                        </Typography>
                        <Box sx={{ display: "flex" }}>
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProjectDeleteClick(project);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                          <IconButton
                            aria-label="settings"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditProjectClick(project);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Box>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Description: {project.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Start Date:{" "}
                        {project.startDate instanceof Date
                          ? project.startDate.toDateString()
                          : ""}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        End Date:{" "}
                        {project.endDate instanceof Date
                          ? project.endDate.toDateString()
                          : ""}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Duration:{" "}
                        {calculateDuration(project.startDate, project.endDate)}
                      </Typography>
                      <Box
                        display={"flex"}
                        gap={2}
                        flexDirection={"row"}
                        alignItems={"center"}
                      >
                        <Typography variant="body2" color="text.secondary">
                          story Count:{projectStories[project._id]?.length || 0}
                        </Typography>
                        <IconButton
                          aria-label="settings"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewStoriesClick(project._id);
                          }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {deleteDialogConfirmationOpen && (
              <ProjectDialogBox
                deleteDialogConfirmationOpen={deleteDialogConfirmationOpen}
                handleDeleteCancel={handleDeleteCancel}
                handleDeleteClickConfirm={handleDeleteConfirmClick}
              />
            )}
            {projectDrawerOpen && (
              <ProjectDrawer
                projectDrawerOpen={projectDrawerOpen}
                projectDetail={selectedProject!}
                projectStories={projectStories}
                onDrawerClose={() => setProjectDrawerOpen(false)}
              />
            )}
            {viewDialogOpen && (
              <ViewDialogBox
                open={viewDialogOpen}
                onClose={() => setViewDialogOpen(false)}
                stories={selectedProjectStories}
              />
            )}
          </Container>
        </>
      )}
    </>
  );
};

export default Projects;
