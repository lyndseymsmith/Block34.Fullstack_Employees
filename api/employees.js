import express from "express";
import {
  getEmployees,
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee
} from "#db/queries/employees";

const router = express.Router();

// GET /employees - get all employees
router.get("/", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.json(employees);
  } catch (err) {
    next(err);
  }
});

// POST /employees - create new employee
router.post("/", async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body required" });
    }
    const { name, birthday, salary } = req.body;
    if (!name || !birthday || !salary) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const employee = await createEmployee({ name, birthday, salary });
    res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
});

// GET /employees/:id - get employee by id
router.get("/:id", async (req, res, next) => {
  try {
    const idNum = Number(req.params.id);
    if (!Number.isInteger(idNum) || isNaN(idNum) || req.params.id.trim() === "" || req.params.id.includes(".") || req.params.id.includes("e") || idNum < 0) {
      return res.status(400).json({ error: "Invalid employee id" });
    }
    if (idNum === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    const employee = await getEmployee(idNum);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    next(err);
  }
});

// DELETE /employees/:id - delete employee by id
router.delete("/:id", async (req, res, next) => {
  try {
    const idNum = Number(req.params.id);
    if (!Number.isInteger(idNum) || isNaN(idNum) || req.params.id.trim() === "" || req.params.id.includes(".") || req.params.id.includes("e") || idNum < 0) {
      return res.status(400).json({ error: "Invalid employee id" });
    }
    if (idNum === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    const deleted = await deleteEmployee(idNum);
    if (!deleted) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// PUT /employees/:id - update employee by id
router.put("/:id", async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body required" });
    }
    const idNum = Number(req.params.id);
    if (!Number.isInteger(idNum) || isNaN(idNum) || req.params.id.trim() === "" || req.params.id.includes(".") || req.params.id.includes("e") || idNum < 0) {
      return res.status(400).json({ error: "Invalid employee id" });
    }
    if (idNum === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    const { name, birthday, salary } = req.body;
    if (!name || !birthday || !salary) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const updated = await updateEmployee({ id: idNum, name, birthday, salary });
    if (!updated) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
});

export default router;
