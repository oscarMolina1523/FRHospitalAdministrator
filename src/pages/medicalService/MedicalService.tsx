import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { getMedicalServiceColumns } from "./medicalServiceColumns";
import type MedicalService from "@/entities/medicalService.model";
import { DataTable } from "@/components/dataTable";
import { useMedicalServiceContext } from "@/context/MedicalServiceContext";

const MedicalServicePage: React.FC = () => {
  const {
    medicalServices: data,
    loadingMedicalService,
    errorMedicalService,
    fetchMedicalServices,
  } = useMedicalServiceContext();

  useEffect(() => {
    fetchMedicalServices();
  }, [fetchMedicalServices]);

  function handleEdit(medicalService: MedicalService) {
    console.log("Editar medicalService:", medicalService);
  }

  function handleDelete(id: string) {
    console.log("Eliminar inentory con ID:", id);
  }

  const columns = getMedicalServiceColumns(handleEdit, handleDelete);

  if (loadingMedicalService) {
    return <div className="p-4 text-gray-500">Cargando servicios medicos...</div>;
  }

  if (errorMedicalService) {
    return <div className="p-4 text-red-600">Error: {errorMedicalService}</div>;
  }

  return (
    <div className="bg-white h-full rounded-2xl items-start justify-start flex flex-col gap-2 p-4">
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <p className="text-[#0f172a] text-[1.25rem] leading-7">
            Servicios Medicos
          </p>
        </div>
        <div>
          <Button className="bg-sky-600 text-white">Nuevo Servicio</Button>
        </div>
      </div>
      {/* table */}
      <div className="mt-6 w-full">
        <DataTable
          columns={columns}
          data={data}
          filterColumn="name"
          filterPlaceholder="Filtrar por servicio..."
        />
      </div>
    </div>
  );
};

export default MedicalServicePage;
