CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DROP TYPE IF EXISTS user_role CASCADE;
CREATE TYPE user_role AS ENUM ('ADMIN', 'ANALYST');

DROP TABLE IF EXISTS utilisateur;
CREATE TABLE utilisateur (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role user_role,
  username VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS parking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom VARCHAR(255) UNIQUE,
  ylat FLOAT,
  xlong FLOAT,
  coord_x FLOAT,
  coord_y FLOAT,
  nb_places INT,
  nb_pr INT,
  nb_pmr INT,
  nb_voitures_electriques INT,
  nb_velo INT,
  nb_2r_el INT,
  nb_autopartage INT,
  nb_2_rm INT
);

CREATE TABLE IF NOT EXISTS donnees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parking_id UUID,
  date_comptage TIMESTAMP,
  nb_places_disponible INT,
  nb_pr_dispo INT,
  nb_pmr_dispo INT,
  nb_voitures_electriques_dispo INT,
  nb_velo_dispo INT,
  nb_2r_el_dispo INT,
  nb_autopartage_dispo INT,
  nb_2_rm_dispo INT,
  CONSTRAINT fk_donnees_parking FOREIGN KEY (parking_id) REFERENCES parking(id) ON DELETE CASCADE
);