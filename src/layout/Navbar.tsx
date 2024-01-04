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
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AddCardIcon from "@mui/icons-material/AddCard";
import { blue } from "@mui/material/colors";

const menus = [
  {
    name: "Projects",
    url: "/projects",
  },
  {
    name: "Employee",
    url: "/employees",
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
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA8FBMVEWKHkCOIkSIH0CMHUCHH0CDCDaGEDmEADGNHECJGj6FADN/ADGDAC57ACbx8emJHT/DmqDay8yueIXRuLvcx8WNNU78+/Tk2dWHDjh8AC6GADLw7eh7ACr6//m/oKTz9e2AACWYR1zm1dV3ACqmbHqFACz0+O2hYnHMqK/Ks7X89/KLKEn7//zz+PCRM0+DIUC3g4+RPlizi5b16OWcWGnNtbukZnaoYXWjUWe6hY/l4d2sfISVNFCydoiZQlmndIOFO095AB7w39/bv8bc39bSycrk0NPDnqq9jJvc1tO3kZZ5AA/FiZuqZXrAlqSlTmjtnLpkAAAMu0lEQVR4nO2dDVfiOBfHa9qmSfpGoZRgKBUGEIoFhCpMHd1d3GGU2Z3n+3+bJ0VnxpnZsypNXevp33OQ8Nb8uMnN202QDt66pAPpbaskLL5KwuKrJCy+SsLiqyQsvkrC4qskLL5KwuKrJCy+SsLiqyQsvkrC4qskLL5KwuKrJCy+SsLiqyQsvkrC4qskLL5KwuKrJCy+SsLiqyQsvkrC4qskFCwb7/SSl3wBQiAhJAFIVWIY6rR+Wp9gvaWrBGJbkmVZkvO9/AsQyhhqJljORm6DsTD0PC+0WLdWqa6oSWju9syb0IbEPJ27C99vuMObWS9edeK4dzFvuw3L95Kz2aSlQjvPHORJKEuYqOdnlrc+q07MpkYohZDXQggpJZpuqssUnY2WRMcgt1zkSIhVfTUKQrdaTwuj8isDwLRpdmabKKzF/dyKa16EMiDwfeI7VaxBxP2J/Atg6mQAkjglunC95L2i2bKUg9vJiVDRcZtF7Q/G9AmmQbB5UGHhcKyjHAprPoRU+xRac5XYT8uxjBTVuEy8oUoKYUMFG5eBNW+S59UsaPaSkxsdK4KzI54Qa52u36YqeG5WAW3NoiQ2BLsc0YQAaxXfudLs5zsNWUEUD/2hCiUgsLAKJlTI6Tq6aO5tBmzELLki6PUS9qu+c0AyVCUA9Zo/ayFxWRJKiJojf3uUsR7h1m/+SLeFWVEkIaab4NjI/DEyuWJdlYoyozhCQKdJMoECPkjCdjcZY0H9G3GE9PfFBgoA5EJYd9mECvkscYSwbl2/Q4Kaa97m1FhdzNclipD+zmqmQB+P3tXYgZC2XxAhni7cptBuM+rXGAQC3I0QQqQYyUdNFtmjRJLS3zQOlezuRowNzY9rXfRUBJqqSc3I/rUJITTa4RSL7sHLCh0HFe012BDQY78jxu/9JBr7x5nbDAGEeBy8J1k/5J+lbaNxVoealZAXIs1xDdHD1q96t7k9krL56Mw2RGQWgdymdXHdn6nZPiIrIUDKoJoxD/+mw60/zlZAMhO2ao7IvswvOurW+pk+ICshjP1JrksP+PRklekCGQmB0Rhq+c3IpyLnV/8lIb0IlbxXj2C2C2Qk1JJ2Tk2hMGUjhL0oj4l4ocpG2Oy2yZsmhCt/kldvRpgyEZKzj9mn1vJWBkLZ1k+WuYwphCqLDeF7lq278SLKQmhsKjn2SEUpAyE+8LP1Nl5GGQhhlZl5h/sIUJZSah8ImArLXZlai1wjfUSpjE0UL/BraE2uEkUoP31hGr2sAxZFiMBTMw6Ugxetv6II1UrwxJGqvulqQi75RIkjZE8ldJ2CEyoSkB46kzRsL/3PH939/wfC3VPf3nN3R5g/Ekl4dw+Sltk//B4wConK72NI4V2U1A+EuxqJqGGa+vcgsZ+SGSWGEGtHFWYSzoiPem6yaJx1NHyYJg9b55/mY0qu5pVVX05f+Yfr/KHx7B9SmxjpugvUbxzGnIpytwgDtfnHBetWxoImgIQQ2mPHSQLndkbxuOsv3Jobem24WWIwcRp+6Hm9ykkQejUd4fjWWVhON6bNzaxVCStUIrHlr2u1rje44EwyjZm3dtOkoOWevQkx/T74tcfXtT/Z9fUFGbNg9k4jTXvou4MqtOth2DOn12HYVlsz/4bA2KklyfXHFTLDtus7MabH3jrmhbJVT06OoQTjwfp4l2yc9IQMr/cjBBIe31T1b2msmxXW0qjhBjFBClBQazsILiGuR5X+FLVY17SlltvgRuzflVJkWiy67EN7bDVUqkwVo+23CQKAJQpVwFTbesMHNlSQYUCwV0Dfnja0VRb5wwfj352noUt/fp8tu+9EVU7oVSGQjNsauXsJ+uppkMmiL02eGnpXUALIrPjtpqyoba9D+YClf+OPWg948OkmmZG9RjL7EcqwN7ACi37vnOwIyYjRr3Nv8Nj/TtjYEbZ/IAyTJpIAWbvpZJb5ya8YMlK09S1PKhxwyJPfL0huA+ad7uVe9yNUeNat4Pbw+yO79lDvOs2vXzMee2k9fEj4ow3DEX87nkRbXhJaQ++Tyd9kAyudGDE4oPnDBXVmsUEP7hN8smcpRbTXva4/+E7vCV3tqw3xh8cI0/UA/k1xwiYvoruAS3sc8qSx5YA/wqiVKFrre60G71lKJQAN7WGM146w6TRaXzPBncwTCG3A2rrR9tr93X4MGbKRZmzD9s/TsAqJL+39IoeF9mlIZfDNrmT+iA29Ni+PitFdf+YWNFC6P0pWNMf644Yb1N4lH14A7rt3SGi/1P4wcM27jGCFPYUQwEv/elDpI/4EHOsyPvedwbCfDjbhuCkkZ0JtiNTURaRbm4jSHQyeQMidjDuofcaYN5RxuNGkVm3gfuafAPsdthYyBhFqQ87SPvnzsl6/qrDot/t6SB8Q4h/q4Y4Q041/vazX45GfpOvlxE2Tk9UoYr+/ptjEOxvysmX0Et+PfN+9Uk7S9pDf8AfXKSG9G2DpzubOhp92hADpFXbie344wjBth5rbu2RNERNCK4pQOZjYO9cKD+N55eJUx+jDVAZoMkVpqzdG316CJrvQhrvHUtlker7d9sbavcnI9HhbqY5F7SwRRQiAch9GqECo0jRIGyBOt7uRcLoB6v4lwL7LOv62KQrYkFKIHiRVCEWFG5fzpW9A+ROidA44nXWR76dq+CCIl1deZvl/rpwvnz8hgIi3dmmHBFIMoKxCGfFaBu200bMpzn3uNPeVGTqbxkv9L9umN8vO9FL9628F3pxfXU5vlvFl/XyZ+xJkBkIFq/KjvX17etnrxAdV5QBe1P9efVGXMU7v9UDnS+cSz1fZgtaeoAyE6Io9vscMn35Y1Ven8f+meNWhq86H0yvM78HVwWpcX40/rMZ5F9MspVQNzx+fK8I24n+YDxQwBgjJ6aY0nrIRlvnD9uuuh3qtpr/pNWCFHnvq6w9VyORLj9hM0AazHJWJkN403nTUVzqQD+Mcz+wQo2x9msOh2xS4KTkXZSPE9XC/adoXVDZCuXmWca9A/srY80YTv/PKjZiNEEj68NYUNhzPRVlHTzb2evBNE8pku1Bfddct+wj4KBlqLxzI9SxlJ8Qd/5i+YisKmMXQK+wpp0E9T3J6kJ2UcXPlTgIIFT25Ft49BRKZXu61IvqzRBDSuvdFNCJtzZlfFYEoZK5N7fnnqsD+qSIdxuuIBTMqoB0SM5totD0R+9W/xv7ZzaFnMRYtsQAPJoYQHLlsknkcRXpx+jUBDJ3I4kqORDRCok7+UDdMyVhOSdtfvONGQ7oTMg7oHf+HMVG/CivJYpopR3gSWcEY8CJ6He0ABe3dFDarj3GKuGe9kRUZqe2ABROsGMO0iA6is3difJe4dQuOyOr7TUzZKv9qNJcTovSQjZ0Fh01Bh7YJXJlBaiOI95lABeqQj09IYlmsPyWLgBNGw5aoA4aFnmZm1PyL1vPf1695DX0XR+ZoZM7LaBBu3726KOid7ObWH/Wf20elF5EVQXrJHU1FH3MDBkGPSMIWFgWvH2oxS06fd9yQoi8Cy5MO2/z2tN8N2aC7Z3X+ZwkmRBS4/o3+jGYDkBlvHBjUeCvf+Fzj5hzqQkcqggnT5qwaruMmfqonBIYTWEHjUGVW2KsNwrWAcwl/kPhVbplMRydnY/2JJ+zaSlrzasbEsxaOF1Sg6JUQ8YTcjEan4Vfw03ZMwCV3noMq+TuwonCktIjZ14SefJ1PpAI0zxveaNyn9qPDHzLknVDWN9vRgjHmcSXX87qGhQ3G8jrtmvbPu567VB81ZGttsWA7S/wFt2E6ouDJyHPEBTDkRCgDBbY6tWAxXGkqTUNnfmnBQdpnkWEn5KZb+Os5HFdHXeZF0SDwgs1K2Op3nvE0+BDMbj026klGGqj207MyhioxO7Uosph7rqsYQ10D9c6y14uFhe1JeUcMYWLU5w6vWqNZrB5pGiE0FSFEM8xxr/Jx4Vm3jmd1L4iOkSIDO/1dAWiLPBIm95goTJv6+bDreSdW1z0bVrbz+Zf2sOYkvheua7OJaRwdB2EQDev6425pH73EL3jYUDW0Tm87crvJzpckDXe07XXUpgrTjsFhhwVsELXzCXt4idhEgHg/GqeFs9kyNE3jN7ycQgxA+vMsUnp+7ZpXxsjV99xw8K96HdGXFDoRY4OhUZxff3imFNwc+pZ1ciquof+m10GYDi3PWRAOczg47LUQ8l4QrYRnb5mQ94LIWFLeaj28Vy6Biq+KMBeVhMVXSVh8lYTFV0lYfJWExVdJWHyVhMVXSVh8lYTFV0lYfJWExVdJWHyVhMVXSVh8lYTFV0lYfJWExVdJWHyVhMVXSVh8lYTFV0lYfJWExVdJWHy9eUKbE751/R83pxSGdOqfBQAAAABJRU5ErkJggg=="
              }
              alt="Logo"
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
          </Box>
          <Typography variant="h5" style={{ margin: "0" }}>
            TAMTREE TASK MANAGEMENT
          </Typography>
        </Toolbar>
      </AppBar>

      <Toolbar />
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerClose}
        sx={{
          width: 250,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            height: 700,
            width: 200,
            display: "flex",
            justifyItems: "flex-start",
            alignItems: "center",
            cursor: "pointer",
          },
        }}
      >
        <Box width={200}>
          <Box display={"flex"} flexDirection={"row"} padding={1}>
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
                        {index === 0 ? (
                          <EventNoteIcon sx={{ color: blue[500] }} />
                        ) : (
                          <AddCardIcon sx={{ color: blue[500] }} />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={menu.name}
                        primaryTypographyProps={{
                          color: "black",
                          fontSize: "20px",
                        }}
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
