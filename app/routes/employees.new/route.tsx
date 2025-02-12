import { Form, redirect, type ActionFunction } from "react-router";
import CommonUrls from "~/components/CommonUrls";
import { getDB } from "~/db/getDB";
import { ROUTES } from "~/routes";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const full_name = formData.get("full_name");

  const db = await getDB();
  await db.run(
    'INSERT INTO employees (full_name) VALUES (?)',
    [full_name]
  );

  return redirect(ROUTES.EMPLOYEES);
}

export default function NewEmployeePage() {
  return (
    <div>
      <h1>Create New Employee</h1>
      <Form method="post">
        <div>
          <label htmlFor="full_name">Full Name</label>
          <input type="text" name="full_name" id="full_name" required />
        </div>
        <button type="submit">Create Employee</button>
      </Form>
      <hr />
      <CommonUrls />
    </div>
  );
}
