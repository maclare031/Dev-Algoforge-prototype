import { promises as fs } from 'fs';
import path from 'path';

const MAINTENANCE_FILE = path.join(process.cwd(), 'maintenance.flag');

export async function isMaintenanceMode(): Promise<boolean> {
  try {
    await fs.access(MAINTENANCE_FILE);
    return true;
  } catch {
    return false;
  }
}

export async function getMaintenanceInfo() {
  try {
    const content = await fs.readFile(MAINTENANCE_FILE, 'utf-8');
    return {
      enabled: true,
      enabledAt: content.trim()
    };
  } catch {
    return {
      enabled: false,
      enabledAt: null
    };
  }
}
