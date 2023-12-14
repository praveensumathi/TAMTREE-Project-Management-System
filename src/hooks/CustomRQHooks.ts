import { useMutation, useQuery } from "@tanstack/react-query";
import { createEmployee, getAllEmplyees } from "../http/EmployeeApi";
import {
  createTask,
  updateTask,
  deleteTask,
  getAllProjectDetail,
 
} from "../http/TaskApi";
import { Employee } from "../types/type";
import { queryClient } from "../App";
import { ProjectTask } from "../types/boardTypes";

export const useGetAllEmployee = () => {
  return useQuery({
    queryKey: ["emplyeeList"],
    queryFn: getAllEmplyees,
    refetchOnWindowFocus: false,
  });
};

export const useCateringfetchProductData = (projectId: string) => {
  return useQuery({
    queryKey: ["fetchProducts"],
    //queryFn: () => getAllEmplyees(projectId),
    refetchOnWindowFocus: false,
  });
};

export const useCreateEmployeeMutation = () => {
  const createEmployeemutation = useMutation({
    mutationFn: (newEmployee: Employee) => createEmployee(newEmployee),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emplyeeList"] });
      console.log("called inside onSuccess");
    },
  });

  return createEmployeemutation;
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
