import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcryptjs';
import main from '@/seed/seed-database';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    main();
    return NextResponse.json({ message: 'Seed Executed' });
}