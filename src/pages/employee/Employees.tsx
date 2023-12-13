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
import { useState } from "react";
import { Employee } from "../../types/type";
import EmployeeDrawer from "../../drawer/EmployeeDrawer";
import {
  useGetAllEmployee,
  useDeleteEmployeeMutation,
} from "../../hooks/CustomRQHooks";
import DialogBox from "../../commonDialogBox/DialogBox";
import Loader from "../../common/components/Loader";

const newEmployee: Employee = {
  _id: "",
  employeeId: "",
  email: "mohi@gmail.com",
  age: 1,
  contact: "6374723428",
  firstName: "Mohi",
  gender: "Female",
  lastName: "Kavi",
  address: "Namakkal",
};
const Employees = () => {
  const deleteEmployeeMutation = useDeleteEmployeeMutation();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [deleteDialogConfirmationOpen, setdeleteDialogConfirmationOpen] =
    useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<Employee | null>(
    null
  );

  const { data: employeeData, isLoading, isFetching } = useGetAllEmployee();

  const employees = employeeData || [];

  const handleEmployeeEditClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDrawerOpen(true);
  };

  const handleEmployeeAddClick = () => {
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

  const handleDeleteConfirmClick = async () => {
    setdeleteDialogConfirmationOpen(true);

    if (deleteConfirmation?._id) {
      await deleteEmployeeMutation.mutateAsync(deleteConfirmation._id, {
        onError: (error) => console.log(error.message),
      });
      setDeleteConfirmation(null);
      setdeleteDialogConfirmationOpen(false);
    }
  };

  return (
    <>
      {isLoading || isFetching ? (
        <Loader />
      ) : (
        <>
          <Container>
            <Box display="flex" justifyContent="space-between">
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
                height: "450px",
                position: "relative",
              }}
            >
              <Table>
                <TableHead
                  sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    backgroundColor: "ButtonFace",
                  }}
                >
                  <TableRow>
                    <TableCell align="center">EMPLOYEE ID</TableCell>
                    <TableCell align="center">FIRST NAME</TableCell>
                    <TableCell align="center">LAST NAME</TableCell>
                    <TableCell align="center">EMAIL</TableCell>
                    <TableCell align="center">GENDER</TableCell>
                    <TableCell align="center">AGE</TableCell>
                    <TableCell align="center">CONTACT</TableCell>
                    <TableCell align="center">ADDRESS</TableCell>
                    <TableCell align="center">ACTIONS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.map((employee, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">
                        {employee.employeeId}
                      </TableCell>
                      <TableCell align="center">{employee.firstName}</TableCell>
                      <TableCell align="center">{employee.lastName}</TableCell>
                      <TableCell align="center">{employee.email}</TableCell>
                      <TableCell align="center">{employee.gender}</TableCell>
                      <TableCell align="center">{employee.age}</TableCell>
                      <TableCell align="center">{employee.contact}</TableCell>
                      <TableCell align="center">{employee.address}</TableCell>
                      <TableCell align="center">
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
          {deleteDialogConfirmationOpen && (
            <DialogBox
              deleteDialogConfirmationOpen={deleteDialogConfirmationOpen}
              handleDeleteCancel={handleDeleteCancel}
              handleDeleteClickConfirm={handleDeleteConfirmClick}
            />
          )}
          {isDrawerOpen && (
            <EmployeeDrawer
              isDrawerOpen={isDrawerOpen}
              handleDrawerClose={() => setIsDrawerOpen(false)}
              selectedEmployee={selectedEmployee}
            />
          )}
        </>
      )}
    </>
  );
};

export default Employees;
