"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const prisma = new PrismaClient();
const cookiesStore = cookies();

// export const addArticleToCart = async (id: number) => {
//   const cart = await prisma.cart.create({
//     data: { userId: parseInt(cookiesStore.get("user").value) },
//   });
//   const cartItems = await prisma.cartItem.create({
//     data: {
//       cartId: cart.id,
//       quantity: 1,
//       productId: id,
//     },
//   });
// };
export const addArticleToCart = async (id: number) => {
  if (!cookiesStore.get("user")) return;
  try {
    let cart;
    const userId = parseInt(cookiesStore.get("user").value);

    // Vérifier si l&apos;utilisateur a déjà un panier
    const existingCart = await prisma.cart.findFirst({
      where: {
        userId: userId,
      },
    });

    if (existingCart) {
      cart = existingCart;
    } else {
      // Si l&apos;utilisateur n&apos;a pas de panier, en créer un nouveau
      cart = await prisma.cart.create({
        data: {
          userId: userId,
        },
      });
    }

    // Ajouter l&apos;article au panier
    const cartItem = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        quantity: 1,
        productId: id,
      },
    });
    return cartItem;
  } catch (error) {
    return null;
  }
};

export async function getUserProduct() {
  if (!cookiesStore.get("user")) return [];
  return await prisma.cart.findMany({
    where: { userId: parseInt(cookiesStore.get("user").value) },
    include: { cartItems: { include: { product: true } } },
  });
}

export async function deleteCartItems(idCart) {
  await prisma.cartItem.delete({
    where: { id: idCart },
  });
  revalidatePath("/cart");
}

export async function deleteAllCartItems() {
  await prisma.cartItem.deleteMany({
    where: { cart: { userId: parseInt(cookiesStore.get("user").value) } },
  });
}
