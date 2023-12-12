import React from "react";
import {
  useCreateEmployeeMutation,
  useGetAllEmployee,
} from "../../hooks/CustomRQHooks";
import { Box, Button } from "@mui/material";
import { Employee } from "../../types/type";

function EmployeeComponent() {
  const {
    data: employees,
    isLoading,
    refetch,
    isFetching,
  } = useGetAllEmployee();

  const createEmployeeMutation = useCreateEmployeeMutation();

  console.log(employees);

  const newEmployee = {
    _id: "",
    employeeId: "1001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    age: 30,
    gender: "Male",
    contact: 123456789,
    address: "123 Main St, Cityville, State, 12345",
  } as Employee;

  const handleAddnewEmployee = async () => {
    await createEmployeeMutation.mutateAsync(newEmployee, {
      onError: (error) => console.log(error.message),
    });
  };

  return (
    <>
      {isLoading || (isFetching && <h1>Loading...</h1>)}
      <Button onClick={() => refetch()}>Refetch Employee</Button>

      <Button onClick={handleAddnewEmployee}>Add new</Button>

      {employees?.map((employee) => (
        <Box>
          {employee.firstName} - {employee.lastName}
        </Box>
      ))}
    </>
  );
}

export default EmployeeComponent;
