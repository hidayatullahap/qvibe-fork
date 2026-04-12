import { db } from "@/db";
import { visitors } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { randomUUID } from "crypto";

export async function logVisitor() {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  const ipAddress = headersList.get("x-forwarded-for") || "unknown";
  const userAgent = headersList.get("user-agent") || "unknown";
  const userId = session?.user?.id || null;

  try {
    await db.insert(visitors).values({
      id: randomUUID(),
      userId,
      ipAddress,
      userAgent,
      accessedAt: new Date(),
    });
  } catch (error) {
    console.error("Failed to log visitor:", error);
  }
}
