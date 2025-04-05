import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { FiEdit, FiTrash2 } from "react-icons/fi";
// para navegar  
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../endpoint/endpoint";

interface Patient {
  patientId: number;
  names: string;
  surNames: string;
  documentType: string;
  documentNumber: string;
  phono: string;
  age: string;
  gender: string;
  statePatient: string;
  auditCreateDate: string;
}

interface StatusBadgeProps {
  estado: string;
}

export function Patient() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get<{ data: Patient[] }>(`${API_BASE_URL}/ListaPacientes`
          
        );
        setPatients(response.data.data);
      } catch (error) {
        console.error("Error al obtener pacientes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Esta acción no se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6a28cb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_BASE_URL}/PacientesRemove/${id}`);
        Swal.fire("¡Eliminado!", "El paciente fue eliminado correctamente.", "success");

        // 👇 Refrescar lista quitando el paciente eliminado
        setPatients((prev) => prev.filter((p) => p.patientId !== id));
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar el paciente", "error");
        console.error(error);
      }
    }
  };



  return (
    <Container>
      
      <Header>
        <Title>📋 Listado de Pacientes</Title>
        <ButtonCrear onClick={() => navigate("/pacientes/nuevo")}>+ Crear Paciente</ButtonCrear>
      </Header>
      
      {loading ? (
        <Loader>Cargando datos...</Loader>
      ) : (
        <TableContainer>
          <StyledTable>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Tipo Doc</th>
                <th>N° Documento</th>
                <th>Teléfono</th>
                <th>Edad</th>
                <th>Género</th>
                <th>Estado</th>
                <th>Fecha Registro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.patientId}>
                  <td>{p.patientId}</td>
                  <td>{p.names}</td>
                  <td>{p.surNames}</td>
                  <td>{p.documentType}</td>
                  <td>{p.documentNumber}</td>
                  <td>{p.phono}</td>
                  <td>{p.age}</td>
                  <td>{p.gender}</td>
                  <td>
                  <StatusBadge estado={p.statePatient}>{p.statePatient}</StatusBadge>
                  </td>
                  <td>{new Date(p.auditCreateDate).toLocaleString()}</td>
                  <td>
                  <ActionButtons>
                    <FiEdit onClick={() => navigate(`/pacientes/editar/${p.patientId}`)} />
                    <FiTrash2 onClick={() => handleDelete(p.patientId)} />
                  </ActionButtons>
                </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </TableContainer>
      )}
    </Container>
  );
}
const Container = styled.div`
  padding: 2rem;
  height: 100vh;
  overflow-x: auto;
  background-color: #f9f9fb;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

const Loader = styled.p`
  font-size: 1.1rem;
`;

const TableContainer = styled.div`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  overflow: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  min-width: 1000px;

  thead {
    position: sticky;
    top: 0;
    background-color: #6a28cb;
    color: white;
    z-index: 2;

    th {
      padding: 12px;
      text-align: left;
      font-weight: 600;
    }
  }

  tbody tr {
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #f3f4f6;
    }
  }

  td {
    padding: 12px;
    border-bottom: 1px solid #e5e7eb;
    color: #444;
  }
`;

const StatusBadge = styled.span<StatusBadgeProps>`
  display: inline-block;
  padding: 4px 12px;
  font-size: 0.8rem;
  border-radius: 20px;
  text-transform: uppercase;
  font-weight: bold;
  background-color: ${(props) =>
    props.estado.toLowerCase() === "activo" ? "#22c55e33" : "#f8717133"};
  color: ${(props) =>
    props.estado.toLowerCase() === "activo" ? "#15803d" : "#b91c1c"};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;

  svg {
    cursor: pointer;
    font-size: 1.1rem;
    color: #6b7280;

    &:hover {
      color: #6a28cb;
      transform: scale(1.1);
    }
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ButtonCrear = styled.button`
  background-color: #6a28cb;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #5823a3;
  }
`;
