import { Box, CircularProgress, Typography } from '@mui/material';

interface LoaderProps {
  loadingText: string;
}

const Loader: React.FC<LoaderProps> = ({ loadingText }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress />
      <Typography variant="body1" color="textSecondary">
        {loadingText}
      </Typography>
    </Box>
  );
};

export default Loader;
