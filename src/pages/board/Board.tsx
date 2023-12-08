import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { projects } from "../../seed-data/seed-data";
import { Project, Task } from "../../types/type";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

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

function Board() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [selectedProjectedData, setSelectedProjectedData] = useState<Project>();
  const [expanded, setExpanded] = useState<string | false>("");

  useEffect(() => {
    const project = projects.find((project) => project._id! == projectId)!;
    setSelectedProjectedData(project!);
  }, [projectId]);

  const onDragStart = (evt: any) => {
    let element = evt.currentTarget;
    // element.style.backgroundColor = "aqua";
    element.classList.add("dragged");
    evt.dataTransfer.setData("text/plain", evt.currentTarget.id);
    evt.dataTransfer.effectAllowed = "move";
  };

  // const onDragEnd = (evt: any) => {
  //   //evt.currentTarget.classList.remove("dragged");

  //   const children = evt.currentTarget.querySelectorAll(".empty");
  //   children.forEach((child: any) => {
  //     evt.currentTarget.removeChild(child);
  //   });
  // };

  const onDragEnter = (evt: any) => {
    console.log("enter");

    evt.preventDefault();
    let element = evt.currentTarget;

    let currentTarget = evt.currentTarget;
    let newTarget = evt.relatedTarget;

    element.classList.add("dragged-over");
    evt.dataTransfer.dropEffect = "move";

    const children = element.querySelectorAll(".empty");

    if (newTarget.parentNode === currentTarget || newTarget === currentTarget)
      return;

    if (children.length == 0) {
      var emptyDiv = document.createElement("div");
      emptyDiv.classList.add("empty");
      emptyDiv.style.height = "100px";
      emptyDiv.style.width = "100px";
      emptyDiv.style.backgroundColor = "yellow";

      evt.currentTarget.appendChild(emptyDiv);
    }
  };

  const onDragLeave = (evt: any) => {
    let currentTarget = evt.currentTarget;
    let newTarget = evt.relatedTarget;
    if (newTarget.parentNode === currentTarget || newTarget === currentTarget)
      return;
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.remove("dragged-over");

    const children = currentTarget.querySelectorAll(".empty");
    children.forEach((child: any) => {
      currentTarget.removeChild(child);
    });
  };

  const onDragOver = (evt: any) => {
    console.log("coming", evt);

    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
  };

  const onDrop = (evt: any, status: any) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove("dragged-over");
    let id = evt.dataTransfer.getData("text/plain");

    var _stories = selectedProjectedData?.stories ?? [];

    var updatedStories = _stories.map((story) => {
      story.tasks?.map((task) => {
        if (task._id == id.toString()) {
          task.status = status;
        }
        return task;
      });

      return story;
    });

    var _selectedProjectedData = {
      ...selectedProjectedData,
      stories: [...updatedStories],
    } as Project;

    setSelectedProjectedData({ ..._selectedProjectedData });

    const children = evt.currentTarget.querySelectorAll(".empty");
    children.forEach((child: any) => {
      evt.currentTarget.removeChild(child);
    });
  };

  const renderTasks = (taskList: Task[], status: number) => {
    return (
      <Box
        className={`small-box`}
        onDragLeave={onDragLeave}
        onDragEnter={onDragEnter}
        // onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, status)}
      >
        <section className="drag_container">
          <Box className="container">
            <Box className="drag_column">
              <Box className="drag_row">
                {taskList?.map((task: Task) => (
                  <>
                    <Box
                      className={"card"}
                      key={task._id}
                      id={task._id}
                      draggable
                      onDragStart={onDragStart}
                    >
                      <Box className="card_right">
                        <Typography>{task.tname}</Typography>
                        <Box className="days">{task.description}</Box>
                        <Box className="time">{task.duration}</Box>
                      </Box>
                    </Box>
                  </>
                ))}
              </Box>
            </Box>
          </Box>
        </section>
      </Box>
    );
  };

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

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
          projects
        </Link>
        <Typography>{selectedProjectedData?.title}</Typography>
      </Breadcrumbs>
      <>
        <Box display={"flex"} gap={4}>
          {projectStatusList.map((projectStatus, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: "#F8F8F8",
                p: 2,
                width: "22%",
              }}
            >
              <Typography variant="h6">{projectStatus.status}</Typography>
              <Typography variant="h6" sx={{ opacity: 0.6, lineHeight: 1 }}>
                {projectStatus.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </>

      <Box className="container">
        {selectedProjectedData && (
          <Box mt={2}>
            {selectedProjectedData.stories?.map((s) => (
              <Accordion
                expanded={expanded === s._id}
                onChange={handleChange(s._id)}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography>Collapsible Group Item #1</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box display={"flex"} gap={4}>
                    {renderTasks(
                      s.tasks.filter((t) => t.status == 1),
                      1
                    )}
                    {renderTasks(
                      s.tasks.filter((t) => t.status == 2),
                      2
                    )}
                    {renderTasks(
                      s.tasks.filter((t) => t.status == 3),
                      3
                    )}
                    {renderTasks(
                      s.tasks.filter((t) => t.status == 4),
                      4
                    )}
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default Board;
