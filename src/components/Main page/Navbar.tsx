import { useState, useEffect } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import {
  Home,
  Leaderboard,
  MenuBook,
  SportsEsports,
  Groups,
  AccountCircle,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [value, setValue] = useState("home");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    const currentWindow = window.location.pathname.replace("/", "");
    if (currentWindow) setValue(currentWindow);
  }, []);

  return (
    <div className="navbar">
      <BottomNavigation
        sx={{ width: 500 }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          component={Link}
          to="/"
          label="Home"
          value="home"
          icon={<Home fontSize="large" />}
        />
        <BottomNavigationAction
          component={Link}
          to="/book"
          label="Book"
          value="book"
          icon={<MenuBook fontSize="large" />}
        />
        <BottomNavigationAction
          component={Link}
          to="/games"
          label="Games"
          value="games"
          icon={<SportsEsports fontSize="large" />}
        />
        <BottomNavigationAction
          component={Link}
          to="/stats"
          label="Stats"
          value="stats"
          icon={<Leaderboard fontSize="large" />}
        />
        <BottomNavigationAction
          component={Link}
          to="/team"
          label="Team"
          value="team"
          icon={<Groups fontSize="large" />}
        />
        <BottomNavigationAction
          component={Link}
          to="/sign-in"
          label="Account"
          value="sign-in"
          icon={<AccountCircle fontSize="large" />}
        />
      </BottomNavigation>
    </div>
  );
};

export default Navbar;
