import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

/**
 * Props genéricas para que el componente sea reutilizable.
 * TData → tipo de los datos (por ejemplo: Appointment, Patient, Doctor, etc.)
 * TValue → tipo de los valores de columna
 */
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[] // configuración de columnas
  data: TData[]                       // datos que se van a mostrar
}

/**
 * Componente DataTable genérico
 * Reutilizable en cualquier parte del proyecto
 */
export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  // Crea la tabla con TanStack
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  // Renderiza la tabla usando los componentes UI de ShadCN
  return (
    <div className="border rounded-xl overflow-hidden">
      <Table>
        <TableHeader className="bg-blue-600">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="text-center  text-white">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center h-24">
                No hay resultados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
