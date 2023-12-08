import {
  Box,
  Button,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { employee } from "../../seed-data/seed-data";
import { useState } from "react";
import { Employee } from "../../types/type";
import EmployeeDrawer from "../../drawer/EmployeeDrawer";
import ProjectDialogBox from "../../commonDialogBox/ProjectDialogBox";
import toast from "react-hot-toast";

const Employees = () => {
  const [employees, setEmployees] = useState(employee);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [deleteDialogConfirmationOpen, setdeleteDialogConfirmationOpen] =
    useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<Employee | null>(
    null
  );

  const handleEmployeeEditClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDrawerOpen(true);
  };

  const handleEmployeeAddClick = () => {
    const newEmployee: Employee = {
      _id: "new_id",
      employeeId: "",
      email: "",
      age: 0,
      contact: 0,
      first_name: "",
      gender: "",
      last_name: "",
    };

    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
    setSelectedEmployee(newEmployee);
    setIsDrawerOpen(true);
  };

  const handleEmployeeDeleteClick = (employee: Employee) => {
    setDeleteConfirmation(employee);
    setdeleteDialogConfirmationOpen(true);
  };

  const handleDeleteCancel = () => {
    setdeleteDialogConfirmationOpen(false);
  };

  const handleDeleteClickConfirm = () => {
    if (deleteConfirmation) {
      deleteEmployee(deleteConfirmation);
    }
    setdeleteDialogConfirmationOpen(false);
  };

  const handleEmployeeUpdate = (updatedEmployee: Employee) => {
    setEmployees((prevEmployees) => {
      const updatedEmployees = prevEmployees.map((employee) =>
        employee._id === updatedEmployee._id ? updatedEmployee : employee
      );
      return updatedEmployees;
    });
    setSelectedEmployee(updatedEmployee);
  };

  const deleteEmployee = (employeeToDelete: Employee) => {
    const updatedEmployees = employees.filter(
      (employee) => employee._id !== employeeToDelete._id
    );
    setEmployees(updatedEmployees);
    toast.success("employee deleted succesfully");
  };
  return (
    <>
      <Container>
        <Box display={"flex "} justifyContent={"space-between"}>
          <Typography variant="h6">Employees</Typography>
          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={handleEmployeeAddClick}
          >
            + Add Employee
          </Button>
        </Box>
        <TableContainer
          sx={{
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            marginTop: 3,
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">EMPLOYEE ID</TableCell>
                <TableCell align="center">FIRST NAME</TableCell>
                <TableCell align="center">LAST NAME</TableCell>
                <TableCell align="center">EMAIL</TableCell>
                <TableCell align="center">GENDER</TableCell>
                <TableCell align="center">AGE</TableCell>
                <TableCell align="center">CONTACT</TableCell>
                <TableCell>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{employee.employeeId}</TableCell>
                  <TableCell align="center">{employee.first_name}</TableCell>
                  <TableCell align="center">{employee.last_name}</TableCell>
                  <TableCell align="center">{employee.email}</TableCell>
                  <TableCell align="center">{employee.gender}</TableCell>
                  <TableCell align="center">{employee.age}</TableCell>
                  <TableCell align="center">{employee.contact}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEmployeeEditClick(employee)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleEmployeeDeleteClick(employee)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <ProjectDialogBox
        deleteDialogConfirmationOpen={deleteDialogConfirmationOpen}
        handleDeleteCancel={handleDeleteCancel}
        handleDeleteClickConfirm={handleDeleteClickConfirm}
      />
      {isDrawerOpen && (
        <EmployeeDrawer
          isDrawerOpen={isDrawerOpen}
          handleDrawerClose={() => setIsDrawerOpen(false)}
          selectedEmployee={selectedEmployee}
          handleEmployeeUpdate={handleEmployeeUpdate}
        />
      )}
    </>
  );
};

export default Employees;
