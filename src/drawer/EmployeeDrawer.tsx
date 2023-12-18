import {
  Box,
  Button,
  Container,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Employee, EmployeeDrawerProps } from "../types/type";
import {
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
} from "../hooks/CustomRQHooks";

const schema = Yup.object().shape({
  employeeId: Yup.string().required("Employee id is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().required("Email is required"),
  gender: Yup.string().required("Gender is required"),
  age: Yup.number().required("Age is required"),
  contact: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Invalid contact number")
    .required("Contact is required"),
  address: Yup.string().required("Address is requried"),
});

const EmployeeDrawer = ({
  isDrawerOpen,
  handleDrawerClose,
  selectedEmployee,
}: EmployeeDrawerProps) => {
  const createEmployeeMutation = useCreateEmployeeMutation();
  const updateEmployeeMutation = useUpdateEmployeeMutation();
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

  const onSubmit: SubmitHandler<Employee> = async (employeeFormData) => {
    console.log("EmployeeUpdate", employeeFormData);

    if (selectedEmployee) {
      if (selectedEmployee._id) {
        await updateEmployeeMutation.mutateAsync(
          {
            ...employeeFormData,
            _id: selectedEmployee._id,
          },
          {
            onError: (error) => console.log(error.message),
          }
        );
      } else {
        await createEmployeeMutation.mutateAsync(employeeFormData, {
          onError: (error) => console.log(error.message),
        });
      }
    }
    handleDrawerClose();
  };

  return (
    <Box>
      {selectedEmployee && (
        <Drawer
          sx={{ position: "relative" }}
          anchor="right"
          open={isDrawerOpen}
          PaperProps={{
            sx: {
              width: "400px",
              height: "100%",
            },
          }}
        >
          <Box padding={2} display={"flex"} justifyContent={"space-between"}>
            <Typography variant="h5" fontWeight={"bold"}>
              {selectedEmployee?._id ? "Edit Employee" : "Add Employee"}
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Container>
            <Box display={"flex"} flexWrap={"wrap"}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box display={"flex"} flexWrap={"wrap"} rowGap={1}>
                  <TextField
                    fullWidth
                    label="Employee Id"
                    error={!!errors.employeeId}
                    helperText={errors.employeeId?.message}
                    {...register("employeeId")}
                  />

                  <TextField
                    fullWidth
                    type="text"
                    label="First Name"
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    {...register("firstName")}
                  />

                  <TextField
                    fullWidth
                    label="Last Name"
                    type="text"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    {...register("lastName")}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    {...register("email", {
                      required: true,
                    })}
                  />

                  <TextField
                    fullWidth
                    label="Age"
                    error={!!errors.age}
                    helperText={errors.age?.message}
                    {...register("age")}
                  />

                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <FormControl>
                        <FormLabel>Gender</FormLabel>
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
                  <TextField
                    fullWidth
                    label="Contact"
                    error={!!errors.contact}
                    helperText={errors.contact?.message}
                    {...register("contact")}
                  />
                  <TextField
                    fullWidth
                    label="Address"
                    error={!!errors.address}
                    helperText={errors.address?.message}
                    {...register("address")}
                  />
                  <Box
                    position={"absolute"}
                    bottom={7}
                    right={10}
                    display={"flex"}
                    columnGap={2}
                  >
                    <Button
                      variant="contained"
                      type="submit"
                      autoFocus
                      sx={{ textTransform: "none" }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleDrawerClose}
                      sx={{ textTransform: "none" }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </form>
            </Box>
          </Container>
        </Drawer>
      )}
    </Box>
  );
};

export default EmployeeDrawer;
