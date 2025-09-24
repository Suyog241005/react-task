import React, { useState, useEffect } from "react";
import { Search, Trash2, Users, X } from "lucide-react";
import axios from "axios";
import type { ApiResponse, Employee } from "../types";
import { EmployeeDetailModal } from "../components/EmployeeDetailModal";
import { EmployeeCard } from "../components/EmployeeCard";

const EmployeeDashboard: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchId, setSearchId] = useState<string>("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<Set<number>>(
    new Set()
  );

  // Fetch employees from API
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios(
        "https://dummy.restapiexample.com/api/v1/employees"
      );

      if (!response.status) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.data;

      if (data.status === "success" && Array.isArray(data.data)) {
        setEmployees(data.data);
        setFilteredEmployees(data.data);
      } else {
        throw new Error("Invalid data format received from API");
      }
    } catch (err) {
      window.location.reload();
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(`Failed to load employee data: ${errorMessage}`);
      console.error("Error fetching employees:", err);
    } finally {
      setLoading(false);
    }
  };

  // Search functionality
  const handleSearch = (): void => {
    if (searchId.trim() === "") {
      setFilteredEmployees(employees);
    } else {
      const searchIdNumber = parseInt(searchId.trim(), 10);
      if (isNaN(searchIdNumber)) {
        setFilteredEmployees([]);
      } else {
        const filtered = employees.filter((emp) => emp.id === searchIdNumber);
        setFilteredEmployees(filtered);
      }
    }
  };

  // Clear search
  const clearSearch = (): void => {
    setSearchId("");
    setFilteredEmployees(employees);
  };

  // Delete single employee
  const handleDelete = (employeeId: number): void => {
    const updatedEmployees = employees.filter((emp) => emp.id !== employeeId);
    setEmployees(updatedEmployees);
    setFilteredEmployees(
      updatedEmployees.filter(
        (emp) => searchId.trim() === "" || emp.id.toString() === searchId.trim()
      )
    );
    setSelectedEmployeeIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(employeeId);
      return newSet;
    });
  };

  // Edit employee (placeholder)
  const handleEdit = (employee: Employee): void => {
    alert(
      `Edit functionality would be implemented for ${employee.employee_name}`
    );
  };



  // Handle employee selection toggle
  const handleSelectToggle = (employeeId: number): void => {
    setSelectedEmployeeIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(employeeId)) {
        newSet.delete(employeeId);
      } else {
        newSet.add(employeeId);
      }
      return newSet;
    });
  };

  // Delete selected employees
  const handleDeleteSelected = (): void => {
    if (selectedEmployeeIds.size === 0) return;

    const updatedEmployees = employees.filter(
      (emp) => !selectedEmployeeIds.has(emp.id)
    );
    setEmployees(updatedEmployees);
    setFilteredEmployees(
      updatedEmployees.filter(
        (emp) => searchId.trim() === "" || emp.id.toString() === searchId.trim()
      )
    );
    setSelectedEmployeeIds(new Set());
  };

  // Select all visible employees
  const handleSelectAll = (): void => {
    const allIds = new Set(filteredEmployees.map((emp) => emp.id));
    setSelectedEmployeeIds(allIds);
  };

  // Clear all selections
  const handleClearSelection = (): void => {
    setSelectedEmployeeIds(new Set());
  };

  // Handle search input change
  const handleSearchInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchId(e.target.value);
  };

  // Handle search on Enter key press
  const handleSearchKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Handle modal close
  const handleModalClose = (): void => {
    setSelectedEmployee(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading employee data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
          <div className="text-red-500 mb-4">
            <X size={48} className="mx-auto" />
          </div>
          <p className="text-gray-800 text-lg mb-4">{error}</p>
          <button
            onClick={fetchEmployees}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            type="button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="text-blue-500" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">
              Employee Dashboard
            </h1>
          </div>
          <p className="text-gray-600">
            Manage and view employee information. Click on any card to see
            detailed information, use the search feature to find specific
            employees by ID, and use the action buttons to edit or delete
            records.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Search Employee by ID
              </label>
              <input
                id="search"
                type="text"
                value={searchId}
                onChange={handleSearchInputChange}
                placeholder="Enter employee ID (e.g., 1, 2, 3...)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                onKeyPress={handleSearchKeyPress}
              />
            </div>
            <div className="flex gap-2 sm:mt-7">
              <button
                onClick={handleSearch}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                type="button"
              >
                <Search size={20} />
                Search
              </button>
              {searchId && (
                <button
                  onClick={clearSearch}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                  type="button"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Selection Controls */}
        {filteredEmployees.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                {selectedEmployeeIds.size} of {filteredEmployees.length}{" "}
                selected
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleSelectAll}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  type="button"
                >
                  Select All
                </button>
                <span className="text-gray-400">|</span>
                <button
                  onClick={handleClearSelection}
                  className="text-gray-600 hover:text-gray-700 text-sm font-medium"
                  type="button"
                >
                  Clear Selection
                </button>
              </div>
            </div>
            {selectedEmployeeIds.size > 0 && (
              <button
                onClick={handleDeleteSelected}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                type="button"
              >
                <Trash2 size={16} />
                Delete Selected ({selectedEmployeeIds.size})
              </button>
            )}
          </div>
        )}

        {/* Employee Cards Grid */}
        {filteredEmployees.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEmployees.map((employee) => (
              
                <EmployeeCard
                  key={employee.id}
                  employee={employee}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  isSelected={selectedEmployeeIds.has(employee.id)}
                  onSelectToggle={handleSelectToggle}
                />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users size={64} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No Employees Found
            </h3>
            <p className="text-gray-500">
              {searchId
                ? `No employee found with ID: ${searchId}`
                : "No employee data available."}
            </p>
            {searchId && (
              <button
                onClick={clearSearch}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                type="button"
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        {/* Statistics */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Statistics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {employees.length}
              </div>
              <div className="text-sm text-gray-600">Total Employees</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {filteredEmployees.length}
              </div>
              <div className="text-sm text-gray-600">Displayed</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {selectedEmployeeIds.size}
              </div>
              <div className="text-sm text-gray-600">Selected</div>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Detail Modal */}
      <EmployeeDetailModal
        employee={selectedEmployee}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default EmployeeDashboard;
