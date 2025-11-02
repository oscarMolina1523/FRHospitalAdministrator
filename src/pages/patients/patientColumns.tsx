import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import type Patient from "@/entities/patient.model";

export function getPatientColumns(
  handleEdit: (patient: Patient) => void,
  handleDelete: (id: string) => void,
  getDepartmentNameById?: (id: string) => string // opcional, muestra el nombre del departamento
): ColumnDef<Patient>[] {
  return [
    {
      accessorKey: "firstName",
      header: "Nombre",
      cell: ({ row }) => <div>{row.getValue("firstName")}</div>,
    },
    {
      accessorKey: "lastName",
      header: "Apellido",
      cell: ({ row }) => <div>{row.getValue("lastName")}</div>,
    },
    {
      accessorKey: "gender",
      header: "Género",
      cell: ({ row }) => {
        const gender = row.getValue("gender") as string;
        const isMale = gender.toLowerCase() === "male";

        return (
          <Badge className={isMale ? "bg-blue-500 text-white" : "bg-pink-500 text-white"}>
            {isMale ? "Masculino" : "Femenino"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "birthDate",
      header: "Fecha de Nacimiento",
      cell: ({ row }) => {
        const date = new Date(row.getValue("birthDate"));
        return date.toLocaleDateString("es-NI", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      },
    },
    {
      accessorKey: "departmentId",
      header: "Departamento",
      cell: ({ row }) => {
        const departmentId = row.getValue("departmentId") as string | undefined;
        const departmentName = getDepartmentNameById
          ? getDepartmentNameById(departmentId || "")
          : departmentId || "No asignado";

        return (
          <Badge
            className={
              departmentId
                ? "bg-indigo-500 text-white capitalize"
                : "bg-gray-400 text-white"
            }
          >
            {departmentName}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Creado",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        return date.toLocaleDateString("es-NI", {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      },
    },
    // {
    //   accessorKey: "updatedAt",
    //   header: "Actualizado",
    //   cell: ({ row }) => {
    //     const date = new Date(row.getValue("updatedAt"));
    //     return date.toLocaleDateString("es-NI", {
    //       weekday: "short",
    //       day: "2-digit",
    //       month: "short",
    //       year: "numeric",
    //     });
    //   },
    // },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const patient = row.original;
        return (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleEdit(patient)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleDelete(patient.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];
}
