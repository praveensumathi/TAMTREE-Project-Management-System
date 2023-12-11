import { projects } from "../../seed-data/seed-data";
import { Project, Storie } from "../../types/type";
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProjectDrawer from "../../drawer/ProjectDrawer";
import ProjectDialogBox from "../../commonDialogBox/ProjectDialogBox";
import ViewDialogBox from "../../commonDialogBox/ViewstoryDialog";

const initialValues: Project = {
        _id: "p4", 
        title: "",
        description: "",
        assignedTo: "",
        status: "",
        stories: [],
};

function Projects() {
  const navigate = useNavigate();

  const [project, setProject] = useState<Project[]>(projects);
  const [selectedProject, setSelectedProject] = useState<Project| null >(null);
  const [projectDrawerOpen, setProjectDrawerOpen] = useState<boolean>(false);
  const [deleteDialogConfirmationOpen, setDeleteDialogConfirmationOpen] =
    useState(false);
  const [deleteConfirmation, setDeleteConfirmation] =
    useState<Project>();
    const [viewDialogOpen, setViewDialogOpen] = useState<boolean>(false);
    const [selectedStories, setSelectedStories] = useState<Storie[]>([]);
    
    const handleEditProject = (project:Project) => {
      setSelectedProject(project);
      setProjectDrawerOpen(true);
    }

    const handleAddProject = () => {
    setProject((prevProject)=>[...prevProject,initialValues])
    setSelectedProject(initialValues);
      setProjectDrawerOpen(true);
    };

    const handleProjectDeleteClick = (project: Project) => {
      setDeleteConfirmation(project);
      setDeleteDialogConfirmationOpen(true);
    };

  const handleDeleteCancel = () => {
    setDeleteDialogConfirmationOpen(false);
  };

  const handleDeleteClickConfirm = () => {
 if (deleteConfirmation) {
  deleteProject(deleteConfirmation);
 }
 setDeleteDialogConfirmationOpen(false)
  };
  
  

const handleProjectUpdate  = (updatedProject:Project) => {
  setProject((prevProjects)=>{
  const updatedProjects = prevProjects.map((project)=> project._id === updatedProject._id?
  updatedProject : project ) ;
  if (!prevProjects.some((project)=> project._id === updatedProject._id )) {
    updatedProjects.push(updatedProject)
  }
  return updatedProjects; 
})
setSelectedProject(updatedProject);
};


const deleteProject = (projectToDelete: Project) => {
  const updatedProjects = project.filter(
    (pro) => pro._id !== projectToDelete._id
  );
  setProject(updatedProjects);
};
  
const handleViewStories = (stories: Storie[]) => {
  setSelectedStories(stories);
  setViewDialogOpen(true);
};

const handleViewDialogClose = () => {
  setViewDialogOpen(false);
};

 
  return (
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
              handleAddProject();
            }}
          >
            Add project
          </Button>
        </Grid>
      
      </Grid>
      <Grid container spacing={2}>
        {project.map((project) => (
          <Grid item xs={4} key={project._id}>
            <Card
              sx={{ minWidth: 175 }}
              onClick={() => {
                navigate(`/board/${project._id}`);
              }}
            >
              <CardContent>
                <CardHeader
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
                          handleEditProject(project);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </>
                  }
                  title={project.title}
                ></CardHeader>
                <Typography variant="body2" color="text.secondary">
                  Description: {project.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Assigned to: {project.assignedTo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Status: {project.status}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Story Count: {project.stories?.length}
                  <IconButton
                  aria-label="view-stories"
                  onClick={(e) =>{ e.stopPropagation();
                    handleViewStories(project.stories)}}
                >
                  <VisibilityIcon />
                </IconButton>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <ProjectDialogBox
        deleteDialogConfirmationOpen={deleteDialogConfirmationOpen}
        handleDeleteCancel={handleDeleteCancel}
        handleDeleteClickConfirm={handleDeleteClickConfirm}
        selectedProject={selectedProject! || initialValues}
      />

      {projectDrawerOpen && (
        <ProjectDrawer
          projectDrawerOpen={projectDrawerOpen}
          selectedProject={selectedProject!}
          onDrawerClose={() => setProjectDrawerOpen(false)}
          handleProjectUpdate={handleProjectUpdate} 
          
        />
      )}

      <ViewDialogBox
        open={viewDialogOpen}
        onClose={handleViewDialogClose}
        stories={selectedStories}
      />
    </Container>
  );
}

export default Projects;
