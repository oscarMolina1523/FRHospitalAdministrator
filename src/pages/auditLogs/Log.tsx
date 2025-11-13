import React, { useEffect } from "react";
import { getAuditLogColumns } from "./auditLogColumns";
import type AuditLog from "@/entities/auditLog.model";
import { DataTable } from "@/components/dataTable";
import { useLogContext } from "@/context/LogContext";

const AuditLogPage: React.FC = () => {
  const { logs: data, loadingLog, errorLog, fetchLogs } = useLogContext();

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  function handleEdit(log: AuditLog) {
    console.log("Editar log:", log);
    // Aquí puedes abrir un modal o navegar a otra ruta:
    // navigate(`/appointments/edit/${log.id}`)
  }

  function handleDelete(id: string) {
    console.log("Eliminar log con ID:", id);
    // Aquí puedes mostrar un confirm() o eliminar desde Firestore
  }

  const columns = getAuditLogColumns(handleEdit, handleDelete);

  if (loadingLog) {
    return <div className="p-4 text-gray-500">Cargando logs...</div>;
  }

  if (errorLog) {
    return <div className="p-4 text-red-600">Error: {errorLog}</div>;
  }

  return (
    <div className="p-4 rounded-2xl bg-white w-full flex flex-col gap-2">
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <p className="text-[#0f172a] text-[1.25rem] leading-7">
            Logs de Auditoria
          </p>
        </div>
      </div>
      {/* table */}
      <div className="mt-6">
        <DataTable
          columns={columns}
          data={data}
          filterColumn="action"
          filterPlaceholder="Filtrar por acción..."
        />
      </div>
    </div>
  );
};

export default AuditLogPage;
