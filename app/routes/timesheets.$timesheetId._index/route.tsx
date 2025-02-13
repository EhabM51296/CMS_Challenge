import {
  redirect,
  useLoaderData,
  type ActionFunction,
  type LoaderFunctionArgs,
} from "react-router";
import CommonUrls from "~/components/CommonUrls";
import { getDB } from "~/db/getDB";
import { ROUTES } from "~/routes";
import TimesheetForm from "~/components/TimesheetForm/TimesheetForm";

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const id = params.timesheetId;
  const employee_id = formData.get("employee_id");
  const start_time = formData.get("start_time");
  const end_time = formData.get("end_time");

  const db = await getDB();
  await db.run(
    "UPDATE timesheets SET employee_id=?, start_time=?, end_time=? where id=?",
    [employee_id, start_time, end_time, id]
  );

  return redirect(ROUTES.TIMESHEETS);
};

export async function loader({ params }: LoaderFunctionArgs): Promise<{
  timesheet: TimeSheetTable;
  employees: Employee[];
}> {
  const timesheetId = params.timesheetId;

  if (!timesheetId) {
    throw new Response("timesheet ID is required", { status: 400 });
  }

  const db = await getDB();
  const timesheet = await db.get<TimeSheetTable>(
    "SELECT timesheets.*, employees.full_name as 'employee_full_name' , employees.id AS employee_id FROM timesheets JOIN employees ON timesheets.employee_id = employees.id WHERE timesheets.id = ?",
    [timesheetId]
  );

  if (!timesheet) {
    throw new Response("timesheet not found", { status: 404 });
  }

  const employees = await db.all("SELECT id, full_name FROM employees");

  return { timesheet, employees };
}

export default function TimesheetPage() {
  const { timesheet, employees } = useLoaderData<{
    timesheet: TimeSheetTable;
    employees: Employee[];
  }>();

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-2 grid-col-1 gap-20">
        <div className="flex flex-col gap-2">
          <h1>Timesheet Information</h1>
          <ul>
            <li>Start time: {timesheet.start_time}</li>
            <li>End time: {timesheet.end_time}</li>
            <li>Employee: {timesheet.employee_full_name}</li>
          </ul>
        </div>
        <TimesheetForm timesheet={timesheet} employees={employees} />
      </div>
      <hr />
      <CommonUrls />
    </div>
  );
}
