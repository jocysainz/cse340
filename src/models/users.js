import db from './db.js';
import bcrypt from 'bcrypt';

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

const findUserByEmail = async (email) => {
    const query = `
        SELECT user_id, name, email, password_hash, role_id 
        FROM public.users 
        WHERE email = $1
    `;
    const queryParams = [email];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        return null;
    }
    return result.rows[0];
};

const verifyPassword = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
};

export const authenticateUser = async (email, password) => {
    const user = await findUserByEmail(email);
    if (!user) {
        return null;
    }

    const isMatch = await verifyPassword(password, user.password_hash);
    if (!isMatch) {
        return null;
    }

    // Strip password_hash before returning user object
    delete user.password_hash;
    return user;
};