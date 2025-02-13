import { useLoaderData, redirect } from "react-router";
import { getDB } from "~/db/getDB";
import type { ActionFunction } from "react-router";
import CommonUrls from "~/components/CommonUrls";
import TimesheetForm from "~/components/TimesheetForm/TimesheetForm";
import { ROUTES } from "~/routes";

export async function loader() {
  const db = await getDB();
  const employees = await db.all("SELECT id, full_name FROM employees");
  return { employees };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const employee_id = formData.get("employee_id");
  const start_time = formData.get("start_time");
  const end_time = formData.get("end_time");

  const db = await getDB();
  await db.run(
    "INSERT INTO timesheets (employee_id, start_time, end_time) VALUES (?, ?, ?)",
    [employee_id, start_time, end_time]
  );

  return redirect(ROUTES.TIMESHEETS);
};


export default function NewTimesheetPage() {
  const { employees } = useLoaderData(); 

  return (
    <div className="bg-white w-full max-w-3xl mx-auto p-8 flex flex-col gap-8">
      <h1>Create New Timesheet</h1>
      <TimesheetForm employees={employees} />
      <hr />
      <CommonUrls />
    </div>
  );
}
