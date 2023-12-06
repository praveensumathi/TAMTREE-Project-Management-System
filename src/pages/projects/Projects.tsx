import { projects } from "../../seed-data/seed-data";
import { Project } from "../../types/type";
import {
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

// import Board from "../board/Board";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProjectDrawer from "../board/drawer/ProjectDrawer";
import ProjectDialogBox from "../../commonDialogBox/ProjectDialogBox";

function Projects() {
  const [projectDetail, setProjectDetail] = useState<Project[] | undefined>();
  const [projectDrawerOpen, setProjectDrawerOpen] = useState(false);
  const [deleteDialogConfirmationOpen, setDeleteDialogConfirmationOpen] =
    useState(false);
  const [deleteConfirmation, setDeleteConfirmation] =
    useState<project | null>();
  const navigate = useNavigate();

  const handleEditClick = (project: Project) => {
    setProjectDetail(project);
    setProjectDrawerOpen(true);
  };
  const handleDeleteCancel = () => {
    setDeleteDialogConfirmationOpen(false);
  };
  const handleDeleteClickConfirm = async () => {
    setDeleteConfirmation(null);
    setDeleteDialogConfirmationOpen(false);
  };
  return (
    <Container>
      <Grid container spacing={2}>
        {projects.map((project) => (
          <Grid item xs={8} key={project._id}>
            <Card
              sx={{ minWidth: 275 }}
              onClick={() => navigate(`board/${project._id}`)}
            >
              <CardContent>
                <CardHeader
                  action={
                    <>
                      <IconButton aria-label="settings">
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        aria-label="settings"
                        onClick={() => handleEditClick(project)}
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
                  Story Count: {project.stories.length}
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
      />
      {/* <Board projectDetail={projectDetail} /> */}
      {projectDrawerOpen && (
        <ProjectDrawer
          projectDrawerOpen={projectDrawerOpen}
          projectDetail={projectDetail}
          onDrawerClose={() => setProjectDrawerOpen(false)}
        />
      )}
    </Container>
  );
}

export default Projects;
