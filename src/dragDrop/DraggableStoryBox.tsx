import { DraggableStoryBoxProps, Story } from "../types/type";
import { useDrag } from "react-dnd";
import { Box } from "@mui/material";

const DraggableStoryBox = ({ story }: DraggableStoryBoxProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "stories",

    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  console.log(isDragging);

  return (
    <></>
  );
};

export default DraggableStoryBox;
