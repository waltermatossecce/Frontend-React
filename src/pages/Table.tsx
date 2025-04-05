import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import { useEffect, useState } from "react";

export interface Analysis {
  analysisId: number;
  name: string;
  audiCreateDate: string;
  stateAnalysis: string;
}

export interface PagedApiResponse<T> {
  isSucess: boolean;
  message: string;
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  data: T;
  errors: any;
}

export default function Table({
  handleOpen,
  handleDelete,
  searchTerm,
}: {
  handleOpen: (mode: string, analysis?: Analysis) => void;
  handleDelete: (id: number) => void;
  searchTerm: string;
}) {
  const [tableData, setTableData] = useState<Analysis[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (page: number = 1) => {
    try {
      const response = await axios.get<PagedApiResponse<Analysis[]>>(
        "https://localhost:7169/clinica/v1/ListadoAnalysis",
        {
          params: {
            PageNumber: page,
            PageSize: 10,
          },
        }
      );

      if (response.data.isSucess) {
        setTableData(response.data.data);
        setPageNumber(response.data.pageNumber);
        setTotalPages(response.data.totalPages);
      }
    } catch (err) {
      console.error("Error al obtener análisis:", err);
    }
  };

  useEffect(() => {
    fetchData(pageNumber);
  }, []);

  const goToPrevious = () => {
    if (pageNumber > 1) {
      fetchData(pageNumber - 1);
    }
  };

  const goToNext = () => {
    if (pageNumber < totalPages) {
      fetchData(pageNumber + 1);
    }
  };
  const filteredData = tableData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <>
      <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Análisis</th>
            <th>Fecha de creación</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.analysisId}>
              <td>{item.name}</td>
              <td>{new Date(item.audiCreateDate).toLocaleString()}</td>
              <td>
                <div
                  className={`badge text-sm ${
                    item.stateAnalysis === "ACTIVO"
                      ? "badge-accent"
                      : "badge-primary"
                  }`}
                >
                  {item.stateAnalysis}
                </div>
              </td>
              <td>
                <button
                  onClick={() => handleOpen("update", item)}
                  className="btn btn-primary btn-sm rounded-full mr-2"
                >
                  <MdEdit />
                </button>
                <button
                  onClick={() => handleDelete(item.analysisId)}
                  className="btn btn-error btn-sm rounded-full"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        <div className="flex justify-between mt-4">
          <button
            onClick={goToPrevious}
            disabled={pageNumber === 1}
            className="btn btn-outline"
          >
            Anterior
          </button>
          <span className="text-sm mt-2">
            Página {pageNumber} de {totalPages}
          </span>
          <button
            onClick={goToNext}
            disabled={pageNumber === totalPages}
            className="btn btn-outline"
          >
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
}
