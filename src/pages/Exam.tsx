import { IoMdAddCircleOutline } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import styled from "styled-components";
import Table from "./Tables/tableExam";
// import ExamModal from "../modal/ExamModal";
import { useState } from "react";
import { Exam } from "./Tables/tableExam";
import axios from "axios";

export function Exams() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpen = (mode: string, exam?: Exam) => {
    setModalMode(mode);
    if (mode === "update" && exam) {
      setSelectedExam(exam);
    } else {
      setSelectedExam(null);
    }
    setIsOpen(true);
  };

  const handleSubmit = async (examData: Exam) => {
    try {
      if (modalMode === "create") {
        await axios.post("https://localhost:7169/clinica/v1/ExamenRegister", examData);
      } else {
        await axios.put("https://localhost:7169/clinica/v1/UpdateExam", examData);
      }
    } catch (error) {
      console.error("Error al enviar examen:", error);
    }
    setIsOpen(false);
    setSelectedExam(null);
  };

  const handleDelete = async (examId: number) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este examen?")) return;
    try {
      await axios.delete(`https://localhost:7169/clinica/v1/DeleteExam/${examId}`);
      alert("Examen eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar el examen:", error);
      alert("Hubo un error al eliminar el examen.");
    }
  };

  return (
    <Container>
      <div className="max-w-screen-160 mx-auto h-full flex flex-col px-10 py-6 gap-4">
        <div className="flex justify-between flex-wrap gap-4">
          <div className="flex items-center">
            <h1 className="text-3xl font-medium italic text-white ml-2">Exámenes</h1>
          </div>
          <div className="flex gap-2 items-center w-full smd:w-fit justify-end flex-wrap">
            <label className="input">
              <IoSearchOutline />
              <input
                type="search"
                className="grow"
                placeholder="Buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
              />
            </label>
          </div>
        </div>

        <div className="flex gap-2 justify-between flex-wrap">
          <button className="btn btn-dash btn-secondary" onClick={() => handleOpen("create")}>
            <IoMdAddCircleOutline className="text-lg" /> Agregar
          </button>
        </div>

        <div className="card h-full shadow-xl rounded-3xl overflow-hidden flex-auto">
          <Table
            handleOpen={handleOpen}
            handleDelete={handleDelete}
            searchTerm={searchTerm}
          />
          {/* <ExamModal
            isOpen={isOpen}
            onSubmit={handleSubmit}
            onClose={() => {
              setIsOpen(false);
              setSelectedExam(null);
            }}
            mode={modalMode}
            selectedExam={selectedExam}
          /> */}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding: 1.75rem;
  height: 100vh;
`;
