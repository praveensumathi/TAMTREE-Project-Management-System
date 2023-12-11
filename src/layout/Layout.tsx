import NavBar from "./Navbar";
import { Box } from "@mui/material";
import { Outlet } from "react-router";
const Layout = () => {
  return (
    <>
      <NavBar/>
      <Box sx={{ marginTop: "10px" }}>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;