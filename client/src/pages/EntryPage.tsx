import { useNavigate } from "react-router-dom";
import "../styles/EntryPage.scss";

export default function EntryPage() {
  const navigate = useNavigate();

  return (
    <div className="entry-page">
      <div className="entry-page__box">
        <h1>Welcome</h1>
        <button
          className="app-button"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className="app-button"
          onClick={() => navigate("/registration")}
        >
          Register
        </button>
      </div>
    </div>
  );
}
