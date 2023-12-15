import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Divider,
  Button,
  DialogActions,
} from '@mui/material';
import { Storie, ViewDialogProps } from '../types/type';

const ViewDialogBox: React.FC<ViewDialogProps> = ({ open, onClose, stories }) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="view-dialog-title">
      <DialogTitle id="view-dialog-title">Stories</DialogTitle>
      <DialogContent>
        {stories.map((story:Storie) => (
          <div key={story._id}>
            <Typography variant="subtitle1">{`Story Number: ${story._id}`}</Typography>
            <Typography variant="subtitle2">{`Name: ${story.name}`}</Typography>
            <Typography variant="body2">{`Description: ${story.description}`}</Typography>
            <Divider />
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewDialogBox;
