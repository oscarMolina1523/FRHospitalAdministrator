import BaseModel from "./base.model";

export default class KPI extends BaseModel {
  departmentId?: string; // Null si global
  name: string; // Crecimiento de pacientes, ingresos, stock crítico
  value: number;
  metricDate: Date;
  createdAt?: Date;
  createdBy?: string;

  constructor({
    id,
    name,
    departmentId,
    value,
    metricDate,
    createdAt,
    createdBy,
  }: {
    id: string;
    name: string;
    departmentId?: string;
    value: number;
    metricDate: Date;
    createdAt?: Date;
    createdBy?: string;
  }) {
    super(id);
    this.name = name;
    this.departmentId = departmentId;
    this.value = value;
    this.metricDate = metricDate;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
  }

  static fromJson(json: any): KPI {
    const id = String(json["id"] || "");
    const name = String(json["name"] || "");
    const departmentId = json["departmentId"] ? String(json["departmentId"]) : undefined;
    const value = Number(json["value"] || 0);
    const metricDate = json["metricDate"] ? new Date(json["metricDate"]) : new Date();
    const createdAt = json["createdAt"] ? new Date(json["createdAt"]) : undefined;
    const createdBy = json["createdBy"] ? String(json["createdBy"]) : undefined;

    return new KPI({
      id,
      name,
      departmentId,
      value,
      metricDate,
      createdAt,
      createdBy,
    });
  }
}
