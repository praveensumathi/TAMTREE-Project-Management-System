import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Divider,
  Button,
  DialogActions,
  Box,

} from '@mui/material';
import {  Story, ViewDialogProps } from '../types/type';

const ViewDialogBox: React.FC<ViewDialogProps> = ({ open, onClose, stories }) => {
  return (
    
    <Dialog open={open} onClose={onClose} aria-labelledby="view-dialog-title"  maxWidth="xs" fullWidth >
     
      <DialogTitle id="view-dialog-title">Stories</DialogTitle>
      <DialogContent> 
        {stories.map((story:Story, index) => (
         <Box key={story._id} textAlign={"center"}>
         <Typography variant="subtitle1">{`Story Number: ${index + 1}`}</Typography>
         <Typography variant="subtitle2">{`Name: ${story.title}`}</Typography>
         <Divider />
       </Box>
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