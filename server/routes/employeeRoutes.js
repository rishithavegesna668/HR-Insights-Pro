
const express = require("express");
const router = express.Router();

const Employee = require("../models/Employee");

// 1. Add a new employee
router.post("/", async (req, res) => {
  try {
    const employee = await Employee.create(req.body);

    res.status(201).json({
      success: true,
      message: "Employee added successfully",
      data: employee
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.code === 11000
        ? "Email already exists"
        : error.message
    });
  }
});

// 2. Get all employees (with optional search)
router.get("/", async (req, res) => {
  try {
    const { search, department, status } = req.query;

    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ];
    }

    if (department) filter.department = department;
    if (status) filter.status = status;

    const employees = await Employee.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: employees.length,
      data: employees
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// 3. Get one employee by ID
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }

    res.json({ success: true, data: employee });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid employee ID"
    });
  }
});

// 4. Update employee
router.put("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }

    res.json({
      success: true,
      message: "Employee updated successfully",
      data: employee
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.code === 11000
        ? "Email already exists"
        : error.message
    });
  }
});

// 5. Delete employee
router.delete("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }

    res.json({
      success: true,
      message: "Employee deleted successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid employee ID"
    });
  }
});

module.exports = router;
