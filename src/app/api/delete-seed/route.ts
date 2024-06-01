import { NextResponse, NextRequest } from 'next/server'
export const dynamic = 'force-dynamic';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    await prisma.orderAddress.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();


    await prisma.userAddress.deleteMany();
    await prisma.user.deleteMany();
    await prisma.country.deleteMany();

    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    return NextResponse.json({ message: 'Seed Deleted' });
}