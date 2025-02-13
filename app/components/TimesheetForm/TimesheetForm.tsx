import { Form } from "react-router";
import TextInput from "../inputs/TextInput";

type Props = {
  employees: Employee[];
  timesheet?: Timesheet;
};

const TimesheetForm = ({ employees, timesheet }: Props) => {
  return (
    <Form
      method="post"
      className="w-full flex flex-col gap-8"
      encType="multipart/form-data"
    >
      <div className="w-full grid md:grid-cols-2 gap-4 grid-cols-1">
        <div>
          <label htmlFor="start_time">Start Time</label>
          <TextInput
            type="datetime-local"
            name="start_time"
            id="start_time"
            required
            defaultValue={timesheet?.start_time}
          />
        </div>
        <div>
          <label htmlFor="end_time">End Time</label>
          <TextInput
            type="datetime-local"
            name="end_time"
            id="end_time"
            required
            defaultValue={timesheet?.end_time}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="end_time">End Time</label>
          <select
            name="employee_id"
            id="employee_id"
            required
            defaultValue={timesheet?.employee_id}
            className="text-text border p-2.5 rounded-md focus:outline-none border-primary-light focus:border-primary focus:bg-white transition-all bg-white"
          >
            <option value="">Select an Employee</option>
            {employees.map((e) => (
              <option key={e.id} value={e.id}>
                {e.full_name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        className="bg-primary text-white rounded-md p-4 mx-auto w-full"
        type="submit"
      >
        {timesheet ? "Update timesheet" : "Create timesheet"}
      </button>
    </Form>
  );
};

export default TimesheetForm;
