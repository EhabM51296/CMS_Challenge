import {
  redirect,
  useLoaderData,
  type ActionFunction,
  type LoaderFunctionArgs,
} from "react-router";
import CommonUrls from "~/components/CommonUrls";
import { getDB } from "~/db/getDB";
import noProfileImg from "../../../public/uploads/noProfile.jpg";
import EmployeeForm from "~/components/EmployeeForm/EmployeeForm";
import path from "path";
import fs from "fs";
import { ROUTES } from "~/routes";

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const id = params.employeeId;

  const full_name = formData.get("full_name");
  const email = formData.get("email");
  const dob = formData.get("dob");
  const phone = formData.get("phone") || null;
  const job_title = formData.get("job_title") || null;
  const department = formData.get("department") || null;
  const salary = formData.get("salary") ? Number(formData.get("salary")) : null;
  const start_date = formData.get("start_date") || null;
  const end_date = formData.get("end_date") || null;

  if (!full_name || !email || !dob) {
    return new Response("Missing required fields", { status: 400 });
  }

  const uploadFile = async (file: File | null, oldValue: string | null) => {
    if (!file || file.size == 0) return oldValue; 
    const filePath = path.join("public/uploads", `${Date.now()}_${file.name}`);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);
    return filePath;
  };

  const db = await getDB();

  let existingEmployee = null;

  existingEmployee = await db.get(`SELECT * FROM employees WHERE id = ?`, [id]);
  if (!existingEmployee) {
    return new Response("Employee not found", { status: 404 });
  }

  const photo = await uploadFile(
    formData.get("photo") as File,
    existingEmployee?.photo
  );
  const cv = await uploadFile(formData.get("cv") as File, existingEmployee?.cv);
  const card_ID = await uploadFile(
    formData.get("card_ID") as File,
    existingEmployee?.card_ID
  );

  await db.run(
    `UPDATE employees 
       SET full_name=?, email=?, dob=?, phone=?, photo=?, cv=?, card_ID=?, job_title=?, department=?, salary=?, start_date=?, end_date=?
       WHERE id = ?`,
    [
      full_name,
      email,
      dob,
      phone,
      photo,
      cv,
      card_ID,
      job_title,
      department,
      salary,
      start_date,
      end_date,
      id,
    ]
  );

  return redirect(ROUTES.EMPLOYEES);
};

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

  const img = employee.photo ? `../${employee.photo}` : noProfileImg;

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-2 grid-col-1 gap-20">
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
                    <a
                      href={employee.card_ID}
                      download
                      className="text-primary hover:underline"
                    >
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
                    <a
                      href={employee.cv}
                      download
                      className="text-primary hover:underline"
                    >
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
        <EmployeeForm employee={employee} />
      </div>

      <hr />
      <CommonUrls />
    </div>
  );
}
