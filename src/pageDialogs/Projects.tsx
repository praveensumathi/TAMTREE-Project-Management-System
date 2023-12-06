import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { ProjectDialogProps } from "../types/type";

const ProjectDialog = ({
  open,
  project,
  onClose,
  onDelete,
}: ProjectDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>DELETE CONFIRMATION</DialogTitle>
      <DialogContent>
        {project && (
          <Typography>
            Are you sure to delete project: {project.title}?
          </Typography>
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
