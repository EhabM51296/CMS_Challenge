import {
  useLoaderData,
  useNavigate,
  type LoaderFunctionArgs,
} from "react-router";
import { getDB } from "~/db/getDB";
import CommonUrls from "~/components/CommonUrls";
import Table from "~/components/Table/Table";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import ActionColumn from "~/components/Table/ActionColumn";
import { ROUTES } from "~/routes";
import Calendar from "~/components/Calendar";
import { useState } from "react";
import clsx from "clsx";

export async function loader({ request }: LoaderFunctionArgs) {
  const db = await getDB();
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);

  const itemsPerPage = 10;
  const offset = (page - 1) * itemsPerPage;

  const timesheetsAndEmployees = await db.all(
    `SELECT timesheets.*, employees.full_name as 'employee_full_name' , employees.id AS employee_id FROM timesheets JOIN employees ON timesheets.employee_id = employees.id
    LIMIT ${itemsPerPage} OFFSET ${offset}
    `
  );

  let countQuery =
    "SELECT COUNT(*) as count FROM timesheets JOIN employees ON timesheets.employee_id = employees.id";

  const totalEmployees = await db.get(countQuery);

  return {
    timesheetsAndEmployees,
    totalPages: Math.ceil(totalEmployees.count / itemsPerPage),
    currentPage: page,
  };
}

export default function TimesheetsPage() {
  const [tableView, setTableView] = useState(false);

  const { timesheetsAndEmployees, totalPages, currentPage } = useLoaderData();
  const navigate = useNavigate();

  const onViewHandler = (id: number) => {
    navigate(`${ROUTES.TIMESHEETS}/${id}`);
  };

  const changePageHandler = (page: number) => {
    navigate(`?page=${page}`);
  };

  const columnHelper = createColumnHelper<TimeSheetTable>();
  const columns: ColumnDef<TimeSheetTable, any>[] = [
    columnHelper.accessor("id", { header: "Id" }),
    columnHelper.accessor("start_time", { header: "Start Time" }),
    columnHelper.accessor("end_time", { header: "End Time" }),
    columnHelper.accessor("employee_full_name", { header: "Employee Name" }),
    columnHelper.display({
      id: "action",
      header: "Action",
      cell: (props) => {
        return (
          <ActionColumn onView={() => onViewHandler(props.row.original.id)} />
        );
      },
    }),
  ];

  return (
    <div>
      <div className="flex items-center gap-4">
        <button
          className={clsx(
            "bg-label text-white p-2 rounded-md transition-all hover:bg-primary",
            { "bg-primary": tableView }
          )}
          onClick={() => setTableView(true)}
        >
          Table View
        </button>
        <button
          className={clsx(
            "bg-label text-white p-2 rounded-md transition-all hover:bg-primary",
            { "bg-primary": !tableView }
          )}
          onClick={() => setTableView(false)}
        >
          Calendar View
        </button>
      </div>
      <div className="mt-8">
        {tableView ? (
          <Table
            columns={columns}
            data={timesheetsAndEmployees}
            title="Timesheets"
            currentPage={currentPage}
            pageHandler={changePageHandler}
            totalPages={totalPages}
          />
        ) : (
          <Calendar timeSheets={timesheetsAndEmployees} />
        )}
      </div>
      <hr />
      <CommonUrls />
    </div>
  );
}
