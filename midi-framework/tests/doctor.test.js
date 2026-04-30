import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs-extra';
import path from 'path';
import { createStructure } from '../src/installer/createStructure.js';
import { writeConfig } from '../src/installer/writeConfig.js';
import { copyTemplates } from '../src/installer/copyTemplates.js';
import { validateInstall } from '../src/installer/validateInstall.js';

// Helper to create unique temp directories
const createTestDir = () => {
  return path.join(process.cwd(), 'test-temp-doctor-' + Date.now() + '-' + Math.random().toString(36).slice(2));
};

describe('midi doctor', () => {
  let testDir;

  beforeEach(async () => {
    testDir = createTestDir();
    await fs.ensureDir(testDir);
  });

  afterEach(async () => {
    await fs.remove(testDir);
  });

  describe('validateInstall', () => {
    it('detects valid installation', async () => {
      // Create a complete installation
      await createStructure(testDir);
      const templatesDir = path.join(process.cwd(), 'templates');
      await copyTemplates(templatesDir, testDir, 'generic');
      await writeConfig(testDir, {
        projectName: 'Test Project',
        country: 'Chile',
        region: 'Metropolitana',
        mode: 'full',
        platform: 'generic',
      });
      
      const isValid = await validateInstall(testDir);
      expect(isValid).toBe(true);
    });

    it('reports missing .midi directory', async () => {
      // Don't create anything
      const isValid = await validateInstall(testDir);
      expect(isValid).toBe(false);
    });

    it('reports missing config file', async () => {
      // Create directories but no config
      await createStructure(testDir);
      
      const isValid = await validateInstall(testDir);
      expect(isValid).toBe(false);
    });

    it('reports missing agents directory', async () => {
      // Create partial installation
      await fs.ensureDir(path.join(testDir, '.midi', 'config'));
      await writeConfig(testDir, {
        projectName: 'Test',
        country: 'Chile',
        region: 'Metropolitana',
        mode: 'full',
        platform: 'generic',
      });
      
      const isValid = await validateInstall(testDir);
      expect(isValid).toBe(false);
    });

    it('reports missing midi-project directory', async () => {
      // Create .midi but not midi-project
      await createStructure(testDir);
      const templatesDir = path.join(process.cwd(), 'templates');
      await copyTemplates(templatesDir, testDir, 'generic');
      await writeConfig(testDir, {
        projectName: 'Test',
        country: 'Chile',
        region: 'Metropolitana',
        mode: 'full',
        platform: 'generic',
      });
      
      // Remove midi-project
      await fs.remove(path.join(testDir, 'midi-project'));
      
      const isValid = await validateInstall(testDir);
      expect(isValid).toBe(false);
    });

    it('rejects invalid config (missing framework field)', async () => {
      await createStructure(testDir);
      
      // Write config without framework field
      const configPath = path.join(testDir, '.midi', 'config', 'midi.config.json');
      await fs.writeJson(configPath, {
        project_name: 'Test',
        version: '0.1.0',
      });
      
      const isValid = await validateInstall(testDir);
      expect(isValid).toBe(false);
    });
  });

  describe('directory checks', () => {
    it('verifies all required directories', async () => {
      await createStructure(testDir);
      await writeConfig(testDir, {
        projectName: 'Test',
        country: 'Chile',
        region: 'Metropolitana',
        mode: 'full',
        platform: 'generic',
      });
      
      const requiredDirs = [
        '.midi',
        '.midi/config',
        '.midi/agents',
        '.midi/skills',
        '.midi/commands',
        '.midi/templates',
        '.midi/workflows',
        '.midi/docs',
        'midi-project',
      ];
      
      for (const dir of requiredDirs) {
        const exists = await fs.pathExists(path.join(testDir, dir));
        expect(exists, `Missing directory: ${dir}`).toBe(true);
      }
    });

    it('verifies all midi-project phase directories', async () => {
      await createStructure(testDir);
      
      const phases = [
        '00_intake', '01_research', '02_insights', '03_ideas', '04_top3',
        '05_analysis', '06_devil_advocate', '07_iteration', '08_canvas',
        '09_technical_financial_legal', '10_validation', '11_funding',
        '12_evaluation', '13_final'
      ];
      
      for (const phase of phases) {
        const exists = await fs.pathExists(path.join(testDir, 'midi-project', phase));
        expect(exists, `Missing phase: ${phase}`).toBe(true);
      }
    });
  });

  describe('config file validation', () => {
    it('checks for config file validity', async () => {
      await createStructure(testDir);
      const templatesDir = path.join(process.cwd(), 'templates');
      await copyTemplates(templatesDir, testDir, 'generic');
      await writeConfig(testDir, {
        projectName: 'Test',
        country: 'Chile',
        region: 'Metropolitana',
        mode: 'full',
        platform: 'generic',
      });
      
      const configPath = path.join(testDir, '.midi', 'config', 'midi.config.json');
      const config = await fs.readJson(configPath);
      
      expect(config.framework).toBe('MIDI');
      expect(config.version).toBeDefined();
    });

    it('verifies all required config fields', async () => {
      await createStructure(testDir);
      const templatesDir = path.join(process.cwd(), 'templates');
      await copyTemplates(templatesDir, testDir, 'generic');
      await writeConfig(testDir, {
        projectName: 'Test Project',
        country: 'Argentina',
        region: 'Buenos Aires',
        mode: 'exploration',
        platform: 'opencode',
      });
      
      const configPath = path.join(testDir, '.midi', 'config', 'midi.config.json');
      const config = await fs.readJson(configPath);
      
      expect(config.framework).toBe('MIDI');
      expect(config.project_name).toBe('Test Project');
      expect(config.country).toBe('Argentina');
      expect(config.region).toBe('Buenos Aires');
      expect(config.default_mode).toBe('exploration');
      expect(config.agent_platform).toBe('opencode');
    });
  });

  describe('agent file detection', () => {
    it('detects agent files', async () => {
      await createStructure(testDir);
      const templatesDir = path.join(process.cwd(), 'templates');
      await copyTemplates(templatesDir, testDir, 'generic');
      await writeConfig(testDir, {
        projectName: 'Test',
        country: 'Chile',
        region: 'Metropolitana',
        mode: 'full',
        platform: 'generic',
      });
      
      const agentsDir = path.join(testDir, '.midi', 'agents');
      const files = await fs.readdir(agentsDir);
      
      expect(files.length).toBeGreaterThan(5);
    });

    it('verifies expected agent count', async () => {
      await createStructure(testDir);
      const templatesDir = path.join(process.cwd(), 'templates');
      await copyTemplates(templatesDir, testDir, 'generic');
      await writeConfig(testDir, {
        projectName: 'Test',
        country: 'Chile',
        region: 'Metropolitana',
        mode: 'full',
        platform: 'generic',
      });
      
      const agentsDir = path.join(testDir, '.midi', 'agents');
      const files = await fs.readdir(agentsDir);
      
      // Should have 20 agents
      expect(files.length).toBe(20);
    });
  });

  describe('required files check', () => {
    it('verifies PROJECT_STATE.md exists', async () => {
      await createStructure(testDir);
      const templatesDir = path.join(process.cwd(), 'templates');
      await copyTemplates(templatesDir, testDir, 'generic');
      await writeConfig(testDir, {
        projectName: 'Test',
        country: 'Chile',
        region: 'Metropolitana',
        mode: 'full',
        platform: 'generic',
      });
      
      const statePath = path.join(testDir, 'midi-project', 'PROJECT_STATE.md');
      const exists = await fs.pathExists(statePath);
      expect(exists).toBe(true);
    });

    it('verifies all required config files', async () => {
      await createStructure(testDir);
      const templatesDir = path.join(process.cwd(), 'templates');
      await copyTemplates(templatesDir, testDir, 'generic');
      await writeConfig(testDir, {
        projectName: 'Test',
        country: 'Chile',
        region: 'Metropolitana',
        mode: 'full',
        platform: 'generic',
      });
      
      const requiredConfigs = [
        '.midi/config/midi.config.json',
        '.midi/config/agent-routing.json',
        '.midi/config/scoring-rubric.json',
      ];
      
      for (const config of requiredConfigs) {
        const exists = await fs.pathExists(path.join(testDir, config));
        expect(exists, `Missing config: ${config}`).toBe(true);
      }
    });
  });
});
