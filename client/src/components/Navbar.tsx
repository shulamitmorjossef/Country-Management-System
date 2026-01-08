// import { useRecoilValue } from "recoil";
// import { navbarTitleState } from "../state/navbarTitleAtom";

// export default function Navbar() {
//   const title = useRecoilValue(navbarTitleState);

//   return (
//     <nav style={{
//       backgroundColor: "#942d0e",
//       padding: "1rem",
//       color: "white",
//       textAlign: "center",
//       fontWeight: "bold",
//       fontSize: "1.2rem"
//     }}>
//       {title}
//     </nav>
//   );
// }



import { useRecoilValue, useSetRecoilState } from "recoil";
import { navbarTitleState } from "../state/navbarTitleAtom";
import { authState } from "../state/auth.atom";
import { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

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

//   return (
//     <nav
//       style={{
//         backgroundColor: "#942d0e",
//         padding: "1rem",
//         color: "white",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//         fontWeight: "bold",
//         fontSize: "1.2rem",
//       }}
//     >
//       {/* כותרת */}
//       <div>{title}</div>

//       {/* אייקון יוזר – רק אם יש משתמש מחובר */}
//       {auth.user && (
//         <>
//           <IconButton onClick={handleOpenMenu} color="inherit">
//             <AccountCircleIcon fontSize="large" />
//           </IconButton>

//           <Menu
//             anchorEl={anchorEl}
//             open={open}
//             onClose={handleCloseMenu}
//           >
//             <MenuItem onClick={handleCloseMenu}>
//               Edit profile
//             </MenuItem>
//             <MenuItem onClick={handleLogout}>
//               Logout
//             </MenuItem>
//           </Menu>
//         </>
//       )}
//     </nav>
//   );
// }
return (
  <nav
    style={{
      backgroundColor: "#942d0e",
      padding: "1rem",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "relative",
      fontWeight: "bold",
      fontSize: "1.2rem",
    }}
  >
    {/* צד שמאל – ריק כדי לאזן */}
    <div style={{ width: "40px" }} />

    {/* כותרת באמצע אמיתי */}
    <div
      style={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {title}
    </div>

    {/* צד ימין – אייקון */}
    {auth.user && (
      <>
        <IconButton onClick={handleOpenMenu} color="inherit">
          <AccountCircleIcon fontSize="large" />
        </IconButton>

        <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
          <MenuItem onClick={handleCloseMenu}>Edit profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </>
    )}
  </nav>
);
}