import axios from "axios";
import { API_BASE_URL } from "../endpoint/endpoint";
import { CreatePatientDto } from "../models/CreatePatientDto";


// 👇 Registro
export const createPatient = async (newPatient: CreatePatientDto) => {
  const response = await axios.post(`${API_BASE_URL}/PacientRegister`, newPatient);
  return response.data;
};

export const getPatientById = async (id: number): Promise<CreatePatientDto & { patientId: number }> => {
  const response = await axios.get<{ data: CreatePatientDto & { patientId: number } }>(`${API_BASE_URL}/Pacientes/${id}`);
  return response.data.data;
};
