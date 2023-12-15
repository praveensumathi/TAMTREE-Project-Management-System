import { Story } from "../types/type";
import { http } from "./Axios";

const getStories = async () => {
  try {
    const response = await http.get<Story[]>("stories/getstories");

    return response.data;
  } catch (error) {}
};

const getStory = async (storyId: string) =>{
  try {
    const response = await http.get<Story>(
      `/stories/getstory/${storyId}`
    );

    if (response.data && response.data._id) {
      return response.data;
    } else {
      throw new Error("Error while get story");
    }
  } catch (error) {
    throw error;
  }
};

const getStoryBasicInfo = async (projectId:string) => {
  try {
    const response = await http.get(`/stories/getstorybasicinfo/${projectId}`);
    if (response.data && response.data._id) {
      return response.data;
    } else {
      throw new Error("Invalid response structure: Story ID not found");
    }
  } catch (error) {
    console.error("Error fetching story basic info:");
    throw new Error("Error fetching story basic info");
  }
};





const createStory = async (newStory:Story) => {
  try {
    const response = await http.post<Story>(
      "stories/createstory",
      newStory
    );

    if (response.data && response.data._id) {
      return response.data;
    } else {
      throw new Error("Error while create story");
    }
  } catch (error) {
    throw error;
  }
};



const updateStory = async (storyId: string,
  updatedstory:Story) =>{
  try {
    const response = await http.put<Story>(
      `/stories/updatestory/${storyId}`,
    updatedstory
    );

    if (response.data && response.data._id) {
      return response.data;
    } else {
      throw new Error("Error while update story");
    }
  } catch (error) {
    throw error;
  }
};

const deleteStory = async (storyId: string) =>{
  try {
    const response = await http.delete<Story>(
      `/stories/deletestory/${storyId}`
    );

    if (response.data && response.data._id) {
      return response.data;
    } else {
      throw new Error("Error while delete story");
    }
  } catch (error) {
    throw error;
  }
};



export {getStories,createStory,updateStory,deleteStory,getStory,getStoryBasicInfo};
