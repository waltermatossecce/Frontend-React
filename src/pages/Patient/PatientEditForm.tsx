import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPatientById } from "../../services/patientService";
import styled from "styled-components";
import { updatePatient } from "../../services/updateService";

export function PatientEditForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    names: "",
    lastName: "",
    motherMaidenName: "",
    documentTypeId: 1,
    documentNumber: "",
    phono: "",
    typeAgeId: 1,
    age: 0,
    generId: 1
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientData = await getPatientById(Number(id));
        setFormData(patientData);
      } catch (err) {
        alert("Error cargando paciente");
        console.error(err);
      }
    };
  
    if (id) fetchData();
  }, [id]);
  
  

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" || name.includes("Id") ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePatient(Number(id), formData);
      alert("Paciente actualizado correctamente");
      navigate("/pacientes");
    } catch (error) {
      alert("Error al actualizar paciente");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>Editar Paciente</h2>
      <input name="names" value={formData.names} onChange={handleChange} placeholder="Nombres" />
      <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Apellido paterno" />
      <input name="motherMaidenName" value={formData.motherMaidenName} onChange={handleChange} placeholder="Apellido materno" />
      <input name="documentNumber" value={formData.documentNumber} onChange={handleChange} placeholder="DNI" />
      <input name="phono" value={formData.phono} onChange={handleChange} placeholder="Teléfono" />
      <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Edad" />

      <select name="documentTypeId" value={formData.documentTypeId} onChange={handleChange}>
        <option value={1}>DNI</option>
        <option value={2}>Pasaporte</option>
      </select>

      <select name="typeAgeId" value={formData.typeAgeId} onChange={handleChange}>
        <option value={1}>Meses</option>
        <option value={2}>Años</option>
      </select>

      <select name="generId" value={formData.generId} onChange={handleChange}>
        <option value={1}>Masculino</option>
        <option value={2}>Femenino</option>
      </select>

      <button type="submit">Actualizar</button>
    </FormContainer>
  );
}

const FormContainer = styled.form`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 10px;
`;
