import { useRecoilValue } from "recoil";
import { navbarTitleState } from "../state/navbarTitleAtom";

export default function Navbar() {
  const title = useRecoilValue(navbarTitleState);

  return (
    <nav style={{
      backgroundColor: "#942d0e",
      padding: "1rem",
      color: "white",
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "1.2rem"
    }}>
      {title}
    </nav>
  );
}
