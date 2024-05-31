import { NextResponse, NextRequest } from 'next/server'
export const dynamic = 'force-dynamic';
import prisma from '@/lib/prisma';
import { Gender, Product, Size } from '@prisma/client';
import { initialData } from './seed';

export async function GET(request: Request) {

    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    const { categories, products } = initialData;
    const categoriesData = categories.map((name) => ({ name }));
    console.log({ categoriesData });
    await prisma.category.createMany({
        data: categoriesData
    });
    const categoriesDB = await prisma.category.findMany();
    console.log({ categoriesDB });
    console.log("test");
    const categoriesMap = categoriesDB.reduce((map, category) => {
        map[category.name.toLowerCase()] = category.id;
        return map;
    }, {} as Record<string, string>); //<string=shirt, string=categoryID>

    console.log({ categoriesMap });
    console.log("productos", products);
    products.forEach(async (product) => {
        const { type, images, ...rest } = product;
        console.log("images", images);
        const newProduct = {
            ...rest,
            categoryId: categoriesMap[type]
        };
        console.log('newProduct: ', newProduct);
        const dbProduct = await prisma.product.create({
            data: newProduct
        })
        console.log('dbProduct', dbProduct);
        // Images
        const imagesData = images.map(image => ({
            url: image,
            productId: dbProduct.id
        }));
        console.log('imagesData', imagesData);
        const imagesResponse = await prisma.productImage.createMany({
            data: imagesData
        });
        console.log({ imagesResponse });
    });
    console.log('Seed ejecutado correctamente');
    return NextResponse.json({ message: 'Seed Executed' });
}