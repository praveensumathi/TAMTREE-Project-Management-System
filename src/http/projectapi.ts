import axios from 'axios';
import { Project } from "../types/type";



export const fetchProjects = async <Project>() => {
  const projectApi = "/projects/getallprojects";
  try {
    const response = await base.get<Project[]>(projectApi);
    const project = response.data;
    return project;
  } catch (error) {
    console.error("Error in fetchProjects:", error);
    throw error; 
  }
};

export const updateProjects = async (
  projectId: string,
  updatedProject: IProjects
) => {
  const projectApi = `/projects/updateproject/${projectId}`;
  
  try {
    const response = await base.put<IProjects>(projectApi, updatedProject);
    return response.data; 
  } catch (error) {
    console.error('Error updating projects:', error);
    throw error;
  }
};

export const createProject = async (newProject:IProjects)=> {
  const projectApi = '/projects/createproject';
  
  try {
    const response: AxiosResponse<IProjects> = await base.post<IProjects>(projectApi, newProject);
    return response.data; 
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export const deleteProject = async (projectId: string) => {
  const projectApi = `/projects/deleteproject/${projectId}`;
  try {
    await base.delete(projectApi);
  } catch (error) {
    console.error(`Error deleting project with ID ${projectId}:`, error);
    throw error;
  }
};