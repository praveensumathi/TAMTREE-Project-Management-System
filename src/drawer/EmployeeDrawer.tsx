import {
  Box,
  Button,
  Container,
  Drawer,
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

const schema = Yup.object().shape({
  employeeId: Yup.string().required("employee id is required"),
  first_name: Yup.string().required("first name is required"),
  last_name: Yup.string().required("last name is required"),
  email: Yup.string().required("email is required"),
  gender: Yup.string().required("gender is required"),
  age: Yup.number().required("age is required"),
  contact: Yup.number().required("contact is required"),
});

const EmployeeDrawer = ({
  isDrawerOpen,
  handleDrawerClose,
  selectedEmployee,
  handleEmployeeUpdate,
}: EmployeeDrawerProps) => {
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
  useEffect(() => {
    setValue("employeeId", selectedEmployee?.employeeId || "");
    setValue("email", selectedEmployee?.email || "");
    setValue("age", selectedEmployee?.age || 1);
    setValue(
      "contact",
      selectedEmployee?.contact ? Number(selectedEmployee.contact) : 0
    );
    setValue("first_name", selectedEmployee?.first_name || "");
    setValue("last_name", selectedEmployee?.last_name || "");
    setValue("gender", selectedEmployee?.gender || "");
  }, [selectedEmployee]);

  const onSubmit: SubmitHandler<Employee> = async (formData) => {
    if (selectedEmployee) {
      handleEmployeeUpdate({ ...selectedEmployee, ...formData });
      if (selectedEmployee._id) {
        toast.success("Employee updated successfully");
      } else {
        toast.success("Employee created successfully");
      }
    }

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
          <Typography variant="h5">
            {selectedEmployee?._id ? "Edit Employee" : "Add Employee"}
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
                    name="first_name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        type="text"
                        label="First Name"
                        {...field}
                        error={!!errors.first_name}
                        helperText={errors.first_name?.message}
                        {...register("first_name", {
                          required: true,
                        })}
                      />
                    )}
                  />

                  <Controller
                    name="last_name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="Last Name"
                        type="text"
                        {...field}
                        error={!!errors.last_name}
                        helperText={errors.last_name?.message}
                        {...register("last_name", {
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
                      <TextField
                        fullWidth
                        label="Gender"
                        {...field}
                        error={!!errors.gender}
                        helperText={errors.gender?.message}
                        {...register("gender", {
                          required: true,
                        })}
                      />
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
