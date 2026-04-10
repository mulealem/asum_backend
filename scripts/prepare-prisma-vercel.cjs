const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, '..', 'prisma', 'schema.prisma');
const targetPath = path.join(__dirname, '..', 'prisma', 'schema.vercel.prisma');

const source = fs.readFileSync(sourcePath, 'utf8');

// Replace the active datasource block (not commented-out ones) with a PostgreSQL datasource.
// The regex targets the un-commented "datasource db { ... }" block.
const target = source.replace(
  /^datasource db \{[\s\S]*?\n\}/m,
  'datasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}',
);

if (source === target) {
  console.error('ERROR: Could not find an active "datasource db { ... }" block to replace.');
  process.exit(1);
}

fs.writeFileSync(targetPath, target);
console.log(`Prepared ${path.basename(targetPath)} for Vercel (PostgreSQL).`);
