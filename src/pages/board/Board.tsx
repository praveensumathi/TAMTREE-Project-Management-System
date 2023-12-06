import { useParams } from "react-router-dom";
import { projects } from "../../seed-data/seed-data";
import {
  Box,
  Breadcrumbs,
  Container,
  Divider,
  Link,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import { ProjectStatus } from "../../seed-data/seed-data";
function Board() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const selectedProject = projects.find((project) => project._id === projectId);
  console.log(projects);
  console.log(projectId);

  return (
    <>
      <Container>
        <Box textAlign={"center"}>
          <Typography fontWeight={"bold"} fontSize={50}>
            BOARDS
          </Typography>
        </Box>
        <Box>
          {selectedProject && (
            <Box>
              <Breadcrumbs>
                <Typography>Boards</Typography>
                <Link
                  onClick={() => navigate("/Projects")}
                  sx={{ cursor: "pointer" }}
                >
                  Projects
                </Link>
                <Typography>{selectedProject.title}</Typography>
              </Breadcrumbs>
            </Box>
          )}
        </Box>
        <Container sx={{ paddingY: "20px" }}>
          <Box display={"flex"} flexWrap={"wrap"} width={"100vw"} gap={3}>
            {ProjectStatus.map((status) => (
              <Box
                key={status.status}
                border={"1px solid black"}
                width={"20%"}
                height={250}
              >
                <Typography fontWeight={"bold"}>{status.status}</Typography>
                <Typography variant="body2" fontWeight={"lighter"}>
                  {status.description}
                </Typography>
                <Divider />
              </Box>
            ))}
          </Box>
        </Container>
      </Container>
    </>
  );
}

export default Board;
