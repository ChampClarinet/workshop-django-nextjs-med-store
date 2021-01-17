import { NextApiRequest, NextApiResponse } from "next";
import AuthHandler from "../../core.server/AuthHandler";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.statusCode = 405;
        return res.end();
    }
    
    const error = [];
    const username: string = req.body['username'];
    if (!username) error.push({ username: 'this field is required' });
    const password: string = req.body['password'];
    if (!password) error.push({ password: 'this field is required' });
    if (error.length) return res.status(400).json({ error });

    const hostname = process.env.NEXT_PUBLIC_BACKEND_HOST;
    const result = await AuthHandler.login(hostname, username, password)
    if (!result.error) return res.json(result);
    else res.status(result.status).json(result);
}