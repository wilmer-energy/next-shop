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

    await prisma.country.createMany({
        data: countries
    });



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

    // Productos
    console.log("productos", products);
    products.forEach(async (product) => {
        const { type, images, ...rest } = product;
        console.log("images", images);
        const newProduct = {
            ...rest,
            categoryId: categoriesMap[type],
            id: ''
        };
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
    /*
    const productsForSave = products.map((product) => {
        const { type, images, ...rest } = product;
        const newProduct = {
            ...rest,
            categoryId: categoriesMap[type],
        };
        return newProduct;
    });
    console.log({ productsForSave });
    if (productsForSave.length > 0) {
        const response = await prisma.product.createMany({
            data: productsForSave
        });
        console.log(response);
    }*/
    console.log('Seed ejecutado correctamente');
    return NextResponse.json({ message: 'Seed Executed' });
}