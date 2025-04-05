import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Analysis } from "./Table";

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: string;
  onSubmit: (analysisData: Analysis) => void;
  selectedAnalysis?: any;
}

export default function AnalysisModal({
  isOpen,
  onClose,
  mode,
  onSubmit,
  selectedAnalysis,
}: AnalysisModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Analysis>();

  // Cargar valores si es modo "update", o limpiar si es "create"
  useEffect(() => {
    if (mode === "update" && selectedAnalysis) {
      reset({
        analysisId: selectedAnalysis.analysisId,
        name: selectedAnalysis.name,
        audiCreateDate: selectedAnalysis.audiCreateDate,
        stateAnalysis: selectedAnalysis.stateAnalysis,
      });
    } else {
      reset({
        analysisId: 0,
        name: "",
        audiCreateDate: "",
        stateAnalysis: "ACTIVO",
      });
    }
  }, [selectedAnalysis, reset, mode]);
  
  

  const onFormSubmit = (data: Analysis) => {
    onSubmit(data);
  };

  return (
    <dialog id="my_modal_3" className="modal" open={isOpen}>
      <div className="modal-box">
        <h3 className="font-bold text-lg py-4">
          {mode === "update" ? "Actualizar Análisis" : "Registro de Análisis"}
        </h3>

        <form onSubmit={handleSubmit(onFormSubmit)}>
          <button
            onClick={onClose}
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>

          {/* Campo reactivo */}
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Nombre del análisis"
            {...register("name", { required: "El nombre es obligatorio" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}

          <button type="submit" className="btn btn-success mt-4">
            {mode === "update" ? "Actualizar" : "Registrar"}
          </button>
        </form>
      </div>
    </dialog>
  );
}
