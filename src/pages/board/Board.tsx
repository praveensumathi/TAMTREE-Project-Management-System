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
import { Card, CardContent } from "@mui/material";
import CustomAccordion from "../../common/components/CustomAccordion";

const projectStatusList = [
  {
    status: "To Do",
    description: "this item has not been started",
    color: "#ffc8ea",
  },
  {
    status: "In Progress",
    description: " this actively being worked on",
    color: "#fcfec7",
  },
  {
    status: "Done",
    description: "this have been completed",
    color: "#e0ffda",
  },
  {
    status: "Deployed",
    description: "code deployede into server",
    color: "#efd5ff",
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
      emptyDiv.style.width = "250px";
      emptyDiv.style.margin = "0 28px";
      emptyDiv.style.backgroundColor = "lightgrey";

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

  const renderTasks = (taskList: Task[], status: number, color: string) => {
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
                    <Card
                      elevation={3}
                      sx={{
                        width: 280,
                        cursor: "grab",
                        my: 1,
                        backgroundColor: color,
                      }}
                      key={task._id}
                      id={task._id}
                      draggable
                      onDragStart={onDragStart}
                    >
                      <CardContent>
                        <Box>
                          <Typography>{task.tname}</Typography>
                          <Box className="days">{task.description}</Box>
                          <Box className="time">{task.duration}</Box>
                        </Box>
                      </CardContent>
                    </Card>
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
    <Container maxWidth={false} sx={{ mb: 3 }}>
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
        <Box display={"flex"} gap={2}>
          {projectStatusList.map((projectStatus, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: projectStatus.color,
                p: 2,
                width: "24%",
              }}
            >
              <Typography variant="h6">{projectStatus.status}</Typography>
              <Typography
                variant="subtitle2"
                sx={{ opacity: 0.6, lineHeight: 1, fontWeight: "lighter" }}
              >
                {projectStatus.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </>

      <Box className="container">
        {selectedProjectedData && (
          <Box mt={1}>
            {selectedProjectedData.stories?.map((s) => (
              <CustomAccordion.Accordion
                // expanded={expanded === s._id}
                expanded
                onChange={handleChange(s._id!)}
              >
                <CustomAccordion.AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography>{s.name}</Typography>
                </CustomAccordion.AccordionSummary>
                <CustomAccordion.AccordionDetails>
                  <Box display={"flex"} gap={2}>
                    {s.tasks &&
                      renderTasks(
                        s.tasks.filter((t) => t.status == 1),
                        1,
                        "#ff7ecd"
                      )}
                    {s.tasks &&
                      renderTasks(
                        s.tasks.filter((t) => t.status == 2),
                        2,
                        "#fdffb6"
                      )}
                    {s.tasks &&
                      renderTasks(
                        s.tasks.filter((t) => t.status == 3),
                        3,
                        "#caffbf"
                      )}
                    {s.tasks &&
                      renderTasks(
                        s.tasks.filter((t) => t.status == 4),
                        4,
                        "#ce81ff"
                      )}
                  </Box>
                </CustomAccordion.AccordionDetails>
              </CustomAccordion.Accordion>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default Board;
