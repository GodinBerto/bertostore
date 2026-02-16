import { NextRequest, NextResponse } from "next/server";

import { fail } from "@/lib/api";
import { getDashboardStats } from "@/lib/data-store";
import { getSessionFromRequest } from "@/lib/session";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const session = getSessionFromRequest(request);

  if (!session || session.role !== "admin") {
    return fail("Unauthorized.", 401);
  }

  const stats = await getDashboardStats();

  return NextResponse.json({ stats }, { status: 200 });
}
