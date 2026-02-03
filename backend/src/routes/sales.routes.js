import express from "express";
import prisma from "../lib/prisma.js";

const router = express.Router();

//      GET /api/sales
router.get("/", async (req, res) => {
  const sales = await prisma.sale.findMany({
    include: { product: true }
  });
  res.json(sales);
});

//      POST /api/sales       Create sale + reduce product stock

router.post("/", async (req, res) => {
  const { productId, quantity } = req.body;

  //    Get product
  const product = await prisma.product.findUnique({
    where: { id: productId }
  });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (product.quantity < quantity) {
    return res.status(400).json({ message: "Not enough stock" });
  }

  const total = product.price * quantity;

  //     Transaction: sale + stock update
  const sale = await prisma.$transaction(async (tx) => {
    const newSale = await tx.sale.create({
      data: {
        productId,
        quantity,
        total
      }
    });

    await tx.product.update({
      where: { id: productId },
      data: {
        quantity: product.quantity - quantity
      }
    });

    return newSale;
  });

  res.status(201).json(sale);
});

export default router;
