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
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProjectDrawer from "../../drawer/ProjectDrawer";
import ProjectDialogBox from "../../commonDialogBox/ProjectDialogBox";

import {
  useDeleteProjectMutation,
  useDeleteStoryMutation,
  useGetAllProject,
} from "../../hooks/CustomRQHooks";
import Loader from "../../commonDialogBox/Loader";
import { getStoryByProjectID } from "../../http/StoryApi";
import ViewDialogBox from "../../commonDialogBox/ViewstoryDialog";

const newProject: Project = {
  _id: "",
  projectName: "project",
  description: "project",
  startDate: new Date(),
  endDate: new Date(),
  duration: " months",
};

const Projects = () => {
  const navigate = useNavigate();
  const deleteProjectMutation = useDeleteProjectMutation();
  const deleteStoryMutation = useDeleteStoryMutation();

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
      try {
        console.log("Before prject delete log block");

        await deleteProjectMutation.mutateAsync(deleteConfirmation._id);
        console.log("After prject delete log block");

        const storiesToDelete = projectStories[deleteConfirmation._id] || [];
        console.log("Deleting project ID:", deleteConfirmation?._id);
        storiesToDelete.forEach((story) => {
          console.log("Deleting story ID:", story._id);
        });

        const deleteStoriesPromises = storiesToDelete.map(async (story) => {
          if (story && story._id) {
            try {
              console.log("story deleteion processing");

              await deleteStoryMutation.mutateAsync(story._id);
            } catch (error) {
              console.error("Error deleting story:", error);
            }
          }
        });

        await Promise.all(deleteStoriesPromises);
        console.log("after story delete log block");
      } catch (error) {
        console.error("Error deleting project and stories:", error);
      } finally {
        setDeleteConfirmation(null);
        setDeleteDialogConfirmationOpen(false);
      }
    }
  };

  const handleViewStoriesClick = (projectId: string) => {
    const stories = projectStories[projectId] || [];
    setSelectedProjectStories(stories);
    setViewDialogOpen(true);
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
                  >
                    <CardContent>
                      <CardHeader
                        title={project.projectName}
                        action={
                          <>
                            <IconButton
                              aria-label="settings"
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
                          </>
                        }
                      ></CardHeader>
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
                        Duration:{project.duration}
                      </Typography>
                      <Box display={"flex"} columnGap={2}>
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
