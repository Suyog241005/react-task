// Type definitions
export interface Employee {
  id: number;
  employee_name: string;
  employee_salary: number;
  employee_age: number;
  profile_image: string;
}

export interface ApiResponse {
  status: string;
  data: Employee[];
}

export interface EmployeeCardProps {
  employee: Employee;
  onDelete: (id: number) => void;
  onEdit: (employee: Employee) => void;
  isSelected: boolean;
  onSelectToggle: (id: number) => void;
}

export interface EmployeeDetailModalProps {
  employee: Employee | null;
  onClose: () => void;
}