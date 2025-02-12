import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { useLoaderData, useNavigate } from "react-router";
import CommonUrls from "~/components/CommonUrls";
import ActionColumn from "~/components/Table/ActionColumn";
import ImgColumn from "~/components/Table/ImgColumn";
import Table from "~/components/Table/Table";
import { getDB } from "~/db/getDB";
import { ROUTES } from "~/routes";

export async function loader() {
  const db = await getDB();
  const employees = await db.all("SELECT * FROM employees;");

  return { employees };
}

export default function EmployeesPage() {
  const { employees } = useLoaderData();
  const navigate = useNavigate();

  const onViewHandler = (id: string) => {
    navigate(`${ROUTES.EMPLOYEES}/${id}`);
  };
  const columnHelper = createColumnHelper<Employee>();
  const columns: ColumnDef<Employee, any>[] = [
    columnHelper.accessor("id", { header: "Id" }),
    columnHelper.accessor("full_name", { header: "Full Name" }),
    columnHelper.accessor("email", { header: "Email" }),
    columnHelper.accessor("job_title", { header: "Job" }),
    columnHelper.accessor("photo", {
      header: "Photo",
      cell: (props) => {
        return <ImgColumn src={props.row.original.photo} />;
      },
    }),
    columnHelper.accessor("dob", { header: "Date Of Birth" }),
    columnHelper.display({
      id: "action",
      header: "Action",
      cell: (props) => {
        return <ActionColumn onView={() => onViewHandler(props.row.id)} />;
      },
    }),
  ];
  return (
    <div>
      <Table
        columns={columns}
        data={employees}
        title="Employees"
      />
      <hr />
      <CommonUrls />
    </div>
  );
}
