import { Button } from "@/components/ui/button";
import React from "react";
import { getUserColumns } from "./userColumns";
import { userData as data } from "@/data/user.data";
import { DataTable } from "@/components/dataTable";
import type User from "@/entities/user.model";

const UserPage: React.FC = () => {
  function handleEdit(user: User) {
    console.log("Editar user:", user);
  }

  function handleDelete(id: string) {
    console.log("Eliminar user con ID:", id);
  }

  const columns = getUserColumns(handleEdit, handleDelete);

  return (
    <div className="bg-white h-full rounded-2xl items-start justify-start flex flex-col gap-2 p-4">
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <p className="text-[#0f172a] text-[1.25rem] leading-7">Usuarios</p>
        </div>
        <div>
          <Button className="bg-sky-600 text-white">Nuevo Usuario</Button>
        </div>
      </div>
      {/* table */}
      <div className="mt-6 w-full">
        <DataTable
          columns={columns}
          data={data}
          filterColumn="username"
          filterPlaceholder="Filtrar por nombre de usuario..."
        />
      </div>
    </div>
  );
};

export default UserPage;
