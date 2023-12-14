import { ProjectDetail, ProjectTask } from "../types/boardTypes";
import { http } from "./Axios";

const createTask = async (newTask: ProjectTask) => {
  try {
    const response = await http.post<ProjectTask>("/task/createTask", newTask);

    if (response.data && response.data._id) {
      return response.data;
    } else {
      throw new Error("Error while create task");
    }
  } catch (error) {
    throw error;
  }
};

const updateTask = async (updatedTaskData: ProjectTask) => {
  try {
    const response = await http.put(
      `/task/updateTask/${updatedTaskData._id}`,
      updatedTaskData
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateTaskStatus = async (taskId: string, updatedStatus: number) => {
  try {
    const response = await http.put(`/task/updateTaskStatus/${taskId}`, {
      status: updatedStatus,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteTask = async (taskId: string) => {
  try {
    const response = await http.delete(`/task/deleteTask/${taskId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// BoardApi
const getAllProjectDetail = async (ProjectId: string) => {
  try {
    const response = await http.get<ProjectDetail>(
      `/projects/getproject/${ProjectId}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export {
  createTask,
  updateTask,
  deleteTask,
  getAllProjectDetail,
  updateTaskStatus,
};
