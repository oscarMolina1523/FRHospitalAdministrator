import BaseModel from "./base.model";

export default class User extends BaseModel {
  username: string;
  email: string;
  password: string;
  roleId: string; 
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string; 
  updatedBy?: string; 
  departmentId?: string; // FK a Department (optional for CEO, Board of Directors)

  constructor({
    id,
    username,
    email,
    password,
    roleId,
    active,
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
    departmentId,
  }: {
    id: string;
    username: string;
    email: string;
    password: string;
    roleId: string;
    active: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
    departmentId?: string;
  }) {
    super(id);
    this.username = username;
    this.email = email;
    this.password = password;
    this.roleId = roleId;
    this.active = active;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
    this.departmentId = departmentId;
  }

  static fromJson(json: any): User {
    const id = String(json["id"] || "");
    const username = String(json["username"] || "");
    const email = String(json["email"] || "");
    const password = String(json["password"] || "");
    const roleId = String(json["roleId"] || "");
    const active = Boolean(json["active"]);
    const departmentId = json["departmentId"] ? String(json["departmentId"]) : undefined;
    const createdAt = json["createdAt"] ? new Date(json["createdAt"]) : undefined;
    const updatedAt = json["updatedAt"] ? new Date(json["updatedAt"]) : undefined;
    const createdBy = json["createdBy"] ? String(json["createdBy"]) : undefined;
    const updatedBy = json["updatedBy"] ? String(json["updatedBy"]) : undefined;

    return new User({
      id,
      username,
      email,
      password,
      roleId,
      active,
      departmentId,
      createdAt,
      updatedAt,
      createdBy,
      updatedBy,
    });
  }

  static fromJsonModel(json: any): User {
    const id = String(json["id"] || "");
    const username = String(json["username"] || "");
    const email = String(json["email"] || "");
    const password = String(json["password"] || "");
    const roleId = String(json["roleId"] || "");
    const active = Boolean(json["active"]);
    const departmentId = json["departmentId"] ? String(json["departmentId"]) : undefined;

    return new User({
      id,
      username,
      email,
      password,
      roleId,
      active,
      departmentId,
    });
  }

  toJsonDTO() {
    return {
      username: this.username,
      email: this.email,
      password: this.password,
      roleId: this.roleId,
      active: this.active,
      departmentId: this.departmentId,
    };
  }
}
