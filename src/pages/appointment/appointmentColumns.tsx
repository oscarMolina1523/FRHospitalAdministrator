import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import type Appointment from "@/entities/appointment.model";

export function getAppointmentColumns(
  handleEdit: (appointment: Appointment) => void,
  handleDelete: (id: string) => void
): ColumnDef<Appointment>[] {
  return [
    {
      accessorKey: "patientName",
      header: "Paciente",
      cell: ({ row }) => <div>{row.getValue("patientName") ?? row.getValue("patientId")}</div>,
    },
    {
      accessorKey: "doctorName",
      header: "Doctor",
      cell: ({ row }) => <div>{row.getValue("doctorName") ?? row.getValue("doctorId")}</div>,
    },
    {
      accessorKey: "departmentName",
      header: "Departamento",
      cell: ({ row }) => <div>{row.getValue("departmentName") ?? row.getValue("departmentId")}</div>,
    },
    {
      accessorKey: "status",
      header: "Estado",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const variant =
          status === "completed"
            ? "bg-green-500"
            : status === "canceled"
            ? "bg-red-500"
            : "bg-yellow-500";
        return <Badge className={variant}>{status}</Badge>;
      },
    },
    {
      accessorKey: "scheduledAt",
      header: "Fecha",
      cell: ({ row }) => {
        const date = new Date(row.getValue("scheduledAt"));
        return (
          <div>
            {date.toLocaleDateString("es-NI", {
              weekday: "short",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const appointment = row.original;
        return (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleEdit(appointment)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleDelete(appointment.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];
}
