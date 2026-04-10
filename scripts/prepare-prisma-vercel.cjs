const fs = require('fs');
const path = require('path');

// Creates a Vercel-compatible copy of the Prisma schema that sets
// an explicit output path so the generated client is bundled into
// the serverless function.
const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');
const vercelSchemaPath = path.join(__dirname, '..', 'prisma', 'schema.vercel.prisma');

let schema = fs.readFileSync(schemaPath, 'utf-8');

// Add an explicit output to the generator block so the client
// lands inside node_modules where @vercel/node can bundle it.
schema = schema.replace(
  /generator client \{([^}]*)\}/,
  (match, body) => {
    if (body.includes('output')) return match; // already has output
    return `generator client {${body}  output = "../node_modules/.prisma/client"\n}`;
  },
);

fs.writeFileSync(vercelSchemaPath, schema, 'utf-8');
console.log('Created prisma/schema.vercel.prisma');
