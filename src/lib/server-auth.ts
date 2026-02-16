import { redirect } from "next/navigation";

import { findUserById, toPublicUser } from "@/lib/data-store";
import { PublicUser } from "@/lib/models";
import { getSessionFromCookies } from "@/lib/session";

export async function getCurrentUser(): Promise<PublicUser | null> {
  const session = await getSessionFromCookies();

  if (!session) {
    return null;
  }

  const user = await findUserById(session.sub);

  if (!user) {
    return null;
  }

  return toPublicUser(user);
}

export async function requireAuthUser(redirectTo = "/login"): Promise<PublicUser> {
  const user = await getCurrentUser();

  if (!user) {
    redirect(redirectTo);
  }

  return user;
}

export async function requireAdminUser(): Promise<PublicUser> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?next=/dashboard");
  }

  if (user.role !== "admin") {
    redirect("/");
  }

  return user;
}
