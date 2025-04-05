import axios from "axios";
import { API_BASE_URL } from "../endpoint/endpoint";
import { CreatePatientDto } from "../models/CreatePatientDto";

export const updatePatient = async (id:number,updatePatient: CreatePatientDto) => {
    const payload = {...updatePatient,patientId:id};
    const response = await axios.put(`${API_BASE_URL}/UpdatePacientes`,payload);

    return response.data;
}