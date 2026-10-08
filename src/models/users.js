import db from './db.js';

/**
 * Inserts a new user into the database assigned to the 'user' role
 */
export const createUser = async (name, email, passwordHash) => {
    const query = `
        INSERT INTO public.users (name, email, password_hash, role_id)
        VALUES (
            $1, 
            $2, 
            $3, 
            (SELECT role_id FROM public.roles WHERE role_name = 'user' LIMIT 1)
        )
        RETURNING user_id;
    `;
    const values = [name, email, passwordHash];
    const result = await db.query(query, values);
    return result.rows[0].user_id;
};