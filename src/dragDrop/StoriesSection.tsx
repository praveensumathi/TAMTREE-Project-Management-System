import React from "react";
import { StoriesSectionProps } from "../types/type";
import { Box, Container } from "@mui/material";

const StoriesSection = ({
  status,
  stories,
  setStories,
  toDos,
  inProgress,
  deployed,
  done,
}: StoriesSectionProps) => {
  console.log(status);
  return (
    <>
      <Container>
        <Box display="flex" flexDirection="row" gap={2}>
          {stories &&
            stories.map((story) => {
              if (status === story.status) {
                return <Box key={story._id}>{story.title}</Box>;
              }
              return null;
            })}
        </Box>
      </Container>
    </>
  );
};

export default StoriesSection;
