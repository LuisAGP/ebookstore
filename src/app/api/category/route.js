const { NextResponse } = require("next/server");
import { db } from "@/app/utils/database";

export const GET = async() => {

    try {
        
        const result = await db.query("SELECT * FROM categories;");
        return NextResponse.json(result, {status: 200});

    } catch (error) {
        console.log(error);
        return NextResponse.json({message: `Error: ${error}`}, {status: 500});
    }

} 