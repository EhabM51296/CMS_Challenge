import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Fragment, useRef, useState } from "react";

import clsx from "clsx";

import InvoicesTableBody from "./TableBody";
import Pagination from "./Pagination";

export type Props<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  title: string;
  currentPage: number;
  totalPages: number;
  pageHandler: (page: number) => void;
  className?: string;
};

export default function InvoicesTable<T>({
  data,
  columns,
  title,
  currentPage,
  pageHandler,
  totalPages,
  className,
}: Props<T>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tableHeaderRef = useRef<HTMLTableRowElement | null>(null);

  const table = useReactTable<T>({
    data: data,
    columns: columns,
    defaultColumn: {
      minSize: 20,
      maxSize: 500,
      cell: (props) => props.getValue(),
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div
      ref={containerRef}
      className={clsx(
        "bg-white flex flex-col rounded-md pb-3 max-h-[600px] w-full",
        className
      )}
    >
      <div className="relative w-[98%] mx-auto  bg-primary text-white rounded-md py-3 -translate-y-1/3 shadow-black shadow-md">
        <h3 className="text-lg ml-3">{title}</h3>
      </div>
      <div className="w-full overflow-auto">
        <table className="w-full border-separate border-spacing-0 border-transparent md:min-w-auto min-w-[1000px]">
          <thead className="z-10">
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <Fragment key={headerGroup.id}>
                  <tr
                    className="sticky top-0 z-10 duration-200 ease-in bg-white"
                    ref={tableHeaderRef}
                    key={headerGroup.id}
                  >
                    {headerGroup.headers.map((header) => {
                      return (
                        <th
                          key={header.id}
                          className={clsx(
                            "py-2 pl-6 text-start text-sm border-t border-t-gray-200 text-gray-500 "
                          )}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </th>
                      );
                    })}
                    <th />
                  </tr>
                </Fragment>
              );
            })}
          </thead>
          <tbody>
            <InvoicesTableBody
              data={data}
              table={table}
              tableColumns={columns.length}
            />
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        changePageHandler={pageHandler}
      />
    </div>
  );
}
