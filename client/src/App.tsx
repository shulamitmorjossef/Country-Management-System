import { Route, Routes } from "react-router-dom";
import CountriesTable from "./pages/CountriesTable";
import EditCountry from "./pages/EditCountry";
import AddCountry from "./pages/AddCountry";
import Navbar from "./components/Navbar";
import EntryPage from "./pages/EntryPage";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import EditProfile from "./pages/EditProfile";


function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/countries" element={<CountriesTable />} />
      <Route path="/edit/:id" element={<EditCountry />} />
      <Route path="/add" element={<AddCountry />} />
      <Route path="/" element={<EntryPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Registration" element={<Registration />} />
      <Route path="/edit-profile" element={<EditProfile />} />
    </Routes>
    </>
  );
}

export default App;


