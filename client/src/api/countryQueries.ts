import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCountry, updateCountry, deleteCountry, getCountries } from "./countries";
import type { Country } from "../types";
import { MESSAGES, SEVERITY } from "../utils/constant";

export function useCreateCountryToast(setToast: (toast: { severity: "success" | "error"; message: string } | null) => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (country: Country) => createCountry(country),
    onSuccess: (newCountry: Country) => {
      queryClient.setQueryData<Country[]>(["countries"], (old) => (old ? [...old, newCountry] : [newCountry]));
      setToast({ severity: SEVERITY.SUCCESS, message: MESSAGES.COUNTRY_CREATED_SUCCESS });
    },
    onError: () => {
      setToast({ severity: SEVERITY.ERROR, message: MESSAGES.COUNTRY_CREATED_ERROR });
    },
  });
}

export function useUpdateCountryToast(setToast: (toast: { severity: "success" | "error"; message: string } | null) => void, id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (country: Country) => updateCountry(id, country),
    onSuccess: (updatedCountry: Country) => {
      queryClient.setQueryData<Country[]>(["countries"], (old) =>
        old ? old.map((c) => (c._id === updatedCountry._id ? updatedCountry : c)) : []
      );
      setToast({ severity: SEVERITY.SUCCESS, message: MESSAGES.COUNTRY_UPDATED_SUCCESS });
    },
    onError: () => {
      setToast({ severity: SEVERITY.ERROR, message: MESSAGES.COUNTRY_UPDATED_ERROR });
    },
  });
}

export function useDeleteCountryToast(setToast: (toast: { severity: "success" | "error"; message: string } | null) => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCountry(id),
    onSuccess: (_result, id) => {
      queryClient.setQueryData<Country[]>(["countries"], (old) => (old ? old.filter((c) => c._id !== id) : []));
      setToast({ severity: SEVERITY.SUCCESS, message: MESSAGES.COUNTRY_DELETED_SUCCESS });
    },
    onError: () => {
      setToast({ severity: SEVERITY.ERROR, message: MESSAGES.COUNTRY_DELETED_ERROR });
    },
  });
}

export function useCountries() {
  return useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: getCountries,
  });
}
