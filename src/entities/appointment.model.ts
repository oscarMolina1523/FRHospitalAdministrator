import { AppointmentStatus } from "./appointment.enum";
import BaseModel from "./base.model";

export default class Appointment extends BaseModel {
  patientId: string; 
  departmentId: string; 
  doctorId: string; 
  scheduledAt: Date;
  status: AppointmentStatus;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;

  constructor({
    id,
    patientId,
    departmentId,
    doctorId,
    scheduledAt,
    status,
    notes,
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
  }: {
    id: string;
    patientId: string;
    departmentId: string;
    doctorId: string;
    scheduledAt: Date;
    status: AppointmentStatus;
    notes: string;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
  }) {
    super(id);
    this.patientId = patientId;
    this.departmentId = departmentId;
    this.doctorId = doctorId;
    this.scheduledAt = scheduledAt;
    this.status = status;
    this.notes = notes;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
  }

  
  // Crea una instancia del modelo desde un JSON crudo (por ejemplo, API o Firestore)
  static fromJson(json: any): Appointment {
    const id = String(json["id"] || "");
    const patientId = String(json["patientId"] || "");
    const departmentId = String(json["departmentId"] || "");
    const doctorId = String(json["doctorId"] || "");
    const scheduledAt = json["scheduledAt"] ? new Date(json["scheduledAt"]) : new Date();
    const status = (json["status"] as AppointmentStatus) || AppointmentStatus.SCHEDULED;
    const notes = String(json["notes"] || "");
    const createdAt = json["createdAt"] ? new Date(json["createdAt"]) : new Date();
    const updatedAt = json["updatedAt"] ? new Date(json["updatedAt"]) : new Date();
    const createdBy = String(json["createdBy"] || "");
    const updatedBy = String(json["updatedBy"] || "");

    return new Appointment({
      id,
      patientId,
      departmentId,
      doctorId,
      scheduledAt,
      status,
      notes,
      createdAt,
      updatedAt,
      createdBy,
      updatedBy,
    });
  }

  //convierte los datos a modelo de frontend
  //ejemplo de un formulario a este modelo
  static fromJsonModel(json: any): Appointment {
    const id = String(json["id"] || "");
    const patientId = String(json["patientId"] || "");
    const departmentId = String(json["departmentId"] || "");
    const doctorId = String(json["doctorId"] || "");
    const scheduledAt = json["scheduledAt"] ? new Date(json["scheduledAt"]) : new Date();
    const status = (json["status"] as AppointmentStatus) || AppointmentStatus.SCHEDULED;
    const notes = String(json["notes"] || "");

    return new Appointment({
      id,
      patientId,
      departmentId,
      doctorId,
      scheduledAt,
      status,
      notes
    });
  }

  //convierte a formato plano para el json del backend
  toJsonDTO() {
    return {
      patientId: this.patientId,
      departmentId: this.departmentId,
      doctorId: this.doctorId,
      scheduledAt: this.scheduledAt.toISOString(),
      status: this.status,
      notes: this.notes,
    };
  }
}
