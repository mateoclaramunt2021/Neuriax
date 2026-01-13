#!/usr/bin/env node

/**
 * Validate vercel.json configuration
 * Prevents deployment errors caused by unsupported properties
 */

const fs = require('fs');
const path = require('path');

const vercelConfigPath = path.join(__dirname, '..', 'vercel.json');

const FORBIDDEN_KEYS = [
  'nodeVersion', // Use package.json "engines" instead
  'pythonVersion',
  'rubyVersion',
  'goVersion',
];

const REQUIRED_WARNING_KEYS = ['buildCommand', 'framework'];

try {
  // Read vercel.json
  if (!fs.existsSync(vercelConfigPath)) {
    console.log('✓ No vercel.json found (optional)');
    process.exit(0);
  }

  const configContent = fs.readFileSync(vercelConfigPath, 'utf8');
  const config = JSON.parse(configContent);

  // Check for forbidden keys
  const foundForbidden = FORBIDDEN_KEYS.filter(key => key in config);
  if (foundForbidden.length > 0) {
    console.error('\n❌ ERROR: vercel.json contains unsupported properties:');
    foundForbidden.forEach(key => {
      console.error(`   - "${key}" (not supported by Vercel)`);
    });
    console.error('\n📝 SOLUTION:');
    console.error('   1. Remove these keys from vercel.json');
    console.error('   2. For Node version, use package.json "engines" field:');
    console.error('      "engines": { "node": "18.x" }');
    console.error('\n');
    process.exit(1);
  }

  console.log('✓ vercel.json validation passed');
  console.log(`  - No forbidden properties found`);
  if (config.framework) console.log(`  - Framework: ${config.framework}`);
  if (config.buildCommand) console.log(`  - Build command: ${config.buildCommand}`);

} catch (error) {
  if (error instanceof SyntaxError) {
    console.error('\n❌ ERROR: vercel.json is not valid JSON');
    console.error(`   ${error.message}\n`);
  } else {
    console.error('\n❌ ERROR reading vercel.json');
    console.error(`   ${error.message}\n`);
  }
  process.exit(1);
}
