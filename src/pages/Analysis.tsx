import { IoMdAddCircleOutline } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import styled from "styled-components";
import Table from "./Table";
import AnalysisModal from "./AnalysisModal";
import { useState } from "react";
import { Analysis as AnalysisModel } from "./Table";
import axios from "axios";



export function Analysis() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisModel | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

  const handleOpen = async (mode: string, analysis?: AnalysisModel) => {
    setModalMode(mode);
  
    if (mode === "update" && analysis) {
      try {
        const response = await axios.get(
          `https://localhost:7169/clinica/v1/Analysis/${analysis.analysisId}`
        );
  
        if (response.data?.data) {
          setSelectedAnalysis({
            ...response.data.data,
            audiCreateDate: new Date().toISOString(),
            stateAnalysis: "ACTIVO"
          });
        }
      } catch (error) {
        console.error("Error fetching analysis by ID:", error);
      }
    } else {
      setSelectedAnalysis(null);
    }
  
    setIsOpen(true);
  };
  

  const handleSubmit = async (analysisData: AnalysisModel) => {
    try {
      if (modalMode === "create") {
        await axios.post(
          "https://localhost:7169/clinica/v1/Analysis/register",
          { name: analysisData.name }
        );
      } else {
        await axios.put(
          "https://localhost:7169/clinica/v1/EditarAnalysis",
          {
            analysisId: analysisData.analysisId,
            name: analysisData.name,
          }
        );
      }
    } catch (error) {
      console.error("Error submitting analysis:", error);
    }

    setIsOpen(false);
    setSelectedAnalysis(null);
  };

  const handleDelete = async (analysisId: number) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este análisis?")) return;
  
    try {
      await axios.delete(`https://localhost:7169/clinica/v1/Remove/${analysisId}`);
      
      alert("Análisis eliminado correctamente.");
      // Aquí podrías actualizar la lista de análisis si es necesario
    } catch (error) {
      console.error("Error al eliminar el análisis:", error);
      alert("Hubo un error al eliminar el análisis.");
    }
  };
  
  return (
    <Container>
      <div className="max-w-screen-160 mx-auto h-full flex flex-col px-10 py-6 gap-4">
        <div className="flex justify-between flex-wrap gap-4">
          <div className="flex items-center">
            <h1 className="text-3xl font-medium italic text-white ml-2">
              Análisis
            </h1>
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
          <button
            className="btn btn-dash btn-secondary"
            onClick={() => handleOpen("create")}
          >
            <IoMdAddCircleOutline className="text-lg" /> Agregar
          </button>
        </div>

        <div className="card h-full shadow-xl rounded-3xl overflow-hidden flex-auto">
          <Table
          handleOpen={handleOpen}
          handleDelete={handleDelete}
          searchTerm={searchTerm}
        />
          <AnalysisModal
            isOpen={isOpen}
            onSubmit={handleSubmit}
            onClose={() => {
              setIsOpen(false);
              setSelectedAnalysis(null);
            }}
            mode={modalMode}
            selectedAnalysis={selectedAnalysis}
          />
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding: 1.75rem;
  height: 100vh;
`;
