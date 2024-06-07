import { db } from "@/app/utils/database";
import { NextResponse } from "next/server";

export const GET = async(request, {params}) => {

    try {
        
        const result = await db.query(`SELECT * FROM book WHERE id=${params.id} limit 1;`);
        return NextResponse.json(result[0]);

    } catch (error) {
        return NextResponse.json({message: "Something went wrong!"}) 
    }

}