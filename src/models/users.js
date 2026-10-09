import db from './db.js';
import bcrypt from 'bcrypt';

const createUser = async (name, email, passwordHash) => {
    const query = `
        INSERT INTO public.users (name, email, password_hash, role_id)
        VALUES ($1, $2, $3, (SELECT role_id FROM public.roles WHERE role_name = 'user'))
        RETURNING user_id, name, email, role_id, created_at
    `;
    const queryParams = [name, email, passwordHash];
    const result = await db.query(query, queryParams);
    return result.rows[0];
};

const findUserByEmail = async (email) => {
    const query = `
        SELECT u.user_id, u.name, u.email, u.password_hash, r.role_name 
        FROM public.users u
        JOIN public.roles r ON u.role_id = r.role_id
        WHERE u.email = $1
    `;
    const queryParams = [email];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        return null;
    }
    return result.rows[0];
};

const authenticateUser = async (email, password) => {
    const user = await findUserByEmail(email);

    if (!user) {
        return null;
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
        return null;
    }

    delete user.password_hash;
    return user;
};

export { createUser, findUserByEmail, authenticateUser };