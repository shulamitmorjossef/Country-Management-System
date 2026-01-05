import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import CountryForm from "./CountryForm";
import { useRecoilState } from "recoil";
import { navbarTitleState } from "../state/navbarTitleAtom";
import { useState, useEffect } from "react";
import type { Country } from "../types";
import { Snackbar, Alert } from "@mui/material";
import { MESSAGES } from "../utils/constant";
import { SEVERITY } from "../utils/constant";
import { useUpdateCountryToast } from "../api/countryQueries";


export default function EditCountry() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [, setTitle] = useRecoilState(navbarTitleState);
  const [toast, setToast] = useState<{severity: "success" | "error"; message: string} | null>(null);
  const mutation = useUpdateCountryToast(setToast, id!);

  const countries: Country[] = queryClient.getQueryData(["countries"]) || [];
  const country = countries.find((c) => c._id === id);

  useEffect(() => {
    if (country) {
      setTitle(country.name);
      return () => setTitle(MESSAGES.DEFAULT_NAVBAR_TITLE); 
    }
  }, [country, setTitle]);


  if (!country) return <p>{MESSAGES.COUNTRY_NOT_FOUND}</p>;

   return (
    <>
      <CountryForm
        initialValues={country}
        onSubmit={(values) => mutation.mutate(values)}
        onCancel={() => navigate(-1)}
      />
      <Snackbar
        open={!!toast}
        autoHideDuration={3000}
        onClose={() => {
          if (toast?.severity === SEVERITY.SUCCESS) navigate("/");
            setToast(null)
          }
        }
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => {
            if (toast?.severity === SEVERITY.SUCCESS) navigate("/");
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
