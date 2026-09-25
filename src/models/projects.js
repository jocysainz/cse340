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

const updateProject = async (id, title, description, location, date, organizationId) => {
  const query = `
    UPDATE public.project
    SET title = $1, description = $2, location = $3, date = $4, organization_id = $5
    WHERE project_id = $6
    RETURNING project_id;
  `;

  const queryParams = [title, description, location, date, organizationId, id];
  const result = await pool.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error('Failed to update project: Project not found');
  }

  return result.rows[0].project_id;
};

export {
  getAllProjects,
  getProjectDetails,
  getProjectsByOrganizationId,
  createProject,
  updateProject
};