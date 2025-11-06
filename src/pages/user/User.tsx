import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { getUserColumns } from "./userColumns";
// import { userData as data } from "@/data/user.data";
import { DataTable } from "@/components/dataTable";
import type User from "@/entities/user.model";
import { useUserContext } from "@/context/UserContext";

const UserPage: React.FC = () => {
  const { users: data, loadingUser, errorUser, fetchUsers } = useUserContext();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  function handleEdit(user: User) {
    console.log("Editar user:", user);
  }

  function handleDelete(id: string) {
    console.log("Eliminar user con ID:", id);
  }

  const columns = getUserColumns(handleEdit, handleDelete);

  if (loadingUser) {
    return <div className="p-4 text-gray-500">Cargando usuarios...</div>;
  }

  if (errorUser) {
    return <div className="p-4 text-red-600">Error: {errorUser}</div>;
  }

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
