






































































































































































































































































#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

const MAINTENANCE_FILE = path.join(process.cwd(), 'maintenance.flag');

async function enableMaintenance() {
  try {
    await fs.writeFile(MAINTENANCE_FILE, new Date().toISOString());
    console.log('✅ Maintenance mode ENABLED');
    console.log('🌐 Website is now showing maintenance page');
  } catch (error) {
    console.error('❌ Failed to enable maintenance mode:', error.message);
  }
}

async function disableMaintenance() {
  try {
    await fs.unlink(MAINTENANCE_FILE);
    console.log('✅ Maintenance mode DISABLED');
    console.log('🌐 Website is now back online');
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('ℹ️ Maintenance mode was already disabled');
    } else {
      console.error('❌ Failed to disable maintenance mode:', error.message);
    }
  }
}

async function checkStatus() {
  try {
    const content = await fs.readFile(MAINTENANCE_FILE, 'utf-8');
    console.log('🔴 Maintenance mode is ACTIVE');
    console.log(`📅 Enabled at: ${content.trim()}`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('🟢 Website is ONLINE (maintenance mode disabled)');
    } else {
      console.error('❌ Error checking status:', error.message);
    }
  }
}

const command = process.argv[2];

switch (command) {
  case 'enable':
    enableMaintenance();
    break;
  case 'disable':
    disableMaintenance();
    break;
  case 'status':
    checkStatus();
    break;
  default:
    console.log('🛠️  Maintenance Mode Control Script');
    console.log('');
    console.log('Usage:');
    console.log('  node scripts/maintenance.js enable   - Enable maintenance mode');
    console.log('  node scripts/maintenance.js disable  - Disable maintenance mode');
    console.log('  node scripts/maintenance.js status   - Check current status');
    console.log('');
    console.log('Remote Control:');
    console.log('  Visit: https://yourdomain.com/system-control.html');
    break;
}
