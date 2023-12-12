import { Employee } from "../types/type";
import { base } from "./BaseUrl";

export const fetchEmployees = async () => {
    const baseUrl = import.meta.env.VITE_AXIOS_BASE_URL;
    console.log(baseUrl);

    const getApi = "/employee/getEmployee";
    try {
        const response = await base.get(getApi);
        const employee = response.data;
        return employee;
    } catch (error) {
        console.error("Error in fetchEmployees:", error);
        throw error;
    }
};

export const updateEmployee = async (id: string, formData: Employee) => {
    const updateApi = `/employee/updateEmployee/${id}`;
    try {
        const response = await base.put(updateApi, formData);
        const updatedEmployee = response.data;
        return updatedEmployee;
    } catch (error) {
        console.error("Error in updateUser:", error);
        throw error;
    }
};
export const createEmployee = async (formData: Employee) => {
    const createApi = "/employee/createEmployee";
    try {
        const response = await base.post(createApi, formData);
        const createdEmployee = response.data;
        return createdEmployee;
    } catch (error) {
        console.error("Error in createUser:", error);
        throw error;
    }
};
export const deleteEmployee = async (id: string) => {
    const deleteApi = `/employee/deleteEmployee/${id}`;
    try {
        await base.delete(deleteApi);
        console.log("User deleted successfully");
    } catch (error) {
        console.error("Error in deleteUser:", error);
        throw error;
    }
};