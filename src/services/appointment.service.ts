import Appointment from "@/entities/appointment.model";
import HTTPService from "./http-service";

export default class AppointmentService extends HTTPService {
  private path: string;

  constructor() {
    super();
    this.path = "appointments";
  }

  async getAppointments(): Promise<Appointment[]> {
    const response = await super.get(this.path);
    const data = response.data || [];
    return data.map((item: any) => Appointment.fromJson(item));
  }

  async getById(id: string): Promise<Appointment | null> {
    const response = await super.get(`${this.path}/${id}`);
    if (!response) return null;

    return Appointment.fromJson(response);
  }

  async getAppointmentByDepartment() {
    const response = await super.get(`${this.path}/area`);
    const data = response.data || [];
    return data.map((item: any) => Appointment.fromJson(item));
  }

  async addAppointment(appointment: Appointment): Promise<Appointment | null> {
    const body = Appointment.fromJsonModel(appointment).toJsonDTO();
    const response = await super.post(this.path, body);

    if (!response) return null;
    return Appointment.fromJson(response);
  }

  async updateAppointment(
    id: string,
    appointment: Appointment
  ): Promise<Appointment | null> {
    const body = Appointment.fromJsonModel(appointment).toJsonDTO();
    const response = await super.put(`${this.path}/${id}`, body);

    if (!response) return null;
    return Appointment.fromJson(response);
  }

  async deleteAppointment(id: string): Promise<void> {
    await super.delete(`${this.path}/${id}`);
  }
}
