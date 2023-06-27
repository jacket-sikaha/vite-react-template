import {
  Box,
  Typography,
  IconButton,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Footer() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  return (
    <>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            switch (newValue) {
              case 0:
                navigate("/");
                break;
              case 1:
                navigate("/a");
                break;
              default:
                navigate("/user");
                break;
            }
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
        </BottomNavigation>
      </Paper>
    </>
  );
}

export default Footer;
