import { Project } from "../types/type";
import { http } from "./Axios";

const getAllProjects = async () => {
  try {
    const response = await http.get<Project[]>("projects/getallprojects");

    return response.data;
  } catch (error) {}
};

const getProject = async (projectId: string) =>{
  try {
    const response = await http.get<Project>(
      `/projects/getproject/${projectId}`
    );

    if (response.data && response.data._id) {
      return response.data;
    } else {
      throw new Error("Error while get project");
    }
  } catch (error) {
    throw error;
  }
};

const createProject = async (newProject:Project) => {
  try {
    const response = await http.post<Project>(
      "projects/createproject",
      newProject
    );

    if (response.data && response.data._id) {
      return response.data;
    } else {
      throw new Error("Error while create project");
    }
  } catch (error) {
    throw error;
  }
};


const updateProject = async (projectId: string,
  updatedProject:Project) =>{
  try {
    const response = await http.put<Project>(
      `/projects/updateproject/${projectId}`,
    updatedProject
    );

    if (response.data && response.data._id) {
      return response.data;
    } else {
      throw new Error("Error while update project");
    }
  } catch (error) {
    throw error;
  }
};

const deleteProject = async (projectId: string) =>{
  try {
    const response = await http.delete<Project>(
      `/projects/deleteproject/${projectId}`
    );

    if (response.data && response.data._id) {
      return response.data;
    } else {
      throw new Error("Error while delete project");
    }
  } catch (error) {
    throw error;
  }
};



export {getAllProjects,createProject,updateProject,deleteProject,getProject};
