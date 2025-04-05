import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Patient } from "../pages/Patient";
import { Medic } from "../pages/Medic";
import { Analysis } from "../pages/Analysis";
import { TakeExam } from "../pages/TakeExam";
import { Results } from "../pages/Results";
import { User } from "../pages/User";
import { Roles } from "../pages/Roles";
import { PatientEditForm } from "../pages/Patient/PatientEditForm";
import { PatientForm } from "../pages/Patient/PatientForm";
import { Exams } from "../pages/Exam";

export default function SideRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/pacientes" element={<Patient />} />
      <Route path="/medicos" element={<Medic />} />
      <Route path="/examenes" element={<Exams />} />
      <Route path="/analisis" element={<Analysis />} />
      <Route path="/realizar-examen" element={<TakeExam />} />
      <Route path="/resultado-examen" element={<Results />} />
      <Route path="/configuraciones/usuarios" element={<User />} />
      <Route path="/configuraciones/roles" element={<Roles />} />

         {/* RUTA DE NUESTRO PACIENTE */}
     <Route path="/pacientes/nuevo" element={<PatientForm />} />
     <Route path="/pacientes/editar/:id" element={<PatientEditForm />} />

    </Routes>
  );
}
