import { X } from "lucide-react";
import type { EmployeeDetailModalProps } from "../types";

export const EmployeeDetailModal: React.FC<EmployeeDetailModalProps> = ({ employee, onClose }) => {
  if (!employee) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Employee Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-2"
              type="button"
            >
              <X size={24} />
            </button>
          </div>

          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
              {employee.employee_name.charAt(0).toUpperCase()}
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              {employee.employee_name}
            </h3>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-600 mb-1">Employee ID</label>
              <p className="text-lg text-gray-800">#{employee.id}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
              <p className="text-lg text-gray-800">{employee.employee_name}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-600 mb-1">Age</label>
              <p className="text-lg text-gray-800">{employee.employee_age} years old</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-600 mb-1">Annual Salary</label>
              <p className="text-lg text-green-600 font-semibold">${employee.employee_salary.toLocaleString()}</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};