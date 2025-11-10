import User from "@/entities/user.model";
import {jwtDecode} from "jwt-decode";

export function getUserFromToken(): User | null {
  const token = localStorage.getItem("authToken");
  if (!token) return null;

  try {
    const decoded = jwtDecode<User>(token);
    return decoded;
  } catch (error) {
    console.error("Error decodificando token:", error);
    return null;
  }
}