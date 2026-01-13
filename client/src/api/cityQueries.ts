import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCity, updateCity, deleteCity } from "./cities";
import { MESSAGES, SEVERITY } from "../utils/constant";

export function useCreateCityToast(setToast: (toast: { severity: "success" | "error"; message: string } | null) => void, countryId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => createCity(countryId, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cities", countryId] });
      setToast({ severity: SEVERITY.SUCCESS, message: MESSAGES.CITY_CREATED_SUCCESS });
    },
    onError: () => {
      setToast({ severity: SEVERITY.ERROR, message: MESSAGES.CITY_CREATED_ERROR });
    },
  });
}

export function useUpdateCityToast(setToast: (toast: { severity: "success" | "error"; message: string } | null) => void, countryId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) => updateCity(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cities", countryId] });
      setToast({ severity: SEVERITY.SUCCESS, message: MESSAGES.CITY_UPDATED_SUCCESS });
    },
    onError: () => {
      setToast({ severity: SEVERITY.ERROR, message: MESSAGES.CITY_UPDATED_ERROR });
    },
  });
}

export function useDeleteCityToast(setToast: (toast: { severity: "success" | "error"; message: string } | null) => void, countryId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCity(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cities", countryId] });
      setToast({ severity: SEVERITY.SUCCESS, message: MESSAGES.CITY_DELETED_SUCCESS });
    },
    onError: () => {
      setToast({ severity: SEVERITY.ERROR, message: MESSAGES.CITY_DELETED_ERROR });
    },
  });
}