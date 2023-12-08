import React, { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Board from "../board/Board"; 

function StoriesAccordion() {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const stories = ["Story 1", "Story 2", "Story 3", "Story 4"];

  return (
    <Container >
      {stories.map((story, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          sx={{
            width: "100%", 
            backgroundColor: expanded === `panel${index}` ? "lightgrey" : "inherit",
            marginBottom: 2, 
            borderRadius: 0,
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
                display:"flex",
                alignContent:"center",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Typography>{story}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box display="flex" gap={2}>
              <Board /> 
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}

export default StoriesAccordion;
