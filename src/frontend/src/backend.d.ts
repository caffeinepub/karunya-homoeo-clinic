import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface AppointmentRequest {
    id: bigint;
    branch: Branch;
    message?: string;
    preferredDate: string;
    preferredTime: TimePreference;
    timestamp: bigint;
    patientName: string;
    phoneNumber: string;
}
export enum Branch {
    koduvayur = "koduvayur",
    yakkara = "yakkara",
    puthur = "puthur"
}
export enum TimePreference {
    morning = "morning",
    evening = "evening",
    noPreference = "noPreference",
    afternoon = "afternoon"
}
export interface backendInterface {
    convertBranchToText(branch: Branch): Promise<string>;
    convertTimePrefToText(timePref: TimePreference): Promise<string>;
    getAllAppointmentRequests(): Promise<Array<AppointmentRequest>>;
    submitAppointmentRequest(patientName: string, phoneNumber: string, branch: Branch, preferredDate: string, preferredTime: TimePreference, message: string | null): Promise<void>;
}
