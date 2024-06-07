import { db } from "@/app/utils/database";
import { existsSync } from "fs";
import { mkdir, writeFile } from 'fs/promises'
import { NextResponse } from "next/server";

export const GET = async() => {

    try {
        
        const result = await db.query("SELECT * FROM book;");
        return NextResponse.json(result);

    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Something went wrong!"}) 
    }

}

export const POST = async(request) => {

    try {

        const formdata = await request.formData();
        const user = formdata.get('user');
        const categoryId = formdata.get('category_id');
        const title = formdata.get('title');
        const author = formdata.get('author');
        const description = formdata.get('description');
        const price = formdata.get('price');

        if(!user) throw "No user found!";

        let cover = formdata.get('cover');
        let file = formdata.get('file');
        
        if (!file || !cover) throw "Files not found!";

        const bytesFile = await file.arrayBuffer()
        const bufferFile = Buffer.from(bytesFile)
        const filePath = `./books/${user}`
        
        !existsSync(filePath) && await mkdir(filePath, {recursive:true});
        await writeFile(filePath+`/${file.name}`, bufferFile);

        const bytesCover = await cover.arrayBuffer()
        const bufferCover = Buffer.from(bytesCover)
        const coverPath = `./public/books/${user}/cover`

        !existsSync(coverPath) && await mkdir(coverPath, {recursive:true});
        await writeFile(coverPath+`/${cover.name}`, bufferCover);

        const coverUrl = `/books/${user}/cover/${cover.name}`
        const fileUrl = `/books/${user}/${file.name}`

        let values = [
            user,
            categoryId,
            title,
            author,
            description,
            price,
            coverUrl,
            fileUrl
        ]

        await db.query(
            `INSERT INTO book(user,category_id,title,author,description,price,cover_url,file_url)
            VALUES(?,?,?,?,?,?,?,?);`, 
        values);

        return NextResponse.json({message: "Book saved successfully!"}, {status: 200});

    } catch (error) {
        return NextResponse.json({message: `Error: ${error}`}, {status: 500});
    }

}