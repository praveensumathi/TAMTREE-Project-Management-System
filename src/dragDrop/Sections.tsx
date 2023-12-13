import { Box, Typography } from "@mui/material";
import { TaskStatusList } from "../seed-data/seed-data";
import { SectionsProps } from "../types/type";

const Sections = () => {
  return (
    <Box display={"flex"} flexWrap={"wrap"} width={"100vw"} gap={2}>
      {TaskStatusList.map((status) => (
        <Box
          key={status.status}
          width={270}
          sx={{
            backgroundColor: "grey",
          }}
        >
          <Typography>{status.status}</Typography>
          <Typography variant="body2" fontWeight={"lighter"}>
            {status.description}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Sections;
