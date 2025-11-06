import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { getDepartmentColumns } from "./departmentColumns";
import { DataTable } from "@/components/dataTable";
import type Department from "@/entities/department.model";
import { useDepartmentContext } from "@/context/DepartmentContext";

const DepartmentPage: React.FC = () => {
  const {
    departments: data,
    loadingDepartment,
    errorDepartment,
    fetchDepartments,
  } = useDepartmentContext();

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  function handleEdit(department: Department) {
    console.log("Editar department:", department);
  }

  function handleDelete(id: string) {
    console.log("Eliminar inentory con ID:", id);
  }

  const columns = getDepartmentColumns(handleEdit, handleDelete);

  if (loadingDepartment) {
    return <div className="p-4 text-gray-500">Cargando departamentos...</div>;
  }

  if (errorDepartment) {
    return <div className="p-4 text-red-600">Error: {errorDepartment}</div>;
  }

  return (
    <div className="bg-white h-full rounded-2xl items-start justify-start flex flex-col gap-2 p-4">
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <p className="text-[#0f172a] text-[1.25rem] leading-7">
            Departamentos
          </p>
        </div>
        <div>
          <Button className="bg-sky-600 text-white">Nuevo Departamento</Button>
        </div>
      </div>
      {/* table */}
      <div className="mt-6 w-full">
        <DataTable
          columns={columns}
          data={data}
          filterColumn="name"
          filterPlaceholder="Filtrar por departamento..."
        />
      </div>
    </div>
  );
};

export default DepartmentPage;
