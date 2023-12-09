import React, { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Drawer, Typography } from "@mui/material";
import { ITaskDrawerProps } from "../../types/type";

function AddTaskDrawer({
  openDrawer,
  onClose,
  onNewSave,
 
  SelectedStoryId,
}: ITaskDrawerProps) {
  const [newTask, setNewTask] = useState({
    _id: "",
    tname: "",
    description: "",
    duration: "",
    status: 0,
  });

  

  const handleCloseClick = () => {
    onClose();
  };
  const handleCancel = () => {
    onClose();
  };
  const handleSubmit = (e: any, newTask: any) => {
    e.preventDefault();
    onNewSave(newTask, SelectedStoryId);
  
  
  };
  return (
    <>
      <Box>
        <Drawer
          sx={{ position: "relative" }}
          anchor="right"
          open={openDrawer}
          PaperProps={{
            sx: {
              width: "300px",
              padding: "20px",
              margin: "16px",
            },
          }}
        >
          <Box
            padding={2}
            color={"purple"}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Typography variant="h5">Add Task</Typography>
            <Box onClick={handleCloseClick}>
              <CloseIcon />
            </Box>
          </Box>

          <Divider />
          <Box py={3}>
            <form>
              <TextField
                label="id"
                name="_id"
                value={newTask?._id}
                onChange={(e) =>
                  setNewTask({ ...newTask, _id: e.target.value })
                }
                style={{ marginBottom: "10px" }}
              />
              <TextField
                label="name"
                name="name"
                value={newTask?.tname}
                onChange={(e) =>
                  setNewTask({ ...newTask, tname: e.target.value })
                }
                style={{ marginBottom: "10px" }}
              />
              <TextField
                label="description"
                name="description"
                value={newTask?.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                style={{ marginBottom: "10px" }}
              />
              <TextField
                label="duration"
                name="duration"
                value={newTask?.duration}
                onChange={(e) =>
                  setNewTask({ ...newTask, duration: e.target.value })
                }
                style={{ marginBottom: "10px" }}
              />
              <TextField
                label="status"
                name="status"
                value={newTask?.status}
                onChange={(e) =>
                    setNewTask({ ...newTask, status: parseInt(e.target.value, 10) || 0, })
                }
                style={{ marginBottom: "10px" }}
              />

              <Box position={"absolute"} bottom={0} right={0} padding={3}>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  onClick={(e) => handleSubmit(e, newTask)}
                  style={{ margin: "10px" }}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  onClick={handleCancel}
                >
                  cancel
                </Button>
              </Box>
            </form>
          </Box>
        </Drawer>
      </Box>
    </>
  );
}

export default AddTaskDrawer;
