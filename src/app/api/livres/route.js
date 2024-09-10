import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const prisma = new PrismaClient();


export const QueryLiv=async()=>{
  try {
      const listl=await prisma.livres.findMany();
      return listl
  } catch (error) {
      console.log(error)
  }
  finally{
      prisma.$disconnect()
  }
}

export async function GET() {
 
  const livres = await QueryLiv()

return NextResponse.json(livres);
}

// CREATE DATA

export async function POST(request) {
  try {
    const livre = await request.json();

    const livres = await prisma.livres.create({
      data: livre,
    });

    return NextResponse.json(livres);
  } catch (error) {
       return new NextResponse(JSON.stringify(error), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
