import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import type User from "@/entities/user.model";

export function getUserColumns(
  handleEdit: (user: User) => void,
  handleDelete: (id: string) => void
): ColumnDef<User>[] {
  return [
    {
      accessorKey: "username",
      header: "Usuario",
      cell: ({ row }) => <div>{row.getValue("username")}</div>,
    },
    {
      accessorKey: "email",
      header: "Correo",
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "departmentId",
      header: "Departamento",
      cell: ({ row }) => {
        const dept = row.getValue("departmentId") as string | undefined;
        return (
          <div className="text-gray-700">
            {dept ? dept : "— Sin departamento —"}
          </div>
        );
      },
    },
    {
      accessorKey: "roleId",
      header: "Rol",
      cell: ({ row }) => {
        const roleId = row.getValue("roleId") as string;
        let color = "bg-gray-500";

        // Colores opcionales según rol
        if (roleId.includes("ceo")) color = "bg-yellow-500";
        else if (roleId.includes("junta")) color = "bg-blue-500";
        else if (roleId.includes("admin")) color = "bg-green-500";
        else if (roleId.includes("doctor")) color = "bg-purple-500";
        else if (roleId.includes("nurse")) color = "bg-pink-500";

        return (
          <Badge className={`${color} text-white capitalize`}>
            {roleId.replace("r-", "")}
          </Badge>
        );
      },
    },
    {
      accessorKey: "active",
      header: "Estado",
      cell: ({ row }) => {
        const active = row.getValue("active") as boolean;
        return (
          <Badge
            variant={active ? "default" : "destructive"}
            className={active ? "bg-green-600" : "bg-red-600"}
          >
            {active ? "Activo" : "Inactivo"}
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
        const user = row.original;
        return (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleEdit(user)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleDelete(user.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];
}
