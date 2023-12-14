import { useMutation, useQuery } from "@tanstack/react-query";
import {  Project, Story } from "../types/type";
import { queryClient } from "../App";
import { createStory, deleteStory, getStories, getStory, updateStory } from "../http/StoryApi";
import { createProject, deleteProject, fetchProjects, getProject, updateProject } from "../http/ProjectApi";


// Project query

export const useGetAllProject = () => {
  return useQuery({
    queryKey: ["projectList"],
    queryFn: fetchProjects,
    refetchOnWindowFocus: false,
  });
};

export const useGetProjectById = (projectId: string) => {
  return useQuery({
    queryKey: ["getProject"],
    queryFn: () => getProject(projectId),
    refetchOnWindowFocus: false,
  });
};

export const useCreateProjectMutation = () => {
  const createProjectMutation = useMutation({
    mutationFn: (newProject: Project) => createProject(newProject),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projectList"] });
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
      queryClient.invalidateQueries({ queryKey: ["projectList"] })
    }
  })
  return updateProjectMutation
}

export const useDeleteProjectMutation = () => {
  const deleteProjectMutation = useMutation({
    mutationFn: (projectid: string) => deleteProject(projectid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projectList"] })
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

export const useGetStoryById = (storyId: string) => {
  return useQuery({
    queryKey: ["getStory"],
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
    mutationFn: (updatedStory:Story) => {
      if (updatedStory._id) {
        return updateStory(updatedStory._id,updatedStory);
      } else {
        throw new Error("Invalid story object - missing _id");
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updateStory"] })
    }
  })
  return updateStoryMutation
}

export const useDeleteStoryMutation = () => {
  const deleteStoryMutation = useMutation({
    mutationFn: (storyId: string) => deleteStory(storyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteStory"] })
    }
  })
  return deleteStoryMutation
}

