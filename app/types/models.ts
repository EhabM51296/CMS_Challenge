type Employee = {
    id: number;
    full_name: string;
    email: string;
    dob: string; 
    phone?: string;
    photo?: string;
    cv?: string;
    card_ID?: string;
    job_title?: string;
    department?: string;
    salary?: number;
    start_date?: string;
    end_date?: string;
  };
  
  type Timesheet = {
    id: number;
    start_time: string;
    end_time: string;
    employee_id: number;
  };


  type TimeSheetTable = Timesheet & {
    employee_full_name: string;
  }
  