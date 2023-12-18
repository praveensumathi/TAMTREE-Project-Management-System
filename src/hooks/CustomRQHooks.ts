import { useMutation, useQuery } from "@tanstack/react-query";
import { Project, Story } from "../types/type";
import { queryClient } from "../App";
import { createStory, deleteStory, getStories, getStory, getStoryByProjectID, updateStory } from "../http/StoryApi";
import { createProject, deleteProject, fetchProjects, getProject, updateProject } from "../http/ProjectApi";
import {
  createTask,
  updateTask,
  deleteTask,
  getAllProjectDetail,
} from "../http/TaskApi";

import { ProjectTask } from "../types/boardTypes";
import {
  createEmployee,
  deleteEmployee,
  getAllEmplyees,
  updateEmployee,
} from "../http/EmployeeApi";
import { Employee } from "../types/type";
import toast from "react-hot-toast";

export const useGetAllEmployee = () => {
  return useQuery({
    queryKey: ["employeeList"],
    queryFn: getAllEmplyees,
    refetchOnWindowFocus: false,
  });
};

export const useCreateEmployeeMutation = () => {
  const createEmployeeMutation = useMutation({
    mutationFn: (newEmployee: Employee) => createEmployee(newEmployee),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employeeList"] });
      toast.success("Employee created successfully");
    },
  });
  return createEmployeeMutation;
};

export const useUpdateEmployeeMutation = () => {
  const updateEmployeeMutation = useMutation({
    mutationFn: (updatedEmployee: Employee) => {
      return updateEmployee(updatedEmployee);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employeeList"] });
      toast.success("Employee updated successfully");
    },
  });
  return updateEmployeeMutation;
};

export const useDeleteEmployeeMutation = () => {
  const deleteEmployeeMutation = useMutation({
    mutationFn: (id: string) => deleteEmployee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employeeList"] });
      toast.success("Employee deleted successfully");
    },
  });
  return deleteEmployeeMutation;
};

// task
export const useCreateTaskMutation = () => {
  const createTaskMutation = useMutation({
    mutationFn: (newTask: ProjectTask) => createTask(newTask),
  });
  return createTaskMutation;
};

export const useUpdateTaskMutation = () => {
  const updateTaskMutation = useMutation({
    mutationFn: (updatedTaskData: ProjectTask) => updateTask(updatedTaskData),
  });
  return updateTaskMutation;
};

export const useDeleteTaskMutation = () => {
  const deleteTaskMutation = useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),
  });
  return deleteTaskMutation;
};


export const UseGetAllProjectDetail = (projectId: string) => {
  return useQuery({
    queryKey: ["projectDetail"],
    queryFn: () => getAllProjectDetail(projectId),
    refetchOnWindowFocus: false,
  });
};

export const useGetAllProject = () => {
  return useQuery({
    queryKey: ["projectList"],
    queryFn: fetchProjects,
    refetchOnWindowFocus: false,
  });
};

export const useGetProjectById = (projectId: string) => {
  return useQuery({
    queryKey: ["projectList"],
    queryFn: () => getProject(projectId),
    refetchOnWindowFocus: false,
  });
};

export const useCreateProjectMutation = () => {
  const createProjectMutation = useMutation({
    mutationFn: (newProject: Project) => createProject(newProject),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projectList"] });
      toast.success("Project created successfully");
    },
  });
  return createProjectMutation;
};

export const useUpdateProjectMutation = () => {
  const updateProjectMutation = useMutation({
    mutationFn: (updatedProject: Project) => {
      if (updatedProject._id) {
        return updateProject(updatedProject._id, updatedProject);
      } else {
        throw new Error("Invalid project object - missing _id");
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projectList"] });
      toast.success("Project updated successfully");
    }
  })
  return updateProjectMutation
}

export const useDeleteProjectMutation = () => {
  const deleteProjectMutation = useMutation({
    mutationFn: (projectid: string) => deleteProject(projectid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projectList"] });
      toast.success("Project deleted successfully");
    }
  })
  return deleteProjectMutation
}

// Story query

export const useGetAllStories = () => {
  return useQuery({
    queryKey: ["storyList"],
    queryFn: getStories,
    refetchOnWindowFocus: false,
  });
};

export const useGetStoryByProjectId = (projectId: string) => {
  return useQuery({
    queryKey: ["storyList"],
    queryFn: () => getStoryByProjectID(projectId),
    refetchOnWindowFocus: false,
  });
};


export const useGetStoryById = (storyId: string) => {
  return useQuery({
    queryKey: ["storyList"],
    queryFn: () => getStory(storyId),
    refetchOnWindowFocus: false,
  });
};

export const useCreateStoryMutation = () => {
  const createStoryMutation = useMutation({
    mutationFn: (newStory: Story) => createStory(newStory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storyList"] });
    },
  });
  return createStoryMutation;
};

export const useUpdateStoryMutation = () => {
  const updateStoryMutation = useMutation({
    mutationFn: (updatedStory: Story) => {
      if (updatedStory._id) {
        return updateStory(updatedStory._id, updatedStory);
      } else {
        throw new Error("Invalid story object - missing _id");
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storyList"] })
    }
  })
  return updateStoryMutation
}

export const useDeleteStoryMutation = () => {
  const deleteStoryMutation = useMutation({
    mutationFn: (storyId: string) => deleteStory(storyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storyList"] });
      toast.success("Story deleted successfully");
    }
  })
  return deleteStoryMutation
}
