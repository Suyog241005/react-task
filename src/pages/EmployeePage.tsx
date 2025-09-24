import { Edit } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";

const EmployeePage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const employeeName = searchParams.get("employee_name");
  const employeeSalary = searchParams.get("employee_salary");
  const employeeAge = searchParams.get("employee_age");

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Employee Details
            </h1>
            <button
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              type="button"
            >
              <Edit className="mr-2 h-5 w-5" />
              Edit
            </button>
          </div>

          {/* Profile Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg">
              {employeeName?.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              {employeeName}
            </h2>
            <p className="text-gray-500">Employee #{id}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-5 rounded-lg hover:bg-gray-100 transition-colors duration-200 sm:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Employee ID
              </label>
              <p className="text-lg text-gray-800 font-medium">#{id}</p>
            </div>
            <div className="bg-gray-50 p-5 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Age
              </label>
              <p className="text-lg text-gray-800 font-medium">
                {employeeAge} years old
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Annual Salary
              </label>
              <p className="text-lg text-green-600 font-semibold">
                ${employeeSalary && Number(employeeSalary).toLocaleString()}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePage;
