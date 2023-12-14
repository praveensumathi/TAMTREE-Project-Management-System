import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createTask,
  updateTask,
  deleteTask,
  getAllProjectDetail,
} from "../http/TaskApi";
import { queryClient } from "../App";
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
