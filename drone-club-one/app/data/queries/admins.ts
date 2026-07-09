"use server";

import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


export async function getAdminPasswordHashByEmail(email: string) {
    try {
        const data = await sql<{ password: string }[]>`
            SELECT password
            FROM admins
            WHERE email = ${email}
            LIMIT 1;`;

        return data[0].password;
    } catch (error) {
        console.error("Error fetching admin password hash by email", error);
        throw error;
    }
}

export async function updateAdminPasswordByEmail(email: string, newPasswordHash: string) {
    await sql`
        UPDATE admins
        SET password = ${newPasswordHash}
        WHERE email = ${email};`;
}