// routes/supplierRoutes.js
import express from "express";
import { supplierController } from "../controllers/supplierController.js";

const router = express.Router();

// Rutas para proveedores
router.get("/restaurante/:restaurantId/suppliers", supplierController.getAllSuppliers);
router.get("/restaurante/:restaurantId/suppliers/:id", supplierController.getSupplierById);
router.post("/restaurante/:restaurantId/suppliers", supplierController.createSupplier);
router.put("/restaurante/:restaurantId/suppliers/:id", supplierController.updateSupplier);
router.delete("/restaurante/:restaurantId/suppliers/:id", supplierController.deleteSupplier);

export default router