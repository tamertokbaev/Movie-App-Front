import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import s from "./AppBar.module.scss"
import {Link} from "react-router-dom";
import {ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Add, FormatAlignLeft, Movie} from "@mui/icons-material";

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
            paddingTop: "90px",
            background: "#272b35",
            zIndex: 1
          },
          zIndex: 1
        }}
        variant="permanent"
        anchor="left"
      >
        <div className={s.root}>
          <h3>Admin panel</h3>
        </div>
        <Divider sx={{background: "#fafafa"}}/>
        <List>
          <ListItem sx={{color: "#fafafa"}} disablePadding>
            <ListItemButton component={Link} to="/admin/movie/add">
              <ListItemIcon sx={{color: "#fafafa"}}>
                <Add/>
              </ListItemIcon>
              <ListItemText>
                Add movie
              </ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem sx={{color: "#fafafa"}} disablePadding>
            <ListItemButton component={Link} to="/admin/movie/list">
              <ListItemIcon sx={{color: "#fafafa"}}>
                <Movie/>
              </ListItemIcon>
              <ListItemText>
                List of movies
              </ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem sx={{color: "#fafafa"}} disablePadding>
            <ListItemButton component={Link} to="/admin/genre/add">
              <ListItemIcon sx={{color: "#fafafa"}}>
                <Add/>
              </ListItemIcon>
              <ListItemText>
                Add genre
              </ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem sx={{color: "#fafafa"}} disablePadding>
            <ListItemButton component={Link} to="/admin/genre/list">
              <ListItemIcon sx={{color: "#fafafa"}}>
                <FormatAlignLeft/>
              </ListItemIcon>
              <ListItemText>
                List of genres
              </ListItemText>
            </ListItemButton>
          </ListItem>

        </List>
      </Drawer>
    </Box>
  );
}
