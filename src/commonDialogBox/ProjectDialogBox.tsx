import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Project } from "../types/type";


type DialogProps = {
  deleteDialogConfirmationOpen: boolean;
  handleDeleteCancel: () => void;
  handleDeleteClickConfirm: () => void;
  selectedProject: Project | null; 
};

function ProjectDialogBox({
  deleteDialogConfirmationOpen,
  handleDeleteCancel,
  handleDeleteClickConfirm,
  selectedProject
}: DialogProps) {
  return (
    <Dialog
      open={deleteDialogConfirmationOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete project?
          {selectedProject!.title}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleDeleteCancel}>
          Disagree
        </Button>
        <Button onClick={handleDeleteClickConfirm} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProjectDialogBox;
