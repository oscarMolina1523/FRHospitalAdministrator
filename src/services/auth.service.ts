import Token from "@/entities/token.model";
import HTTPService from "./http-service";

export default class AuthService extends HTTPService {
  async signIn(email: string, password: string) {
    const body = { email: email, password: password };
    const json = await this.post("auth/login", body);

    // Si no hay token, el login falló
    if (!json.token) {
      throw new Error(json.message || "Credenciales inválidas");
    }

    return new Token(json.token);
  }

  async signUp(username: string, newemail: string, newpassword: string) {
    if (!username || !newpassword || !newemail) {
      throw new Error("Username, email and password are required");
    }

    const body = { username, email: newemail, password: newpassword };
    const json = await this.post("auth/register", body);

    // Verificar si hubo error del backend
    if (!json.success) {
      throw new Error(json.message || "Error al registrar usuario");
    }

    // backend no retorna token al registrar
    return {
      message: json.message || "Registro exitoso",
      user: json.user || null,
    };
  }
}
