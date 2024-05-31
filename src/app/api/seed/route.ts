import { NextResponse, NextRequest } from 'next/server'
export const dynamic = 'force-dynamic';
import prisma from '@/lib/prisma';
import { initialData } from './seed';
import { countries } from './seed-countries';
import { Gender, Product, Size } from '@prisma/client';

export async function GET(request: Request) {
    await prisma.orderAddress.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.userAddress.deleteMany();
    await prisma.user.deleteMany();
    await prisma.country.deleteMany();
    const { users } = initialData;
    await prisma.user.createMany({
        data: users
    });
    await prisma.country.createMany({
        data: countries
    });
    console.log('Seed ejecutado correctamente');
    return NextResponse.json({ message: 'Seed Executed' });
}