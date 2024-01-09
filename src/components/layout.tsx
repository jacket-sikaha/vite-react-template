import React, { memo, useMemo, useState } from "react";
import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";
import List from "@mui/joy/List";
import Divider from "@mui/joy/Divider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Menu from "@mui/icons-material/Menu";
import IconButton from "@mui/joy/IconButton";
import { DefaultRoutes } from "../config/route";
import { Link } from "react-router-dom";

const Layout = () => {
  const [open, setOpen] = useState(false);
  const pathList = useMemo(() => {
    return DefaultRoutes[0].children.map(({ path, name }) => ({ path, name }));
  }, []);

  return (
    <div className="w-full h-full">
      <IconButton
        variant="outlined"
        color="neutral"
        onClick={() => setOpen(true)}
      >
        <Menu />
      </IconButton>
      <Drawer size={"sm"} open={open} onClose={() => setOpen(false)}>
        <Box
          role="presentation"
          onClick={() => setOpen(false)}
          onKeyDown={() => setOpen(false)}
        >
          <List>
            {pathList.map(({ path, name }) => (
              <ListItem key={path}>
                <ListItemButton>
                  <Link to={path}>{name}</Link>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text) => (
              <ListItem key={text}>
                <ListItemButton>{text}</ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default Layout;
