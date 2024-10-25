"use server";

import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();
const cookiesStore = cookies();

export async function createUser(user: any) {
  const userData = {
    nom: user.get("nom"),
    prenom: user.get("prenom"),
    email: user.get("email"),
    password: user.get("mdp"),
    civility: user.get("civilite"),
    dateDeNaissance: new Date(user.get("dateNaissance")).toISOString(),
    localisation: user.get("pays"),
    ville: user.get("ville"),
    adresse: user.get("adresse"),
    complementAdresse: user.get("complementAdresse"),
    codePostal: parseInt(user.get("codePostal")),
    numeroTelephone: user.get("numTel"),
    isSubscribe: user.get("offre") === "oui" ? true : false,
  };

  await prisma.user.create({
    data: userData,
  });
  redirect("/account");
}

export const connexionUser = async (email: string, mdp: string) => {
  try {
    const res = await prisma.user.findFirst({
      where: {
        email,
        password: mdp,
      },
    });
    console.log(res);
    if (res != null) {
      // cookiesStore.set("user", res.id.toString());
      return res;
      // cookiesStore.get("user").value;
      // cette valeur me retourne lid pour le panier par exemple
    }
  } catch (error) {
    console.error(
      //     name: "Nom de larticle",
      "Erreur lors de la connexion de l'utilisateur:",
      error.message
    );
  }
  // redirect("/");
};

export const getUserById = async () => {
  if (!cookiesStore.get("user")) return;
  const user = await prisma.user.findFirst({
    where: {
      id: parseInt(cookiesStore.get("user").value),
    },
  });
  return user;
};

export const deconnexion = async () => {
  cookies().delete("user");
  revalidatePath("/");
  redirect("/");
};
