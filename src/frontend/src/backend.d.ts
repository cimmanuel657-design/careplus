import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Doctor {
    id: bigint;
    bio: string;
    name: string;
    specialty: string;
}
export type Time = bigint;
export interface Appointment {
    id: bigint;
    status: Status;
    doctorId: bigint;
    patientEmail: string;
    date: string;
    timestamp: Time;
    patientName: string;
    timeSlot: string;
    reason: string;
}
export enum Status {
    cancelled = "cancelled",
    pending = "pending",
    confirmed = "confirmed"
}
export interface backendInterface {
    bookAppointment(doctorId: bigint, patientName: string, patientEmail: string, date: string, timeSlot: string, reason: string): Promise<bigint>;
    getAllAppointments(): Promise<Array<Appointment>>;
    getAppointmentsByEmail(email: string): Promise<Array<Appointment>>;
    getDoctor(id: bigint): Promise<Doctor>;
    getDoctors(): Promise<Array<Doctor>>;
    updateAppointmentStatus(id: bigint, status: Status): Promise<void>;
}
