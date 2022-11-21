import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import s from "./AppBar.module.scss"
import {Link} from "react-router-dom";
import {ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Add, Movie} from "@mui/icons-material";

const drawerWidth = 260;

export default function AppBarLeft() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            top: "90px",
            background: "#E5EBD0"
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <div className={s.root}>
          <h3>Панель администратора</h3>
        </div>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/admin/movie/add">
              <ListItemIcon>
                <Add/>
              </ListItemIcon>
              <ListItemText>
                Добавить фильм
              </ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/admin/movie/list">
              <ListItemIcon>
                <Movie/>
              </ListItemIcon>
              <ListItemText>
                Список фильмов
              </ListItemText>
            </ListItemButton>
          </ListItem>

        </List>
      </Drawer>
    </Box>
  );
}
