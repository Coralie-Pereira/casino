"use server";

import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();
const cookiesStore = cookies();

export async function getProducts(type: number) {
  return await prisma.product.findMany({ where: { typeProductId: type } });
}
