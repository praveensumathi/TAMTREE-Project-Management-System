import { useParams } from "react-router-dom";
import { projects } from "../../seed-data/seed-data";
import { useState } from "react";
import { Box, Breadcrumbs, Container, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { Story } from "../../types/type";
import StoriesList from "../../dragDrop/StoriesList";
import { TaskStatusList } from "../../seed-data/seed-data";

function Board() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const selectedProject = projects.find((project) => project._id === projectId);

  const [selectedProjectStory, setSelectedProjectStory] = useState<Story[]>([]);

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
            <>
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
              <Box display={"flex"} gap={3}>
                {TaskStatusList.map((task) => (
                  <Box sx={{ backgroundColor: "gray", width: "25%" }}>
                    <Typography>{task.status}</Typography>
                    <Typography>{task.description}</Typography>
                  </Box>
                ))}
              </Box>
              <Box>
                {selectedProject.stories.map((story) => (
                  <Box>
                    <Box>
                      <Typography>{story.title}</Typography>
                    </Box>
                    <Box display={"flex"} gap={2}>
                      {story.tasks.map((taskStatus) =>
                        taskStatus.status === "TO DO" ? (
                          <Box
                            sx={{ backgroundColor: "skyblue", width: "25%" }}
                          >
                            <Typography>{taskStatus.title}</Typography>
                          </Box>
                        ) : taskStatus.status === "IN PROGRESS" ? (
                          <Box
                            sx={{ backgroundColor: "steelblue", width: "25%" }}
                          >
                            <Typography>{taskStatus.title}</Typography>
                          </Box>
                        ) : taskStatus.status === "DEPLOYED" ? (
                          <Box sx={{ backgroundColor: "blue", width: "25%" }}>
                            <Typography>{taskStatus.title}</Typography>
                          </Box>
                        ) : (
                          taskStatus.status === "DONE" && (
                            <Box
                              sx={{ backgroundColor: "green", width: "25%" }}
                            >
                              <Typography>{taskStatus.title}</Typography>
                            </Box>
                          )
                        )
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            </>
          )}
        </Box>
      </Container>
    </>
  );
}

export default Board;
