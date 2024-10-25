"use server";

import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function createCandacy(candacy) {
  const newCandacy = await prisma.candacy.create({
    data: {
      commentaire: candacy.get("commentaire"),
    },
  });
  redirect("/jobOffert");
}
