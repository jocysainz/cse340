CREATE TABLE IF NOT EXISTS organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES (
        'BrightFuture Builders',
        'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
        'info@brightfuturebuilders.org',
        'brightfuture-logo.png'
    ),
    (
        'GreenHarvest Growers',
        'An urban farming collective promoting food sustainability and education in local neighborhoods.',
        'contact@greenharvest.org',
        'greenharvest-logo.png'
    ),
    (
        'UnityServe Volunteers',
        'A volunteer coordination group supporting local charities and service initiatives.',
        'hello@unityserve.org',
        'unityserve-logo.png'
    );

CREATE TABLE IF NOT EXISTS public.project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL REFERENCES public.organization(organization_id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    location VARCHAR(200),
    date DATE NOT NULL
);

INSERT INTO public.project (organization_id, title, description, location, date) VALUES
(1, 'Community Center Renovation', 'Painting and drywall repairs for the downtown community hall.', '101 Main St', '2026-10-05'),
(1, 'Wheelchair Ramp Build', 'Constructing access ramps for local elderly residents.', '442 Elm St', '2026-10-12'),
(1, 'Park Bench Construction', 'Assembling and installing durable park benches.', 'Oakwood City Park', '2026-10-19'),
(1, 'Shelter Roof Repair', 'Patching shingles and fixing gutters on the emergency shelter.', '89 Pine Rd', '2026-10-26'),
(1, 'Library Shelf Building', 'Building and installing custom bookshelves for the library annex.', '200 Reading Way', '2026-11-02'),
(2, 'Spring Planting Day', 'Planting seasonal vegetables and herbs in the community garden.', '74 River Road Garden', '2026-10-08'),
(2, 'Orchard Tree Pruning', 'Pruning apple and pear trees before the winter freeze.', 'East Meadow Orchard', '2026-10-15'),
(2, 'Compost Bin Workshop', 'Constructing three-bin aerated composting systems.', 'Community Learning Farm', '2026-10-22'),
(2, 'Irrigation Drip Setup', 'Laying drip irrigation lines to conserve water.', 'Valley Garden Plots', '2026-10-29'),
(2, 'Harvest Distribution', 'Gathering produce and packing boxes for local food pantries.', 'Harvest Pavilion', '2026-11-05'),
(3, 'Downtown Clean-up', 'Litter sweep along 5th Avenue and side streets.', 'City Plaza', '2026-10-07'),
(3, 'Food Pantry Sorting', 'Organizing non-perishable goods and dry pantry shelves.', 'Downtown Food Hub', '2026-10-14'),
(3, 'Senior Center Games Day', 'Hosting an afternoon of bingo and crafts with seniors.', 'Silver Pines Center', '2026-10-21'),
(3, 'Warm Winter Coat Drive', 'Collecting, sorting, and hanging donated winter coats.', 'Civic Auditorium', '2026-10-28'),
(3, 'Holiday Meal Delivery', 'Boxing and delivering Thanksgiving dinners to families.', 'Central Prep Kitchen', '2026-11-04');