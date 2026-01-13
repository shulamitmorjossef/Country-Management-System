import { useRecoilValue, useSetRecoilState } from "recoil";
import { navbarTitleState } from "../state/navbarTitleAtom";
import { authState } from "../state/auth.atom";
import { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.scss";

export default function Navbar() {
  const title = useRecoilValue(navbarTitleState);
  const auth = useRecoilValue(authState);
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth({ user: null, token: null });
    handleCloseMenu();
    navigate("/login");
  };

  const handleEditProfile = () => {
    handleCloseMenu();
    navigate("/edit-profile");
  }

const handleUserManagement = () => {
  handleCloseMenu();
  navigate("/users");
};



  return (
    <nav className="navbar">
      <div className="navbar__side" />

      <div className="navbar__title">{title}</div>

      <div className="navbar__side navbar__side--right">
        {auth.user && (
          <>
            <IconButton onClick={handleOpenMenu} color="inherit">
              <AccountCircleIcon fontSize="large" />
            </IconButton>

            <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
              <MenuItem onClick={handleEditProfile}>Edit profile</MenuItem>

              {auth.user?.isAdmin && (
                <MenuItem onClick={handleUserManagement}>
                  User management
                </MenuItem>
              )}

              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        )}
      </div>
    </nav>
  );
}
