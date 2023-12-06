import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { ProjectBoardProps } from "../../types/type";

function Board({ projectDetail }: ProjectBoardProps) {
  const navigate = useNavigate();

  const projectStatusList = [
    {
      status: "To Do",
      description: "this item has not been started",
    },
    {
      status: "In Progress",
      description: " this actively being worked on",
    },
    {
      status: "Deployed",
      description: "code deployede into server",
    },
    {
      status: "Completed",
      description: "this have been completed",
    },
  ];

  return (
    <Container maxWidth={false}>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography>Boards</Typography>
        <Link
          underline="hover"
          color="inherit"
          href="/"
          onClick={() => navigate("/projects")}
        >
          {projectDetail && (
            <Typography>{`project/${projectDetail.title}`}</Typography>
          )}
        </Link>
      </Breadcrumbs>

      <Box display={"flex"} gap={3}>
        {projectStatusList.map((projectStatus, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: "#F8F8F8",
              p: 2,
            }}
          >
            <Typography variant="h6">{projectStatus.status}</Typography>
            <Typography variant="h6" sx={{ opacity: 0.6, lineHeight: 1 }}>
              {projectStatus.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default Board;
