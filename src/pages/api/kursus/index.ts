import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
// import { Content } from 'next/font/google';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    const client = await clientPromise;
    const db = client.db("elearning");
    switch (req.method) {

    case "GET":
        const filter = req.query.filter || '';
        const option = {
            projection : {
                content : 0
            }
        }

        const kursus = await db.collection("kursus").find({
            title : {$regex : filter, $options:'i'},
        },option).toArray();
        res.json({ status: 200, data: kursus });
        break;
    }
}