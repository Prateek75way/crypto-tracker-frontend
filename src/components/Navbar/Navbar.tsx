import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { resetTokens } from "../../store/reducers/authSlice";
import { motion } from "framer-motion"; // Import Framer Motion

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("User");
  return user ? JSON.parse(user) : null;
};

const ResponsiveAppBar: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const user = getUserFromLocalStorage();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(resetTokens()); // Dispatch logout action
    localStorage.removeItem("User"); // Remove user from local storage
    navigate("/"); // Redirect to login page
  };

  const handleNavigateHome = () => {
    navigate("/");
  };

  const isLoginPage = location.pathname === "/login";

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Brand Name */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={handleNavigateHome}
            sx={{
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              "&:hover": {
                transform: "scale(1.1)",
                color: "white",
              },
            }}
          >
            CRYPTO-
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={handleNavigateHome}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "red",
              letterSpacing: ".3rem",
              textDecoration: "none",
              "&:hover": {
                transform: "scale(1.1)",
                color: "white",
              },
            }}
          >
            TRACKER
          </Typography>

          {/* Navigation Menu for Mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {user &&
                ["Dashboard", "Buy", "Transfer"].map((page) => (
                  <MenuItem
                    key={page}
                    onClick={() => {
                      navigate(`/${page.toLowerCase()}`);
                      handleCloseNavMenu();
                    }}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>

          {/* Navigation Menu for Desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {user &&
              ["Buy", "Transfer", "Profit-and-Loss"].map((page) => (
                <Button
                  key={page}
                  onClick={() => navigate(`/${page.toLowerCase()}`)}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    "&:hover": {
                      background: "rgba(255, 255, 255, 0.1)",
                      borderRadius: 2,
                    },
                  }}
                >
                  {page}
                </Button>
              ))}
          </Box>

          {/* User Profile or Sign In */}
          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Typography sx={{ color: "white", fontWeight: "bold", mr: 1 }}>
                      {user.name}
                    </Typography>
                    {/* First Letter Avatar */}
                    <Avatar
                      sx={{
                        bgcolor: "white",
                        color: "#3f51b5",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      }}
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {["Account", "Dashboard", "Logout", "Change-password"].map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        handleCloseUserMenu();
                        if (setting === "Logout") handleLogout();
                        if (setting === "Change-password") navigate("/change-password");
                        if (setting === "Dashboard") navigate("/dashboard");
                      }}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : isLoginPage ? (
              <Button
                onClick={() => navigate("/")}
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: 2,
                  },
                }}
              >
                Home
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: 2,
                  },
                }}
              >
                Sign In
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;