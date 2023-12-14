import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { ProjectDialogProps } from "../types/type";

const ProjectDialog = ({
  open,
  project,
  story,
  onClose,
  onDelete,
}: ProjectDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>DELETE CONFIRMATION</DialogTitle>
      <DialogContent>
        {story ? (
          <Box display="flex" alignItems="center" gap={1}>
            <Typography>Are you sure you want to delete the story</Typography>
            <Typography fontWeight={"bold"}>{story.title}</Typography>
            <Typography> in the project </Typography>
            <Typography fontWeight={"bold"}>{project?.title}?</Typography>
          </Box>
        ) : (
          project && (
            <Box display="flex" alignItems="center" gap={1}>
              <Typography>Are you sure to delete project:</Typography>
              <Typography fontWeight={"bold"}> {project.title}?</Typography>
            </Box>
          )
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onDelete}>Agree</Button>
        <Button onClick={onClose}>Disagree</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectDialog;
