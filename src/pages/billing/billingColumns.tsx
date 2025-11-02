import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import type Billing from "@/entities/billing.model";
import { BillingStatus } from "@/entities/billingStatus.enum";
import { Payment } from "@/entities/payment.enum";

export function getBillingColumns(
  handleEdit: (billing: Billing) => void,
  handleDelete: (id: string) => void
): ColumnDef<Billing>[] {
  return [
    {
      accessorKey: "patientId",
      header: "Paciente",
      cell: ({ row }) => <div>{row.getValue("patientId")}</div>,
    },
    {
      accessorKey: "appointmentId",
      header: "Cita",
      cell: ({ row }) => <div>{row.getValue("appointmentId")}</div>,
    },
    {
      accessorKey: "serviceId",
      header: "Servicio",
      cell: ({ row }) => <div>{row.getValue("serviceId")}</div>,
    },
    {
      accessorKey: "departmentId",
      header: "Departamento",
      cell: ({ row }) => <div>{row.getValue("departmentId")}</div>,
    },
    {
      accessorKey: "amount",
      header: "Monto",
      cell: ({ row }) => {
        const amount = row.getValue("amount") as number;
        const formatted = new Intl.NumberFormat("es-NI", {
          style: "currency",
          currency: "NIO",
        }).format(amount);
        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "status",
      header: "Estado",
      cell: ({ row }) => {
        const status = row.getValue("status") as BillingStatus;
        let variant: string;
        switch (status) {
          case BillingStatus.PAID:
            variant = "bg-green-500";
            break;
          case BillingStatus.PENDING:
            variant = "bg-yellow-500";
            break;
          case BillingStatus.CANCELED:
            variant = "bg-red-500";
            break;
          default:
            variant = "bg-gray-500";
        }
        return <Badge className={variant}>{status}</Badge>;
      },
    },
    {
      accessorKey: "paymentMethod",
      header: "Pago",
      cell: ({ row }) => {
        const method = row.getValue("paymentMethod") as Payment;
        const variant = method === Payment.CASH ? "bg-green-500" : "bg-blue-500";
        return <Badge className={variant}>{method}</Badge>;
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
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const billing = row.original;
        return (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleEdit(billing)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleDelete(billing.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];
}
