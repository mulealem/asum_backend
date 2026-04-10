const { execSync } = require('child_process');

// Generate Prisma Client after npm install so the serverless
// function on Vercel (and local dev) always has it available.
try {
  execSync('npx prisma generate', { stdio: 'inherit' });
} catch (err) {
  console.error('postinstall: prisma generate failed', err.message);
  process.exit(1);
}
