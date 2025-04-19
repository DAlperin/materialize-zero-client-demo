import { execSync } from 'child_process';
import { mkdtempSync, readFileSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import pg from 'pg'
const { Client } = pg
import dotenv from 'dotenv';
dotenv.config();

async function updatePermissions() {
    let tempDir: string | undefined;
    try {
        // Step 1: Create a temp directory
        tempDir = mkdtempSync(join(tmpdir(), 'permissions-'));
        const outputFile = join(tempDir, 'perm.json');

        // Step 2: Run the `npx zero-deploy-permissions` command
        execSync(`npx zero-deploy-permissions --output-format=json --output-file=${outputFile}`, {
            stdio: 'inherit',
        });

        // Step 3: Read the file and execute it against the PostgreSQL connection
        const perm = readFileSync(outputFile, 'utf-8');
        const sqlQuery = `UPDATE "zero.permissions" set permissions = '${perm}'`;
        const connectionString = process.env.MATERIALIZE_CONNECTION_STRING;

        if (!connectionString) {
            throw new Error('MATERIALIZE_CONNECTION_STRING environment variable is not set.');
        }

        const client = new Client({ connectionString });
        await client.connect();
        await client.query(sqlQuery);
        await client.end();

        console.log('Permissions updated successfully.');
    } catch (error) {
        console.error('Error updating permissions:', error);
    } finally {
        // Cleanup: Remove the temp directory
        if (tempDir) {
            rmSync(tempDir, { recursive: true, force: true });
        }
    }
}

updatePermissions();