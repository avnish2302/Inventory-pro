import express from "express";
import prisma from "../lib/prisma.js";

const router = express.Router();

/**
 * GET /api/products
 * Get all products
 */
router.get("/", async (req, res) => {
  const products = await prisma.product.findMany({
    include: { supplier: true }
  });
  res.json(products);
});

/**
 * POST /api/products
 * Create product
 */
router.post("/", async (req, res) => {
  const { name, price, quantity, category, supplierId } = req.body;

  const product = await prisma.product.create({
    data: {
      name,
      price: Number(price),
      quantity: Number(quantity),
      category,
      supplierId
    }
  });

  res.status(201).json(product);
});

/**
 * PUT /api/products/:id
 * Update product
 */
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const product = await prisma.product.update({
    where: { id },
    data: req.body
  });

  res.json(product);
});

/**
 * DELETE /api/products/:id
 * Delete product
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  await prisma.product.delete({ where: { id } });
  res.json({ message: "Product deleted" });
});

export default router;
