import { Route, Routes } from "react-router-dom";
import CountriesTable from "./pages/CountriesTable";
import EditCountry from "./pages/EditCountry";
import AddCountry from "./pages/AddCountry";
import Navbar from "./components/Navbar";
import EntryPage from "./pages/EntryPage";


function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/countries" element={<CountriesTable />} />
      <Route path="/edit/:id" element={<EditCountry />} />
      <Route path="/add" element={<AddCountry />} />
      <Route path="/" element={<EntryPage />} />
    </Routes>
    </>
  );
}

export default App;


