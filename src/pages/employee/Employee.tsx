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
import { employees } from "../../seed-data/seed-data";

const handleDeleteEmployeeClick = () => {};

const Employee = () => {
  return (
    <>
      <Container>
        <Box display={"flex "} justifyContent={"space-between"}>
          <Typography variant="h6">Employees</Typography>
          <Button variant="contained" sx={{ textTransform: "none" }}>
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
                <TableCell>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow>
                  <TableCell align="center">{employee.employeeId}</TableCell>
                  <TableCell align="center">{employee.first_name}</TableCell>
                  <TableCell align="center">{employee.last_name}</TableCell>
                  <TableCell align="center">{employee.email}</TableCell>
                  <TableCell align="center">{employee.gender}</TableCell>
                  <TableCell align="center">{employee.age}</TableCell>
                  <TableCell>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={handleDeleteEmployeeClick}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Employee;
