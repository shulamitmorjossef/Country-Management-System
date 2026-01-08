import { useNavigate } from "react-router-dom";
import CountryForm from "../components/CountryForm";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { navbarTitleState } from "../state/navbarTitleAtom";
import { Snackbar, Alert } from "@mui/material";
import { MESSAGES } from "../utils/constant";
import { SEVERITY } from "../utils/constant";
import { useCreateCountryToast } from "../api/countryQueries";



export default function AddCountry() {
  const navigate = useNavigate();
  const [, setTitle] = useRecoilState(navbarTitleState);
  const [toast, setToast] = useState<{severity: "success" | "error"; message: string} | null>(null); 
  const mutation = useCreateCountryToast(setToast);
 
  
  useEffect(() => {
    setTitle(MESSAGES.DEFAULT_NAVBAR_TITLE);
  }, [setTitle]);

  const initialValues = { name: "", population: 0, region: "", flag: "" };

  return (
    <>
      <CountryForm
        initialValues={initialValues}
        onSubmit={(values) => mutation.mutate(values)}
        onCancel={() => navigate(-1)}
      />
      <Snackbar
          open={!!toast}
          autoHideDuration={3000}
          onClose={() => {
            if (toast?.severity === SEVERITY.SUCCESS) navigate("/countries");
              setToast(null)

            }
          }
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={() => {
              if (toast?.severity === SEVERITY.SUCCESS) navigate("/countries");
                setToast(null)
              }
            }
            severity={toast?.severity}
            sx={{ width: '100%' }}
          >
            {toast?.message}
          </Alert>
      </Snackbar>
    </>
  );
}