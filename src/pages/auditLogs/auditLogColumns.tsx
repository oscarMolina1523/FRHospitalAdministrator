import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import type AuditLog from "@/entities/auditLog.model";

export function getAuditLogColumns(
  handleEdit: (log: AuditLog) => void,
  handleDelete: (id: string) => void
): ColumnDef<AuditLog>[] {
  return [
    {
      accessorKey: "entity",
      header: "Entidad",
      cell: ({ row }) => <div>{row.getValue("entity")}</div>,
    },
    {
      accessorKey: "entityId",
      header: "ID de Entidad",
      cell: ({ row }) => <div>{row.getValue("entityId")}</div>,
    },
    {
      accessorKey: "action",
      header: "Acción",
      cell: ({ row }) => <div>{row.getValue("action")}</div>,
    },
    {
      accessorKey: "changes",
      header: "Cambios",
      cell: ({ row }) => (
        <div className="whitespace-normal wrap-break-word max-w-xs">
          {row.getValue("changes")}
        </div>
      ),
    },
    {
      accessorKey: "performedBy",
      header: "Realizado por",
      cell: ({ row }) => <div>{row.getValue("performedBy")}</div>,
    },
    {
      accessorKey: "performedAt",
      header: "Fecha",
      cell: ({ row }) => {
        const date = new Date(row.getValue("performedAt"));
        return date.toLocaleDateString("es-NI", {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const log = row.original;
        return (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleEdit(log)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleDelete(log.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];
}
