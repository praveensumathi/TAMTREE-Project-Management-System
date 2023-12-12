import { useMutation, useQuery } from "@tanstack/react-query";
import { createEmployee, getAllEmplyees } from "../http/EmployeeApi";
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
  const createEmployeemutation = useMutation({
    mutationFn: (newEmployee: Employee) => createEmployee(newEmployee),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emplyeeList"] });
      console.log("called inside onSuccess");
    },
  });

  return createEmployeemutation;
};
