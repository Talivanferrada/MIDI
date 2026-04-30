import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs-extra';
import path from 'path';
import { createStructure } from '../src/installer/createStructure.js';
import { writeConfig } from '../src/installer/writeConfig.js';
import { copyTemplates } from '../src/installer/copyTemplates.js';
import { validateInstall } from '../src/installer/validateInstall.js';

// Helper to create unique temp directories
const createTestDir = () => {
  return path.join(process.cwd(), 'test-temp-' + Date.now() + '-' + Math.random().toString(36).slice(2));
};

describe('midi init', () => {
  let testDir;

  beforeEach(async () => {
    testDir = createTestDir();
    await fs.ensureDir(testDir);
  });

  afterEach(async () => {
    await fs.remove(testDir);
  });

  describe('createStructure', () => {
    it('creates .midi directory', async () => {
      await createStructure(testDir);
      const exists = await fs.pathExists(path.join(testDir, '.midi'));
      expect(exists).toBe(true);
    });

    it('creates midi-project directory', async () => {
      await createStructure(testDir);
      const exists = await fs.pathExists(path.join(testDir, 'midi-project'));
      expect(exists).toBe(true);
    });

    it('creates all .midi subdirectories', async () => {
      await createStructure(testDir);
      const subdirs = ['config', 'agents', 'skills', 'commands', 'templates', 'workflows', 'docs'];
      
      for (const subdir of subdirs) {
        const exists = await fs.pathExists(path.join(testDir, '.midi', subdir));
        expect(exists, `Missing .midi/${subdir}`).toBe(true);
      }
    });

    it('creates all midi-project subdirectories', async () => {
      await createStructure(testDir);
      const phases = [
        '00_intake', '01_research', '02_insights', '03_ideas', '04_top3',
        '05_analysis', '06_devil_advocate', '07_iteration', '08_canvas',
        '09_technical_financial_legal', '10_validation', '11_funding',
        '12_evaluation', '13_final'
      ];
      
      for (const phase of phases) {
        const exists = await fs.pathExists(path.join(testDir, 'midi-project', phase));
        expect(exists, `Missing midi-project/${phase}`).toBe(true);
      }
    });
  });

  describe('writeConfig', () => {
    it('creates config files', async () => {
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
      
      const configExists = await fs.pathExists(path.join(testDir, '.midi', 'config', 'midi.config.json'));
      expect(configExists).toBe(true);
    });

    it('writes correct config values', async () => {
      await createStructure(testDir);
      const templatesDir = path.join(process.cwd(), 'templates');
      await copyTemplates(templatesDir, testDir, 'generic');
      await writeConfig(testDir, {
        projectName: 'My Innovation Project',
        country: 'Chile',
        region: 'Maule',
        mode: 'exploration',
        platform: 'opencode',
      });
      
      const config = await fs.readJson(path.join(testDir, '.midi', 'config', 'midi.config.json'));
      expect(config.project_name).toBe('My Innovation Project');
      expect(config.country).toBe('Chile');
      expect(config.region).toBe('Maule');
      expect(config.default_mode).toBe('exploration');
      expect(config.agent_platform).toBe('opencode');
    });

    it('creates agent routing config', async () => {
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
      
      const routingExists = await fs.pathExists(path.join(testDir, '.midi', 'config', 'agent-routing.json'));
      expect(routingExists).toBe(true);
    });

    it('creates scoring rubric config', async () => {
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
      
      const rubricExists = await fs.pathExists(path.join(testDir, '.midi', 'config', 'scoring-rubric.json'));
      expect(rubricExists).toBe(true);
    });
  });

  describe('copyTemplates', () => {
    it('copies agent files to .midi/agents', async () => {
      await createStructure(testDir);
      
      const templatesDir = path.join(process.cwd(), 'templates');
      await copyTemplates(templatesDir, testDir, 'generic');
      
      const agentsDir = path.join(testDir, '.midi', 'agents');
      const exists = await fs.pathExists(agentsDir);
      expect(exists).toBe(true);
      
      const files = await fs.readdir(agentsDir);
      expect(files.length).toBeGreaterThan(0);
    });

    it('creates all required agent files', async () => {
      await createStructure(testDir);
      
      const templatesDir = path.join(process.cwd(), 'templates');
      await copyTemplates(templatesDir, testDir, 'generic');
      
      const expectedAgents = [
        'midi-orchestrator.md',
        'midi-intake-agent.md',
        'midi-global-research-agent.md',
      ];
      
      for (const agent of expectedAgents) {
        const agentPath = path.join(testDir, '.midi', 'agents', agent);
        const exists = await fs.pathExists(agentPath);
        expect(exists, `Missing agent: ${agent}`).toBe(true);
      }
    });

    it('creates skill files', async () => {
      await createStructure(testDir);
      
      const templatesDir = path.join(process.cwd(), 'templates');
      await copyTemplates(templatesDir, testDir, 'generic');
      
      const skillsDir = path.join(testDir, '.midi', 'skills');
      const exists = await fs.pathExists(skillsDir);
      expect(exists).toBe(true);
      
      const files = await fs.readdir(skillsDir);
      expect(files.length).toBeGreaterThan(0);
    });

    it('creates command files', async () => {
      await createStructure(testDir);
      
      const templatesDir = path.join(process.cwd(), 'templates');
      await copyTemplates(templatesDir, testDir, 'generic');
      
      const commandsDir = path.join(testDir, '.midi', 'commands');
      const exists = await fs.pathExists(commandsDir);
      expect(exists).toBe(true);
      
      const files = await fs.readdir(commandsDir);
      expect(files.length).toBeGreaterThan(0);
    });

    it('creates workflow files', async () => {
      await createStructure(testDir);
      
      const templatesDir = path.join(process.cwd(), 'templates');
      await copyTemplates(templatesDir, testDir, 'generic');
      
      const workflowsDir = path.join(testDir, '.midi', 'workflows');
      const exists = await fs.pathExists(workflowsDir);
      expect(exists).toBe(true);
      
      const files = await fs.readdir(workflowsDir);
      expect(files.length).toBeGreaterThan(0);
    });

    it('creates template files', async () => {
      await createStructure(testDir);
      
      const templatesDir = path.join(process.cwd(), 'templates');
      await copyTemplates(templatesDir, testDir, 'generic');
      
      const templatesTargetDir = path.join(testDir, '.midi', 'templates');
      const exists = await fs.pathExists(templatesTargetDir);
      expect(exists).toBe(true);
    });

    it('creates documentation files', async () => {
      await createStructure(testDir);
      
      const templatesDir = path.join(process.cwd(), 'templates');
      await copyTemplates(templatesDir, testDir, 'generic');
      
      const docsDir = path.join(testDir, '.midi', 'docs');
      const exists = await fs.pathExists(docsDir);
      expect(exists).toBe(true);
      
      const files = await fs.readdir(docsDir);
      expect(files.length).toBeGreaterThan(0);
    });

    it('creates project state files', async () => {
      await createStructure(testDir);
      
      const templatesDir = path.join(process.cwd(), 'templates');
      await copyTemplates(templatesDir, testDir, 'generic');
      
      const statePath = path.join(testDir, 'midi-project', 'PROJECT_STATE.md');
      const exists = await fs.pathExists(statePath);
      expect(exists).toBe(true);
    });
  });

  describe('validateInstall', () => {
    it('returns false for missing .midi directory', async () => {
      const isValid = await validateInstall(testDir);
      expect(isValid).toBe(false);
    });

    it('returns false for missing config file', async () => {
      await createStructure(testDir);
      const isValid = await validateInstall(testDir);
      expect(isValid).toBe(false);
    });

    it('returns true for complete installation', async () => {
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
  });

  describe('integration', () => {
    it('creates complete MIDI installation', async () => {
      // Step 1: Create structure
      await createStructure(testDir);
      
      // Step 2: Copy templates
      const templatesDir = path.join(process.cwd(), 'templates');
      await copyTemplates(templatesDir, testDir, 'claude-code');
      
      // Step 3: Write config (must come after copyTemplates to preserve values)
      await writeConfig(testDir, {
        projectName: 'Integration Test Project',
        country: 'Chile',
        region: 'Valparaíso',
        mode: 'financeable',
        platform: 'claude-code',
      });
      
      // Step 4: Validate
      const isValid = await validateInstall(testDir);
      expect(isValid).toBe(true);
      
      // Verify config values
      const config = await fs.readJson(path.join(testDir, '.midi', 'config', 'midi.config.json'));
      expect(config.project_name).toBe('Integration Test Project');
      expect(config.country).toBe('Chile');
      expect(config.region).toBe('Valparaíso');
      expect(config.default_mode).toBe('financeable');
      expect(config.agent_platform).toBe('claude-code');
    });

    it('installs 20 agent files', async () => {
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
      expect(files.length).toBe(20);
    });

    it('verifies agent files are not empty', async () => {
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
      
      for (const file of files) {
        const filePath = path.join(agentsDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        expect(content.length, `Agent file ${file} is empty`).toBeGreaterThan(0);
      }
    });
  });
});
