import { Project } from "../types/type";
import { http } from "./Axios";

const getAllProjects = async () => {
  try {
    const response = await http.get<Project[]>("projects/getallprojects");

    return response.data;
  } catch (error) { }
};


const fetchProjects = async () => {
  try {
    const projectsData = await getAllProjects();
    const parsedProjects = projectsData!.map((project) => ({
      ...project,
      startDate: project.startDate ? new Date(project.startDate) : null,
      endDate: project.endDate ? new Date(project.endDate) : null,
    }));
    return parsedProjects;
  } catch (error) {
    throw error;
  }
};

const getProject = async (projectId: string) => {
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

const createProject = async (newProject: Project) => {
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
  updatedProject: Project) => {
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

const deleteProject = async (projectId: string) => {
  try {
    console.log("deleting");

    const response = await http.delete<Project>(
      `projects/deleteproject/${projectId}`
    );
    console.log(response.data);
  } catch (error) {
    throw error;
  }
};

export { getAllProjects, fetchProjects, createProject, updateProject, deleteProject, getProject };
