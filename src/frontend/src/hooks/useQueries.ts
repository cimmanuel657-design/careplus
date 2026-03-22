import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Status } from "../backend.d";
import { useActor } from "./useActor";

export function useGetDoctors() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDoctors();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllAppointments() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["all-appointments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAppointments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAppointmentsByEmail(email: string) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["appointments-email", email],
    queryFn: async () => {
      if (!actor || !email) return [];
      return actor.getAppointmentsByEmail(email);
    },
    enabled: !!actor && !isFetching && !!email,
  });
}

export function useBookAppointment() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      doctorId: bigint;
      patientName: string;
      patientEmail: string;
      date: string;
      timeSlot: string;
      reason: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.bookAppointment(
        params.doctorId,
        params.patientName,
        params.patientEmail,
        params.date,
        params.timeSlot,
        params.reason,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["all-appointments"] });
    },
  });
}

export function useUpdateAppointmentStatus() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: { id: bigint; status: Status }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateAppointmentStatus(params.id, params.status);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["all-appointments"] });
    },
  });
}
