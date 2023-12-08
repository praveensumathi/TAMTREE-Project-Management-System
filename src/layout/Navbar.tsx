import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
 
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AddCardIcon from '@mui/icons-material/AddCard';
import { blue} from "@mui/material/colors";



const menus = [
  {
    name: "Projects",
    url: "/projects",
    
  },
  {
    name: "Stories",
    url: "/stories",
   
  },

];

const NavBar = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleMenuItemClick = (url: string) => {
    navigate(`${url}`);
    handleDrawerClose();
  };

  return (
    <Box paddingBottom={4}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleDrawerOpen}>
            <MenuIcon fontSize="large" />
          </IconButton>
          <Box padding={1}>
            <img
              src={
                "C:\Users\HP\Downloads\images.png"}
              alt="Logo"
              style={{ width: "50px", height: "50px",borderRadius:"50%" }}
            />
          </Box>
          <Typography variant="h5" style={{ margin: "0" }}>TAMTREE TASK MANAGEMENT</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar/>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerClose}
          sx={{
            width: 250, 
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              height:700,
              width: 200, 
              display: 'flex',
              justifyItems:"flex-start",
              alignItems: 'center', 
              cursor:"pointer"
            },
          }}
      >
        <Box width={200}>
          <Box display={"flex"} flexDirection={"row"} padding={1} >
          <IconButton
            color="inherit"
            edge="end"
            onClick={handleDrawerClose}
            sx={{ position: "absolute", right: 15, top: 10 }}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
          </Box>
          <Box paddingTop={2}>
          <List>
  {menus.map((menu, index) => (
    <div key={index}>
      <ListItem onClick={() => handleMenuItemClick(menu.url)}>
        <ListItemButton sx={{ width: 150 }}>
          <ListItemIcon>
            {index === 0 ?  <EventNoteIcon sx={{ color: blue[500] }} />  : <AddCardIcon sx={{ color: blue[500] }} />}
            
          </ListItemIcon>
          <ListItemText
            primary={menu.name}
            primaryTypographyProps={{ color: 'black', fontSize: '20px' }}
          />
        </ListItemButton>
      </ListItem>
      
    </div>
  ))}
</List>
</Box>

        </Box>
      </Drawer>
    </Box>
  );
};

export default NavBar;