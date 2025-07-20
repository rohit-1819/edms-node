#!/bin/bash

DB_USER="edms_user"
DB_NAME="edmsdb"

echo "Dropping database and user..."

# Drop database
sudo -u postgres psql -c "DROP DATABASE IF EXISTS $DB_NAME;"

# Drop user
sudo -u postgres psql -c "DROP USER IF EXISTS $DB_USER;"

echo "Database and user removed!"
