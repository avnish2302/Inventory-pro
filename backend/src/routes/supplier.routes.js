import express from "express";
import prisma from "../lib/prisma.js";

const router = express.Router();

//GET/api/suppliers
router.get("/", async (req, res) => {
  const suppliers = await prisma.supplier.findMany({
    include: { products: true },
  });
  res.json(suppliers);
});

//POST /api/suppliers
router.post("/", async (req, res) => {
  const { name, email } = req.body;

  const supplier = await prisma.supplier.create({
    data: { name, email },
  });

  res.status(201).json(supplier);
});

//PUT /api/suppliers/:id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const supplier = await prisma.supplier.update({
    where: { id },
    data: { name, email },
  });

  res.json(supplier);
});

//DELETE /api/suppliers/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  // Check if supplier has products
  const supplierWithProducts = await prisma.supplier.findUnique({
    where: { id },
    include: { products: true },
  });

  if (!supplierWithProducts) {
    return res.status(404).json({
      message: "Supplier not found",
    });
  }

  if (supplierWithProducts.products.length > 0) {
    return res.status(400).json({
      message: "Cannot delete supplier with existing products",
    });
  }

  await prisma.supplier.delete({
    where: { id },
  });

  res.json({ message: "Supplier deleted" });
});

export default router;
