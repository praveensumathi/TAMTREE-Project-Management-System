import { useMutation, useQuery } from "@tanstack/react-query";
import { createEmployee, deleteEmployee, getAllEmplyees, updateEmployee } from "../http/EmployeeApi";
import { Employee } from "../types/type";
import { queryClient } from "../App";

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
  const createEmployeeMutation = useMutation({
    mutationFn: (newEmployee: Employee) => createEmployee(newEmployee),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employeeList"] });
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
      queryClient.invalidateQueries({ queryKey: ["updateEmployee"] })
    }
  })
  return updateEmployeeMutation
}

export const useDeleteEmployeeMutation = () => {
  const deleteEmployeeMutation = useMutation({
    mutationFn: (id: string) => deleteEmployee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteEmployee"] })
    }
  })
  return deleteEmployeeMutation
}