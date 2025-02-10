import { supplierModel } from "../models/supplierModels.js";

// Obtener todos los proveedores de un restaurente especifico
const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await supplierModel.findAllSuppliers(req.params.restaurantId)
        res.json(suppliers);
    } catch (err) {
        res.status(500).send("Error al obtener los proveedores");
    }
};

// Obtener un proveedor por ID
const getSupplierById = async (req, res) => {
    const { restaurantId, id } = req.params
    try {
        const supplier = await supplierModel.findSupplierById(restaurantId, id);
        if (supplier) {
            res.json(supplier);
        } else {
            res.status(404).send("Proveedor no encontrado");
        }
    } catch (err) {
        res.status(500).send("Error al obtener el proveedor");
    }
};

// Crear un nuevo proveedor
const createSupplier = async (req, res) => {
    const { nameSupplier, numContact, email, direction, city, country } = req.body;
    const restaurantId = req.params.restaurantId;
      // Validar que todos los datos necesarios estén presentes
      if (!restaurantId || !nameSupplier || !numContact|| !email || !direction || !city|| !country) {
        return res.status(400).send({ error: 'Todos los campos son obligatorios' });
      }
    try {
        const newSupplier = await supplierModel.createSupplier(restaurantId, 
            nameSupplier, numContact, email, direction, city, country);
        res.status(201).json(newSupplier);
    } catch (err) {
        console.log('Error al crear', err)
        res.status(500).send("Error al crear el proveedor");
    }
};

// Actualizar un proveedor por ID
const updateSupplier = async (req, res) => {
    const { restaurantId, id } = req.params;
    const { nameSupplier, numContact, email, direction, city, country } = req.body
    console.log('Datos recibidos:', { nameSupplier, numContact, email, direction, city, country });
    try {
        const updatedSupplier = await supplierModel.updateSupplier(restaurantId, id, nameSupplier, numContact, email, direction, city, country);
        if (updatedSupplier) {
            res.json(updatedSupplier);
        } else {
            res.status(404).send("Proveedor no encontrado");
        }
    } catch (err) {
        console.error("Error al actualizar el proveedor:", error);
        res.status(500).send("Error al actualizar el proveedor");
    }
};

// Eliminar un proveedor por ID
const deleteSupplier = async (req, res) => {
    const { restaurantId, id } = req.params;
    try {
        const deleteSupplier = await supplierModel.deleteSupplier(restaurantId, id);
        if (deleteSupplier) {
            res.json({ message: "Proveedor eliminado", deleteSupplier});
        } else {
            res.status(404).send("Proveedor no encontrado");
        }
    } catch (error) {
        console.error("Error al eliminar el proveedor:", error);
        res.status(500).send("Error al eliminar el proveedor");
    }
};

export const supplierController = {
    getAllSuppliers,
    getSupplierById,
    createSupplier,
    updateSupplier,
    deleteSupplier
};