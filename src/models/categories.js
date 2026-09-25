import db from './db.js';

const getAllCategories = async () => {
  const query = `
    SELECT category_id, name 
    FROM public.category 
    ORDER BY name ASC;
  `;
  const result = await db.query(query);
  return result.rows;
};

const getCategoryDetails = async (categoryId) => {
  const query = `
    SELECT category_id, name
    FROM public.category
    WHERE category_id = $1;
  `;
  const queryParams = [categoryId];
  const result = await db.query(query, queryParams);
  return result.rows.length > 0 ? result.rows[0] : null;
};

const getProjectsByCategoryId = async (categoryId) => {
  const query = `
    SELECT p.project_id, p.title, p.description, p.date, p.location
    FROM public.project p
    JOIN public.project_category pc ON p.project_id = pc.project_id
    WHERE pc.category_id = $1
    ORDER BY p.date ASC;
  `;
  const queryParams = [categoryId];
  const result = await db.query(query, queryParams);
  return result.rows;
};

const getCategoriesByServiceProjectId = async (projectId) => {
  const query = `
    SELECT c.category_id, c.name
    FROM public.category c
    JOIN public.project_category pc ON c.category_id = pc.category_id
    WHERE pc.project_id = $1
    ORDER BY c.name ASC;
  `;
  const result = await db.query(query, [projectId]);
  return result.rows;
};

const assignCategoryToProject = async (projectId, categoryId) => {
  const query = `
    INSERT INTO public.project_category (project_id, category_id)
    VALUES ($1, $2);
  `;
  await db.query(query, [projectId, categoryId]);
};

const updateCategoryAssignments = async (projectId, categoryIds) => {
  const deleteQuery = `
    DELETE FROM public.project_category
    WHERE project_id = $1;
  `;
  await db.query(deleteQuery, [projectId]);

  for (const categoryId of categoryIds) {
    if (categoryId) {
      await assignCategoryToProject(projectId, categoryId);
    }
  }
};

export {
  getAllCategories,
  getCategoryDetails,
  getProjectsByCategoryId,
  getCategoriesByServiceProjectId,
  updateCategoryAssignments
};