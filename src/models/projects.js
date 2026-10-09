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

// Volunteering Model Functions
const addVolunteerToProject = async (userId, projectId) => {
  const query = `
    INSERT INTO public.project_volunteer (user_id, project_id)
    VALUES ($1, $2)
    ON CONFLICT DO NOTHING;
  `;
  await pool.query(query, [userId, projectId]);
};

const removeVolunteerFromProject = async (userId, projectId) => {
  const query = `
    DELETE FROM public.project_volunteer
    WHERE user_id = $1 AND project_id = $2;
  `;
  await pool.query(query, [userId, projectId]);
};

const isUserVolunteering = async (userId, projectId) => {
  const query = `
    SELECT 1 FROM public.project_volunteer
    WHERE user_id = $1 AND project_id = $2;
  `;
  const result = await pool.query(query, [userId, projectId]);
  return result.rows.length > 0;
};

const getVolunteeredProjectsByUserId = async (userId) => {
  const query = `
    SELECT p.project_id, p.title, p.location, p.date
    FROM public.project p
    JOIN public.project_volunteer pv ON p.project_id = pv.project_id
    WHERE pv.user_id = $1
    ORDER BY p.date;
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

export {
  getAllProjects,
  getProjectDetails,
  getProjectsByOrganizationId,
  createProject,
  updateProject,
  addVolunteerToProject,
  removeVolunteerFromProject,
  isUserVolunteering,
  getVolunteeredProjectsByUserId
};