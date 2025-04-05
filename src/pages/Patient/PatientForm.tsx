import { useState } from "react";
import { createPatient } from "../../services/patientService";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export function PatientForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    names: "",
    lastName: "",
    motherMaidenName: "",
    documentTypeId: 1,
    documentNumber: "",
    phono: "",
    typeAgeId: 2,
    age: 20,
    generId: 1,
  });
  

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" || name.includes("Id") ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPatient(formData);
      alert("Paciente registrado correctamente");
      navigate("/pacientes");
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Error al registrar paciente");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>Registrar Paciente</h2>
      <div className="form-group">
        <input type="text" name="names" placeholder="Nombres" onChange={handleChange} required />
        <input type="text" name="surNames" placeholder="Apellidos" onChange={handleChange} required />
        <input type="text" name="documentNumber" placeholder="DNI" onChange={handleChange} required />
        <input type="text" name="phono" placeholder="Teléfono" onChange={handleChange} required />
        <input type="number" name="age" placeholder="Edad" onChange={handleChange} required />

        <select name="documentTypeId" onChange={handleChange}>
          <option value={1}>DNI</option>
          <option value={2}>Pasaporte</option>
        </select>

        <select name="typeAgeId" onChange={handleChange}>
          <option value={1}>Meses</option>
          <option value={2}>Años</option>
        </select>

        <select name="generId" onChange={handleChange}>
          <option value={1}>Masculino</option>
          <option value={2}>Femenino</option>
        </select>

        <button type="submit">Registrar</button>
      </div>
    </FormContainer>
  );
}

const FormContainer = styled.form`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #333;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input, select {
      padding: 0.7rem 1rem;
      font-size: 1rem;
      border-radius: 6px;
      border: 1px solid #ccc;
    }

    button {
      padding: 0.75rem;
      background-color: #6a28cb;
      color: white;
      font-weight: bold;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.3s ease;

      &:hover {
        background-color: #5821a8;
      }
    }
  }
`;