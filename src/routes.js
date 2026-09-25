import express from 'express';
import { showHomePage } from './controllers/index.js';
import {
  showOrganizationsPage,
  showOrganizationDetailsPage,
  showNewOrganizationForm,
  processNewOrganizationForm,
  showEditOrganizationForm,
  processEditOrganizationForm,
  organizationValidation
} from './controllers/organizations.js';
import {
  showProjectsPage,
  showProjectDetailsPage,
  showNewProjectForm,
  processNewProjectForm,
  projectValidation
} from './controllers/projects.js';
import {
  showCategoriesPage,
  showCategoryDetailsPage,
  showAssignCategoriesForm,
  processAssignCategoriesForm
} from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', showHomePage);

// Organizations routes
router.get('/organizations', showOrganizationsPage);
router.get('/new-organization', showNewOrganizationForm);
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/edit-organization/:id', showEditOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

// Projects routes
router.get('/projects', showProjectsPage);
router.get('/new-project', showNewProjectForm);
router.post('/new-project', projectValidation, processNewProjectForm);
router.get('/project/:id', showProjectDetailsPage);

// Assign categories routes (supporting both route formats from instructions)
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);
router.get('/project/:projectId/assign-categories', showAssignCategoriesForm);
router.post('/project/:projectId/assign-categories', processAssignCategoriesForm);

// Categories routes
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

// Error route
router.get('/test-error', testErrorPage);

export default router;