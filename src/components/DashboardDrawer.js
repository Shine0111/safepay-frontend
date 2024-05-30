import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import { Home, AddBox, AccountCircle, Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";

const DashboardDrawer = ({ isMobile }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <div>
      <List>
        <ListItem button>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <Link to="/allProducts">
            <ListItemText primary="Products" />
          </Link>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AddBox />
          </ListItemIcon>
          <ListItemText primary="Add New Product" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <nav aria-label="mailbox folders">
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
      >
        <Menu />
      </IconButton>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <div />
        <Divider />
        {drawerContent}
      </Drawer>
    </nav>
  );
};

export default DashboardDrawer;
