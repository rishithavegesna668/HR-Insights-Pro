const API_URL = "http://localhost:5000/api/employees";

// Get all employees
export const getEmployees = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }

  return response.json();
};