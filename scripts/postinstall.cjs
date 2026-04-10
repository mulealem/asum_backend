/**
 * Smart postinstall script.
 * - On Vercel (build phase): generate Prisma client using the Vercel schema.
 * - Locally / CI (non-Vercel): generate using the checked-in schema.prisma.
 *
 * The VERCEL environment variable is automatically set by Vercel during builds.
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const isVercel = process.env.VERCEL === '1';

if (isVercel) {
  // Generate the vercel schema first (SQLite -> PostgreSQL swap)
  const prepareScript = path.join(__dirname, 'prepare-prisma-vercel.cjs');
  const vercelSchema = path.join(
    __dirname,
    '..',
    'prisma',
    'schema.vercel.prisma',
  );

  if (!fs.existsSync(vercelSchema)) {
    console.log('Preparing Vercel Prisma schema (PostgreSQL)...');
    execSync(`node "${prepareScript}"`, { stdio: 'inherit' });
  }

  console.log('Generating Prisma Client for Vercel (PostgreSQL)...');
  execSync(`npx prisma generate --schema "${vercelSchema}"`, {
    stdio: 'inherit',
  });
} else {
  console.log('Generating Prisma Client from prisma/schema.prisma...');
  execSync('npx prisma generate', { stdio: 'inherit' });
}
