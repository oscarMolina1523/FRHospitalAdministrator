import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { getPatientColumns } from "./patientColumns";
import type Patient from "@/entities/patient.model";
import { DataTable } from "@/components/dataTable";
import { usePatientContext } from "@/context/PatientContext";

const PatientPage: React.FC = () => {
  const {
    patients: data,
    loadingPatient,
    errorPatient,
    fetchPatients,
  } = usePatientContext();

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  function handleEdit(patient: Patient) {
    console.log("Editar patient:", patient);
  }

  function handleDelete(id: string) {
    console.log("Eliminar inentory con ID:", id);
  }

  const columns = getPatientColumns(handleEdit, handleDelete);

  if (loadingPatient) {
    return <div className="p-4 text-gray-500">Cargando pacientes...</div>;
  }

  if (errorPatient) {
    return <div className="p-4 text-red-600">Error: {errorPatient}</div>;
  }

  return (
    <div className="bg-white h-full rounded-2xl items-start justify-start flex flex-col gap-2 p-4">
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <p className="text-[#0f172a] text-[1.25rem] leading-7">Pacientes</p>
        </div>
        <div>
          <Button className="bg-sky-600 text-white">Nuevo Paciente</Button>
        </div>
      </div>

      {/* table */}
      <div className="mt-6 w-full">
        <DataTable
          columns={columns}
          data={data}
          filterColumn="firstName"
          filterPlaceholder="Filtrar por nombre..."
        />
      </div>
    </div>
  );
};

export default PatientPage;
