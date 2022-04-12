import { saveUserService } from "../services/SaveUserService";

interface ICredential {
  user: string;
  password: string;
}

interface ISaveUserResponse {
  status: "success" | "error";
  message: string;
}

export function SaveUserController(credential: ICredential): ISaveUserResponse {
  try {
    saveUserService(credential); 
    
    return {
      status: "success",
      message: "Usuário registrado com sucesso!"
    };

  } catch (error: any) {
    return {
      status: "error",
      message: error.message,
    }
  }
}