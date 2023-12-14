import { Employee } from "../types/type";
import { http } from "./Axios";

const getAllEmplyees = async () => {
  try {
    const response = await http.get<Employee[]>("employee/getEmployee");
    return response.data;
  } catch (error) { throw error }
};

const createEmployee = async (newEmployee: Employee) => {
  try {
    const response = await http.post<Employee>(
      "/employee/createEmployee",
      newEmployee
    );
    if (response.data && response.data._id) {
      return response.data;
    } else {
      throw new Error("Error while create employee");
    }
  } catch (error) {
    throw error;
  }
};

export const updateEmployee = async (updatedEmployee: Employee) => {
  const updateApi = `employee/updateEmployee/${updatedEmployee._id}`;
  try {
    const response = await http.put(updateApi, updatedEmployee);
    if (response.data && response.data._id) {
      return response.data;
    } else {
      throw new Error("Error while update employee");
    }
  } catch (error) {
    console.error("Error in updateUser:", error);
    throw error;
  }
};

export const deleteEmployee = async (id: string) => {
  const deleteApi = `employee/deleteEmployee/${id}`;
  try {
    await http.delete(deleteApi);
    console.log("User deleted successfully");
  } catch (error) {
    console.error("Error in deleteUser:", error);
    throw error;
  }
};

export { getAllEmplyees, createEmployee };
