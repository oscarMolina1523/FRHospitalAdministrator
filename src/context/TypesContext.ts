import type Appointment from "@/entities/appointment.model";
import type User from "@/entities/user.model";

export type UserContextType = {
  users: User[];
  usersByDepartment:User[];
  loadingUser: boolean;
  errorUser?: string;
  fetchUsers: () => Promise<void>;
  fetchUsersByDepartment: () => Promise<void>;
  refetchUsers: () => Promise<void>;
};

export type AppointmentContextType = {
  appointments: Appointment[];
  appointmentsByDepartment:Appointment[];
  loadingAppointment: boolean;
  errorAppointment?: string;
  fetchAppointments: () => Promise<void>;
  fetchAppointmentsByDepartment: () => Promise<void>;
  refetchAppointments: () => Promise<void>;
};