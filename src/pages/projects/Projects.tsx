
import { Project} from "../../types/type";
import {
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProjectDrawer from "../../drawer/ProjectDrawer";
import ProjectDialogBox from "../../commonDialogBox/ProjectDialogBox";

import { useDeleteProjectMutation, useGetAllProject } from "../../hooks/CustomRQHooks";
import Loader from "../../commonDialogBox/Loader";

const newProject: Project = {
        _id: "", 
        projectName:"project",
        description:"project",
        startDate:new Date(),
        endDate: new Date(),
        duration:" months"
};

const Projects= () =>{
  const navigate = useNavigate();

  const { data: projectData, isLoading, isError, isFetching } = useGetAllProject();
 const projects = projectData || [];
  const deleteProjectMutation = useDeleteProjectMutation();


  const [selectedProject, setSelectedProject] = useState<Project| null >(null);
  const [projectDrawerOpen, setProjectDrawerOpen] = useState<boolean>(false);
  const [deleteDialogConfirmationOpen, setDeleteDialogConfirmationOpen] =
    useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState<Project | null>(null);

    const handleEditProjectClick = (project:Project) => {
      setSelectedProject(project);
      setProjectDrawerOpen(true);
    }

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


if (isError) {
  return <div>Error fetching projects</div>;
}
  return (
    <>
    {isLoading || isFetching ? (
      <Loader loadingText="Fetching data..."  />
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
      <Grid container spacing={2} >
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
  Start Date: {project.startDate instanceof Date ? project.startDate.toDateString() : ''}
</Typography>
<Typography variant="body2" color="text.secondary">
  End Date: {project.endDate instanceof Date ? project.endDate.toDateString() : ''}
</Typography>
                <Typography variant="body2" color="text.secondary">
                  Duration:{project.duration}
                </Typography>
                
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
          onDrawerClose={() => setProjectDrawerOpen(false)}
        />
      )}

    </Container>
    </>
    )}
    </>
  );
}


export default Projects;
