import { Form } from 'react-router'
import TextInput from '../inputs/TextInput'

type Props = {
    employee?: Employee
}

const EmployeeForm = ({employee}: Props) => {
  return (
    <Form 
        method="post" 
        className="w-full flex flex-col gap-8" 
        encType="multipart/form-data"
      >
        <div className="w-full grid md:grid-cols-2 gap-4 grid-cols-1">
          <div>
            <label htmlFor="full_name">Full Name</label>
            <TextInput type="text" name="full_name" id="full_name" required defaultValue={employee?.full_name} />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <TextInput type="email" name="email" id="email" required defaultValue={employee?.email} />
          </div>
          <div>
            <label htmlFor="dob">Date of Birth</label>
            <TextInput type="date" name="dob" id="dob" required defaultValue={employee?.dob} />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <TextInput type="text" name="phone" id="phone" defaultValue={employee?.phone} />
          </div>
          <div>
            <label htmlFor="photo">Photo</label>
            <input type="file" name="photo" id="photo" />
            {employee?.photo && <p>Current: {employee.photo}</p>}
          </div>
          <div>
            <label htmlFor="cv">CV</label>
            <input type="file" name="cv" id="cv" />
            {employee?.cv && <p>Current: {employee.cv}</p>}
          </div>
          <div>
            <label htmlFor="card_ID">Card ID</label>
            <input type="file" name="card_ID" id="card_ID" />
            {employee?.card_ID && <p>Current: {employee.card_ID}</p>}
          </div>
          <div>
            <label htmlFor="job_title">Job Title</label>
            <TextInput type="text" name="job_title" id="job_title" defaultValue={employee?.job_title} />
          </div>
          <div>
            <label htmlFor="department">Department</label>
            <TextInput type="text" name="department" id="department" defaultValue={employee?.department} />
          </div>
          <div>
            <label htmlFor="salary">Salary</label>
            <TextInput type="number" name="salary" id="salary" step="0.01" defaultValue={employee?.salary} />
          </div>
          <div>
            <label htmlFor="start_date">Start Date</label>
            <TextInput type="date" name="start_date" id="start_date" defaultValue={employee?.start_date} />
          </div>
          <div>
            <label htmlFor="end_date">End Date</label>
            <TextInput type="date" name="end_date" id="end_date" defaultValue={employee?.end_date} />
          </div>
        </div>

        <button className="bg-primary text-white rounded-md p-4 mx-auto w-full" type="submit">
          {employee ? "Update Employee" : "Create Employee"}
        </button>
      </Form>
  )
}

export default EmployeeForm