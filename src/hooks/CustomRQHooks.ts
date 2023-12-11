import { createEmployee, deleteEmployee, fetchEmployees, updateEmployee } from "../http/api";
import { Employee } from "../types/type";
import { useQuery, useQueryClient, useMutation } from "react-query";


export const useEmployeeQuery = () => {
    return useQuery<Employee[]>("employeeList", fetchEmployees);
};

export const useUpdateEmployee = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation(
        (updateData: { id: string; formData: Employee }) => updateEmployee(updateData.id, updateData.formData),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('employeeList');
            },
        }
    );
    return mutation;
};

export const useDeleteEmployee = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation(
        (id: string) => deleteEmployee(id),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('employeeList');
            },
        }
    );
    return mutation;
};

export const useCreateEmployee = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation(
        (formData: Employee) => createEmployee(formData),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('employeeList');
            },
        }
    );

    return mutation;
};
