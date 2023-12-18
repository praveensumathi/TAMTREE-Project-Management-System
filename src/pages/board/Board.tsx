import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
// import { useParams } from "react-router-dom";
import { useState } from "react";
import { Button, Card, CardContent, CardHeader } from "@mui/material";
import CustomAccordion from "../../common/components/CustomAccordion";
import React from "react";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddTaskDrawer from "./AddTaskDrawer";
import AddIcon from "@mui/icons-material/Add";
import {
  UseGetAllProjectDetail,
  useDeleteTaskMutation,
} from "../../hooks/CustomRQHooks";
import { ProjectTask } from "../../types/boardTypes";
import { updateTaskStatus } from "../../http/TaskApi";

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

const initialValue = {
  _id: "",
  title: "",
  description: "",
  duration: "",
  status: 0,
  story: "",
};

function Board() {
  const navigate = useNavigate();
  // const { projectId } = useParams();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [SelectedStoryId, setSelectedStoryId] = useState("");
  const [expanded, setExpanded] = useState<string | false>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTask, setSelectedTask] = useState<ProjectTask>();

  const temporaryProjectId: string = "6576e96b62f90fb5fbad3f0d";

  const { data: projectData, refetch } =
    UseGetAllProjectDetail(temporaryProjectId);
  const deleteTaskMutation = useDeleteTaskMutation();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCardEditClick = (
    event: React.MouseEvent<HTMLElement>,
    task: ProjectTask
  ) => {
    event.stopPropagation();
    setSelectedTask(task);
    setOpenDrawer(true);
  };

  const handleDelete = async (
    event: React.MouseEvent<HTMLElement>,
    taskId: string
  ) => {
    event.stopPropagation();
    await deleteTaskMutation.mutateAsync(taskId, {
      onError: (error) => console.log(error.message),
      onSuccess: () => refetch(),
    });

    handleClose();
  };

  const handleIconButton = (
    event: React.MouseEvent<HTMLElement>,
    task: ProjectTask
  ) => {
    event.stopPropagation();
    setSelectedTask(task);
    setAnchorEl(event.currentTarget);
  };

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

  const onDrop = (evt: any, status: number) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove("dragged-over");
    let id = evt.dataTransfer.getData("text/plain");

    updateTaskStatus(id, status).then(() => refetch());

    const children = evt.currentTarget.querySelectorAll(".empty");
    children.forEach((child: any) => {
      evt.currentTarget.removeChild(child);
    });
  };

  const handleAddTask = (storyId: string) => {
    setSelectedTask(initialValue);
    setSelectedStoryId(storyId);
    setOpenDrawer(true);
  };

  const renderTasks = (
    taskList: ProjectTask[],
    status: number,
    color: string
  ) => {
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
                {taskList?.map((task: ProjectTask) => (
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
                      onClick={(e) => handleCardEditClick(e, task)}
                    >
                      <CardHeader
                        action={
                          <IconButton
                            id="basic-button"
                            onClick={(e) => handleIconButton(e, task)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        }
                        title={
                          <Typography variant="body1">{task.title}</Typography>
                        }
                      ></CardHeader>
                      <CardContent sx={{ pt: 0 }}>
                        <Typography variant="body2" color={"text.secondary"}>
                          {task.description}
                        </Typography>
                        <Typography variant="body2" color={"text.secondary"}>
                          {task.duration}
                        </Typography>
                      </CardContent>
                    </Card>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && task._id == selectedTask?._id}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={(e) => handleDelete(e, task._id!)}>
                        Delete
                      </MenuItem>
                    </Menu>
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
    (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <>
      <Container maxWidth={false} sx={{ mb: 3 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Typography>Boards</Typography>
          <Link
            underline="hover"
            color="inherit"
            href="/"
            onClick={() => navigate("/projects")}
          >
            projects
          </Link>
          <Typography>{projectData?.projectName}</Typography>
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
                <Box display={"flex"} gap={10}>
                  <Box>
                    <Typography variant="h6">{projectStatus.status}</Typography>

                    <Typography
                      variant="subtitle2"
                      sx={{
                        opacity: 0.6,
                        lineHeight: 1,
                        fontWeight: "lighter",
                      }}
                    >
                      {projectStatus.description}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </>

        <Box className="container">
          {projectData && (
            <Box mt={1}>
              {projectData.stories?.map((s) => (
                <CustomAccordion.Accordion
                  // expanded={expanded === s._id}

                  expanded
                  onChange={handleChange(s._id!)}
                >
                  <CustomAccordion.AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                  >
                    <Box display={"flex"} gap={4} alignItems={"center"}>
                      <Box>
                        <Typography>{s.title}</Typography>
                      </Box>
                      <Box>
                        {projectStatusList.map((projectStatus) => {
                          if (projectStatus.status === "To Do") {
                            return (
                              <Button
                                size="small"
                                variant="outlined"
                                key={projectStatus.status}
                                onClick={() => handleAddTask(s._id)}
                              >
                                <AddIcon />
                                Add Task
                              </Button>
                            );
                          }
                        })}
                      </Box>
                    </Box>
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

      <AddTaskDrawer
        openDrawer={openDrawer}
        onClose={() => setOpenDrawer(false)}
        SelectedStoryId={SelectedStoryId}
        selectedTask={selectedTask!}
        onSuccessSave={() => refetch()}
      />
    </>
  );
}

export default Board;
