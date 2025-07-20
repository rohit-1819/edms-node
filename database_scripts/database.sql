-- =======================
-- USERS TABLE (DM + HOD)
-- =======================
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('DM', 'HOD')),
    department TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===================
-- EMPLOYEES TABLE
-- ===================
CREATE TABLE employees (
    emp_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    department TEXT NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    created_by INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger to enforce only HODs can create employees
CREATE OR REPLACE FUNCTION check_hod_role()
RETURNS TRIGGER AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM users WHERE user_id = NEW.created_by AND role = 'HOD'
  ) THEN
    RAISE EXCEPTION 'Only HODs can create employees.';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_hod
BEFORE INSERT ON employees
FOR EACH ROW EXECUTE FUNCTION check_hod_role();

-- =================
-- POSTS TABLE
-- =================
CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================
-- POST RECIPIENTS (for private posts)
-- ============================
CREATE TABLE post_recipients (
    post_id INTEGER REFERENCES posts(post_id) ON DELETE CASCADE,
    recipient_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, recipient_id)
);

-- ============================
-- POLLING STATIONS (For Duty)
-- ============================
CREATE TABLE polling_stations (
    station_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    district TEXT NOT NULL,
    area TEXT NOT NULL
);

-- ============================
-- DESIGNATIONS (Needed per station)
-- ============================
CREATE TABLE designations (
    desig_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    department TEXT NOT NULL
);

-- ============================
-- ASSIGNMENTS (Duty Assignments)
-- ============================
CREATE TABLE assignments (
    assignment_id SERIAL PRIMARY KEY,
    station_id INTEGER REFERENCES polling_stations(station_id) ON DELETE CASCADE,
    emp_id INTEGER REFERENCES employees(emp_id) ON DELETE CASCADE,
    designation TEXT NOT NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
