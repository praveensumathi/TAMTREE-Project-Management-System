import { useParams } from "react-router-dom";
import { projects } from "../../seed-data/seed-data";
import { Box, Breadcrumbs, Container, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router";

function Board() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const selectedProject = projects.find((project) => project._id === projectId);

  return (
    <>
      <Container>
        <Box textAlign={"center"}>
          <Typography fontWeight={"bold"}> BOARDS</Typography>
        </Box>
        {selectedProject && (
          <Box>
            <Breadcrumbs>
              <Typography>Boards</Typography>
              <Link
                onClick={() => navigate("/projects")}
                sx={{ cursor: "pointer" }}
              >
                Projects
              </Link>
              <Typography>{selectedProject.title}</Typography>
            </Breadcrumbs>
            <Box>Title: {selectedProject.title}</Box>
            <Box>Description: {selectedProject.description}</Box>
          </Box>
        )}
      </Container>
    </>
  );
}

export default Board;
