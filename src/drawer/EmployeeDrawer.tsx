import {
  Box,
  Button,
  Container,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Employee, EmployeeDrawerProps } from "../types/type";
import { useCreateEmployee, useUpdateEmployee } from "../hooks/CustomRQHooks";

const schema = Yup.object().shape({
  employeeId: Yup.string().required("employee id is required"),
  firstName: Yup.string().required("first name is required"),
  lastName: Yup.string().required("last name is required"),
  email: Yup.string().required("email is required"),
  gender: Yup.string().required("gender is required"),
  age: Yup.number().required("age is required"),
  contact: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Invalid contact number")
    .required("Contact is required"),
  address: Yup.string().required("Address is requried"),
});

const EmployeeDrawer = ({
  isDrawerOpen,
  handleDrawerClose,
  selectedEmployee,
  refetchEmployees,
}: EmployeeDrawerProps) => {
  const updateEmployeeMutation = useUpdateEmployee();
  const createEmployeeMutation = useCreateEmployee();
  const {
    control,
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm<Employee>({
    resolver: yupResolver(schema) as any,
    mode: "all",
  });
  console.log(selectedEmployee);

  useEffect(() => {
    setValue("employeeId", selectedEmployee?.employeeId || "");
    setValue("email", selectedEmployee?.email || "");
    setValue("age", selectedEmployee?.age || 1);
    setValue("contact", selectedEmployee?.contact || "");
    setValue("firstName", selectedEmployee?.firstName || "");
    setValue("lastName", selectedEmployee?.lastName || "");
    setValue("gender", selectedEmployee?.gender || "Male");
    setValue("address", selectedEmployee?.address || "");
  }, [selectedEmployee]);

  const onSubmit: SubmitHandler<Employee> = (formData) => {
    if (selectedEmployee) {
      if (selectedEmployee._id) {
        updateEmployeeMutation.mutate({
          id: selectedEmployee._id,
          formData,
        });
        toast.success("Employee updated successfully");
      } else {
        createEmployeeMutation.mutate(formData);
        toast.success("Employee created successfully");
      }
    }
    refetchEmployees();
    handleDrawerClose();
  };

  return (
    <>
      <Drawer
        anchor="right"
        sx={{ position: "relative" }}
        open={isDrawerOpen}
        PaperProps={{
          sx: {
            width: "500px",
            height: "100%",
          },
        }}
        onClose={handleDrawerClose}
      >
        <Box padding={2} display={"flex"} justifyContent={"space-between"}>
          <Typography variant="h5" fontWeight={"bold"}>
            {selectedEmployee?.employeeId ? "Edit Employee" : "Add Employee"}
          </Typography>
          <Box onClick={handleDrawerClose}>
            <CloseIcon />
          </Box>
        </Box>

        <Container>
          {selectedEmployee && (
            <Box display={"flex"} flexWrap={"wrap"} rowGap={2}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box display={"flex"} flexWrap={"wrap"} rowGap={2}>
                  <Controller
                    name="employeeId"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="Employee Id"
                        {...field}
                        error={!!errors.employeeId}
                        helperText={errors.employeeId?.message}
                        {...register("employeeId", {
                          required: true,
                        })}
                      />
                    )}
                  />

                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        type="text"
                        label="First Name"
                        {...field}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                        {...register("firstName", {
                          required: true,
                        })}
                      />
                    )}
                  />

                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="Last Name"
                        type="text"
                        {...field}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                        {...register("lastName", {
                          required: true,
                        })}
                      />
                    )}
                  />
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        {...field}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        {...register("email", {
                          required: true,
                        })}
                      />
                    )}
                  />
                  <Controller
                    name="age"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="Age"
                        {...field}
                        error={!!errors.age}
                        helperText={errors.age?.message}
                        {...register("age", {
                          required: true,
                        })}
                      />
                    )}
                  />
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <FormControl component="fieldset">
                        <FormLabel sx={{}}>Gender</FormLabel>
                        <RadioGroup
                          row
                          value={field.value}
                          onChange={(e) => setValue("gender", e.target.value)}
                        >
                          <FormControlLabel
                            value="Male"
                            control={<Radio />}
                            label="Male"
                          />
                          <FormControlLabel
                            value="Female"
                            control={<Radio />}
                            label="Female"
                          />
                        </RadioGroup>
                      </FormControl>
                    )}
                  />
                  <Controller
                    name="contact"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="Contact"
                        {...field}
                        error={!!errors.contact}
                        helperText={errors.contact?.message}
                        {...register("contact", {
                          required: true,
                        })}
                      />
                    )}
                  />
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="Address"
                        {...field}
                        error={!!errors.address}
                        helperText={errors.address?.message}
                        {...register("address", {
                          required: true,
                        })}
                      />
                    )}
                  />
                  <Box position={"absolute"} bottom={0} right={0} padding={2}>
                    <Button
                      variant="contained"
                      type="submit"
                      style={{ margin: "10px" }}
                      autoFocus
                    >
                      Save
                    </Button>
                    <Button variant="contained" onClick={handleDrawerClose}>
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </form>
            </Box>
          )}
        </Container>
      </Drawer>
    </>
  );
};

export default EmployeeDrawer;
