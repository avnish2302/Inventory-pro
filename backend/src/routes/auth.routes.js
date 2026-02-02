import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

const router = express.Router();

/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const nameClean = name.trim();
    const emailClean = email.trim().toLowerCase();
    const passwordClean = password.trim();

    const hashed = await bcrypt.hash(passwordClean, 10);

    await prisma.user.create({
      data: {
        name: nameClean,
        email: emailClean,
        password: hashed
      }
    });

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: "Registration failed" });
  }
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const emailClean = email.trim().toLowerCase();
    const passwordClean = password.trim();

    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: emailClean,
          mode: "insensitive"
        }
      }
    });

    console.log("LOGIN EMAIL:", emailClean);
    console.log("USER FOUND:", user);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(passwordClean, user.password);
    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Login failed" });
  }
});

/* ================= EXPORT ================= */
export default router;
