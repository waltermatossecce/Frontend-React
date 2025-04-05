// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { Exam } from "../pages/Tables/tableExam";

// interface ExamModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   mode: string;
//   onSubmit: (examData: Exam) => void;
//   selectedExam?: Exam | null;
// }

// export default function ExamModal({
//   isOpen,
//   onClose,
//   mode,
//   onSubmit,
//   selectedExam,
// }: ExamModalProps) {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<Exam>();

//   useEffect(() => {
//     if (mode === "update" && selectedExam) {
//       reset(selectedExam);
//     } else {
//       reset({
//         examId: 0,
//         name: "",
//         analysisId: "",
//         auditCreateDate: new Date().toISOString(),
//         stateExam: "ACTIVO",
//       });
//     }
//   }, [selectedExam, reset, mode]);

//   const onFormSubmit = (data: Exam) => {
//     onSubmit(data);
//   };

//   return (
//     <dialog id="exam_modal" className="modal" open={isOpen}>
//       <div className="modal-box">
//         <h3 className="font-bold text-lg py-4">
//           {mode === "update" ? "Actualizar Examen" : "Registrar Examen"}
//         </h3>

//         <form onSubmit={handleSubmit(onFormSubmit)}>
//           <button
//             onClick={onClose}
//             type="button"
//             className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
//           >
//             ✕
//           </button>

//           <input
//             type="text"
//             className="input input-bordered w-full mb-2"
//             placeholder="Nombre del examen"
//             {...register("name", { required: "El nombre es obligatorio" })}
//           />
//           {errors.name && <p className="text-red-500">{errors.name.message}</p>}

//           <input
//       type="number"
//       className="input input-bordered w-full mb-2"
//       placeholder="ID del análisis"
//       {...register("analysisId", { required: "El análisis es obligatorio", valueAsNumber: true })}
//     />

//           {errors.analysis && (
//             <p className="text-red-500">{errors.analysisId.message}</p>
//           )}

//           <button type="submit" className="btn btn-success mt-4">
//             {mode === "update" ? "Actualizar" : "Registrar"}
//           </button>
//         </form>
//       </div>
//     </dialog>
//   );
// }
