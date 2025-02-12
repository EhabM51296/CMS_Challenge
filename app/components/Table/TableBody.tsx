import { type Row, type Table, flexRender } from "@tanstack/react-table";
import clsx from "clsx";

export type Props<T> = {
  data: T[];
  table: Table<T>;
  tableColumns: number;
};

export default function InvoicesTableBody<T>({ table }: Props<T>) {
  return table.getRowModel().rows.map((row, index) => {
    return (
      <tr
        key={row.id}
        className={clsx(
          "relative mx-4 hover:bg-primary-100 duration-200 ease-in "
        )}
      >
        {row.getVisibleCells().map((cell) => {
          return (
            <td
              key={cell.id}
              className={clsx(
                "break-all pl-6 py-2 border-t border-t-gray-200",
                index === table.getRowModel().rows.length - 1 &&
                  "border-b border-b-gray-200"
              )}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          );
        })}
      </tr>
    );
  });
}
