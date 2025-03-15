// app/api/auth/route.js (Ruta de API en Next.js 14 con App Router)
import { NextResponse } from "next/server";
import { usuarioAutorizado } from "@/lib/auth";

export async function GET() {    
    const estado = await usuarioAutorizado();
    return NextResponse.json({ estado });
}

