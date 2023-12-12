import { Employee } from "../types/type";
import { http } from "./Axios";

const getAllEmplyees = async () => {
  try {
    const response = await http.get<Employee[]>("employee/getEmployee");

    return response.data;
  } catch (error) {}
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

export { getAllEmplyees, createEmployee };
