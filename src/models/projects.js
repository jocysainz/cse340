import pool from './db.js';

const getAllProjects = async () => {
  const query = 'SELECT project_id, organization_id, title, description, location, date FROM public.project;';
  const result = await pool.query(query);
  return result.rows;
};

const getProjectDetails = async (id) => {
  const query = 'SELECT project_id, organization_id, title, description, location, date FROM public.project WHERE project_id = $1;';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

const getProjectsByOrganizationId = async (organizationId) => {
  const query = 'SELECT project_id, organization_id, title, description, location, date FROM project WHERE organization_id = $1 ORDER BY date;';
  const result = await pool.query(query, [organizationId]);
  return result.rows;
};

const createProject = async (title, description, location, date, organizationId) => {
  const query = `
    INSERT INTO project (title, description, location, date, organization_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING project_id;
  `;

  const queryParams = [title, description, location, date, organizationId];
  const result = await pool.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error('Failed to create project');
  }

  return result.rows[0].project_id;
};

export {
  getAllProjects,
  getProjectDetails,
  getProjectsByOrganizationId,
  createProject
};