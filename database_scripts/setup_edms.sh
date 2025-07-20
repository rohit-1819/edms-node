#!/bin/bash

DB_USER="edms_user"
DB_PASS=""
DB_NAME="edmsdb"
SCHEMA_FILE="database.sql"

echo "Creating PostgreSQL user and database..."

# Create user
sudo -u postgres psql -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASS';"

# Create database
sudo -u postgres psql -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;"

# Grant privileges
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;"

# Import schema
echo "Importing schema from $SCHEMA_FILE..."
sudo -u postgres psql -d $DB_NAME -f $SCHEMA_FILE

echo "Database setup complete!"

echo "Verifying database and tables:"
sudo -u postgres psql -d edmsdb -c "\dt"

