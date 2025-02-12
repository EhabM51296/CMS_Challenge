import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import CommonUrls from "~/components/CommonUrls";
import { getDB } from "~/db/getDB";
import noProfileImg from "../../uploads/noProfile.jpg";

export async function loader({
  params,
}: LoaderFunctionArgs): Promise<{ employee: Employee }> {
  const employeeId = params.employeeId;

  if (!employeeId) {
    throw new Response("Employee ID is required", { status: 400 });
  }

  const db = await getDB();
  const employee = await db.get<Employee>(
    "SELECT * FROM employees WHERE id = ?;",
    [employeeId]
  );

  if (!employee) {
    throw new Response("Employee not found", { status: 404 });
  }

  return { employee };
}

export default function EmployeePage() {
  const { employee } = useLoaderData<{ employee: Employee }>();

  const img = employee.photo ?? noProfileImg;

  return (
    <div className="w-full">
      <div className="flex flex-col gap-6">
        <img src={img} className="w-2xs" />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1>Personal Information</h1>
            <ul>
              <li>Full Name: {employee.full_name}</li>
              <li>Email: {employee.email}</li>
              <li>Phone: {employee.phone}</li>
              <li>Date of Birth: {employee.dob}</li>
              {employee.card_ID ? (
                <li>
                  <a href={employee.card_ID} download className="text-primary hover:underline">
                    Download Card ID
                  </a>
                </li>
              ) : (
                <li className="text-gray-500">No Card ID available</li>
              )}
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h1>Profession Informarion</h1>
            <ul>
              <li>Job Title: {employee.job_title}</li>
              <li>Department: {employee.department}</li>
              <li>Start Date: {employee.start_date}</li>
              <li>End Date: {employee.end_date}</li>
              {employee.cv ? (
                <li>
                  <a href={employee.cv} download className="text-primary hover:underline">
                    Download CV
                  </a>
                </li>
              ) : (
                <li className="text-gray-500">No CV available</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <hr />
      <CommonUrls />
    </div>
  );
}
