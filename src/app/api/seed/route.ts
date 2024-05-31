import { NextResponse, NextRequest } from 'next/server'
export const dynamic = 'force-dynamic';
import prisma from '@/lib/prisma';
import { initialData } from './seed';
import { countries } from './seed-countries';
import { Gender, Product, Size } from '@prisma/client';

export async function GET(request: Request) {
    // 1. Borrar registros previos
    // await Promise.all( [

    await prisma.orderAddress.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();


    await prisma.userAddress.deleteMany();
    await prisma.user.deleteMany();
    await prisma.country.deleteMany();

    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    // ]);

    const { categories, products, users } = initialData;


    await prisma.user.createMany({
        data: users
    });
    // Productos
       //  Categorias
    // {
    //   name: 'Shirt'
    // }
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
        const imagesResponse = await prisma.productImage.createMany({
            data: imagesData
        });
        console.log({ imagesResponse });
    });
    await prisma.country.createMany({
        data: countries
    });
    console.log('Seed ejecutado correctamente');
    return NextResponse.json({ message: 'Seed Executed' });
}