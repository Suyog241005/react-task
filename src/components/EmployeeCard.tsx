import { Check, Edit, Trash2 } from "lucide-react";
import type { EmployeeCardProps } from "../types";
import { Link } from "react-router-dom";

export const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee,
  onDelete,
  onEdit,
  isSelected,
  onSelectToggle,
}) => {
  // const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
  //   if (!(e.target as HTMLElement).closest(".action-button")) {
  //     onCardClick(employee);
  //   }
  // };

  const handleSelectToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onSelectToggle(employee.id);
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onEdit(employee);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete(employee.id);
  };

  return (
    <div
      className={`relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer border-2 ${
        isSelected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 hover:border-gray-300"
      } transform hover:scale-105`}
    >
      {/* Selection Checkbox */}
      <div className="absolute top-3 left-3">
        <button
          className={`action-button w-5 h-5 rounded border-2 flex items-center justify-center ${
            isSelected
              ? "bg-blue-500 border-blue-500 text-white"
              : "border-gray-300 hover:border-blue-500"
          }`}
          onClick={handleSelectToggle}
          type="button"
        >
          {isSelected && <Check size={12} />}
        </button>
      </div>

      {/* Employee Avatar */}
      <Link
        to={{
          pathname: `/${employee.id}`,
          search: `?employee_name=${encodeURIComponent(
            employee.employee_name
          )}&employee_salary=${employee.employee_salary}&employee_age=${
            employee.employee_age
          }`,
        }}
        key={employee.id}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="flex flex-col items-center mb-4">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3">
            {employee.employee_name.charAt(0).toUpperCase()}
          </div>
          <h3 className="text-xl font-semibold text-gray-800 text-center">
            {employee.employee_name}
          </h3>
        </div>

        {/* Employee Details */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">ID:</span>
            <span className="font-medium text-gray-800">#{employee.id}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Age:</span>
            <span className="font-medium text-gray-800">
              {employee.employee_age} years
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Salary:</span>
            <span className="font-medium text-green-600">
              ${employee.employee_salary.toLocaleString()}
            </span>
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-6">
        <button
          className="action-button flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
          onClick={handleEdit}
          type="button"
        >
          <Edit size={16} />
          Edit
        </button>
        <button
          className="action-button flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
          onClick={handleDelete}
          type="button"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
};
