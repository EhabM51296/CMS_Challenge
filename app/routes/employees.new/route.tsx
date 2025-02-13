import {
  Form,
  redirect,
  useLoaderData,
  type ActionFunction,
  type LoaderFunctionArgs,
} from "react-router";
import CommonUrls from "~/components/CommonUrls";
import TextInput from "~/components/inputs/TextInput";
import { getDB } from "~/db/getDB";
import { ROUTES } from "~/routes";
import fs from "fs";
import path from "path";
import EmployeeForm from "~/components/EmployeeForm/EmployeeForm";

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();

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

  const uploadFile = async (file: File | null) => {
    if (!file || file.size == 0) return null;
    const filePath = path.join("public/uploads", `${Date.now()}_${file.name}`);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);
    return filePath;
  };

  const db = await getDB();

  const photo = await uploadFile(formData.get("photo") as File);
  const cv = await uploadFile(formData.get("cv") as File);
  const card_ID = await uploadFile(formData.get("card_ID") as File);

  await db.run(
    `INSERT INTO employees (full_name, email, dob, phone, photo, cv, card_ID, job_title, department, salary, start_date, end_date) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
    ]
  );

  return redirect(ROUTES.EMPLOYEES);
};



export default function NewEmployeePage() {
  return (
    <div className="bg-white w-full max-w-3xl mx-auto p-8 flex flex-col gap-8">
      <h1>Create New Employee</h1>
      <EmployeeForm />
      <hr />
      <CommonUrls />
    </div>
  );
}
