import { useState } from "react";
import { projects as initialProjects } from "../../seed-data/seed-data";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router";
import { Visibility } from "@mui/icons-material";
import { ProjectEditDrawer } from "../../pageDrawer/ProjectEditDrawer";
import ProjectDialog from "../../pageDialogs/Projects";

function Projects() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [projects, setProjects] = useState(initialProjects);

  const navigate = useNavigate();

  const handleOpenDrawer = (project: any) => {
    setDialogOpen(false);
    setSelectedProject(project);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedProject(null);
  };
  const handleDialogOpen = (project: any) => {
    setSelectedProject(project);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedProject(null);
  };

  const handleDeleteProject = () => {
    if (selectedProject) {
      const updatedProjects = projects.filter(
        (project) => project._id !== selectedProject._id
      );

      const deletedStoryIds = selectedProject.stories.map(
        (story: { _id: string }) => story._id
      );
      const updatedProjectsAndStories = updatedProjects.map((project) => ({
        ...project,
        stories: project.stories.filter(
          (story) => !deletedStoryIds.includes(story._id)
        ),
      }));

      setProjects(updatedProjectsAndStories);
    }

    handleDialogClose();
  };

  return (
    <>
      <Container>
        <Box>
          <Box textAlign={"center"}>
            <Typography fontSize={50}>PROJECTS</Typography>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {projects.map((project, index) => (
              <Grid key={index}>
                <Card
                  key={index}
                  sx={{ minWidth: 275, margin: 2, height: 200 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/board/${project._id}`);
                  }}
                >
                  <CardHeader
                    action={
                      <Grid container>
                        <Grid item xs={6}>
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenDrawer(project);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Grid>
                        <Grid item xs={6}>
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDialogOpen(project);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    }
                    title={project.title}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {project.description}
                    </Typography>
                    <Box display={"Flex"} flexDirection={"row"} columnGap={2}>
                      <Typography variant="body2" color="text.secondary">
                        Story Count: {project.stories.length}
                      </Typography>
                      <>
                        <Visibility />
                      </>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Box>
        </Box>
      </Container>
      <ProjectDialog
        open={dialogOpen}
        project={selectedProject}
        onClose={handleDialogClose}
        onDelete={handleDeleteProject}
      />
      <ProjectEditDrawer
        open={drawerOpen}
        project={selectedProject}
        onClose={handleCloseDrawer}
        onDialogOpen={handleDialogOpen}
      />
    </>
  );
}

export default Projects;
