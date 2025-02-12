import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import {
  useLoaderData,
  useNavigate,
  type LoaderFunctionArgs,
} from "react-router";
import CommonUrls from "~/components/CommonUrls";
import TextInput from "~/components/inputs/TextInput";
import ActionColumn from "~/components/Table/ActionColumn";
import ImgColumn from "~/components/Table/ImgColumn";
import Table from "~/components/Table/Table";
import { getDB } from "~/db/getDB";
import { ROUTES } from "~/routes";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const searchTerm = url.searchParams.get("search") || "";
  const itemsPerPage = 10;
  const offset = (page - 1) * itemsPerPage;

  const db = await getDB();

  let query = "SELECT * FROM employees";
  let whereCondition = "";
  let countQuery = "SELECT COUNT(*) as count FROM employees";

  if (searchTerm) {
    whereCondition += ` WHERE full_name LIKE ? OR email LIKE ? OR job_title LIKE ?`;
  }

  query += ` ${whereCondition} LIMIT ${itemsPerPage} OFFSET ${offset};`;
  countQuery += ` ${whereCondition}`;

  const employees = searchTerm
    ? await db.all(query, [
        `%${searchTerm}%`,
        `%${searchTerm}%`,
        `%${searchTerm}%`,
      ])
    : await db.all(query);

  const totalEmployees = searchTerm
    ? await db.get(countQuery, [searchTerm, searchTerm, searchTerm])
    : await db.get(countQuery);

  return {
    employees,
    totalPages: Math.ceil(totalEmployees.count / itemsPerPage),
    currentPage: page,
    searchTerm,
  };
}

export default function EmployeesPage() {
  const { employees, totalPages, currentPage, searchTerm } = useLoaderData();

  const navigate = useNavigate();
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || "");

  const onViewHandler = (id: number) => {
    navigate(`${ROUTES.EMPLOYEES}/${id}`);
  };

  const changePageHandler = (page: number) => {
    navigate(`?page=${page}&search=${localSearchTerm}`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setLocalSearchTerm(term);
    navigate(`?page=1&search=${term}`);
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
        return <ActionColumn onView={() => onViewHandler(props.row.original.id)} />;
      },
    }),
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="mb-4 w-full max-w-64">
        <TextInput
          placeholder="Search by name, email, or job..."
          value={localSearchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="w-full">
        <Table
          columns={columns}
          data={employees}
          title="Employees"
          currentPage={currentPage}
          pageHandler={changePageHandler}
          totalPages={totalPages}
        />
        <hr />
        <CommonUrls />
      </div>
    </div>
  );
}
