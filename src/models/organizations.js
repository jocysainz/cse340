import pool from './db.js';

const getAllOrganizations = async () => {
  const query = 'SELECT organization_id, name, description, contact_email, logo_filename FROM public.organization;';
  const result = await pool.query(query);
  return result.rows;
};

const getOrganizationDetails = async (id) => {
  const query = 'SELECT organization_id, name, description, contact_email, logo_filename FROM organization WHERE organization_id = $1;';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

const createOrganization = async (name, description, contactEmail, logoFilename) => {
  const query = `
    INSERT INTO organization (name, description, contact_email, logo_filename)
    VALUES ($1, $2, $3, $4)
    RETURNING organization_id;
  `;
  const result = await pool.query(query, [name, description, contactEmail, logoFilename]);
  return result.rows[0].organization_id;
};

const updateOrganization = async (id, name, description, contactEmail, logoFilename) => {
  const query = `
    UPDATE organization
    SET name = $1, description = $2, contact_email = $3, logo_filename = $4
    WHERE organization_id = $5;
  `;
  await pool.query(query, [name, description, contactEmail, logoFilename, id]);
};

export {
  getAllOrganizations,
  getOrganizationDetails,
  createOrganization,
  updateOrganization
};