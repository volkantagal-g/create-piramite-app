#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const ora = require('ora');

const packageJson = require('./package.json');

program
  .version(packageJson.version)
  .description('Create a new PiramiteJS application')
  .argument('[project-name]', 'Name of the project')
  .option('-y, --yes', 'Skip prompts and use defaults')
  .action(async (projectName, options) => {
    try {
      await createApp(projectName, options);
    } catch (error) {
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  });

program.parse();

async function createApp(projectName, options) {
  // Get project name
  let name = projectName;
  if (!name) {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'What is your project named?',
        default: 'my-piramite-app',
        validate: (input) => {
          if (!input.trim()) {
            return 'Project name cannot be empty';
          }
          if (fs.existsSync(input)) {
            return 'Directory already exists';
          }
          return true;
        }
      }
    ]);
    name = answers.projectName;
  }

  const projectPath = path.resolve(name);
  
  // Check if directory exists
  if (fs.existsSync(projectPath)) {
    throw new Error(`Directory ${name} already exists`);
  }

  console.log(chalk.blue('Creating a new PiramiteJS app in'), chalk.green(projectPath));
  console.log();

  const spinner = ora('Setting up project...').start();

  try {
    // Create project directory
    await fs.ensureDir(projectPath);

    // Copy template files
    await copyTemplateFiles(projectPath);

    // Install dependencies
    spinner.text = 'Installing dependencies...';
    await installDependencies(projectPath);

    spinner.succeed(chalk.green('Project created successfully!'));

    console.log();
    console.log(chalk.green('🎉 Success! Your PiramiteJS app is ready.'));
    console.log();
    console.log('To get started:');
    console.log(chalk.cyan(`  cd ${name}`));
    console.log(chalk.cyan('  yarn dev'));
    console.log();
    console.log('Happy coding! 🚀');

  } catch (error) {
    spinner.fail(chalk.red('Failed to create project'));
    throw error;
  }
}

async function copyTemplateFiles(projectPath) {
  const sourceDir = path.join(__dirname, './template');

  // Sadece ana dosyaları kopyala
  const itemsToCopy = [
    'package.json',
    'piramite-app.config.js',
    'README.md',
    '.gitignore'
  ];

  for (const item of itemsToCopy) {
    const srcPath = path.join(sourceDir, item);
    const destPath = path.join(projectPath, item);
    if (fs.existsSync(srcPath)) {
      await fs.copy(srcPath, destPath);
    }
  }

  // src klasörünü recursive ve eksiksiz kopyala
  const srcSourcePath = path.join(sourceDir, 'src');
  const srcDestPath = path.join(projectPath, 'src');
  if (fs.existsSync(srcSourcePath)) {
    await fs.copy(srcSourcePath, srcDestPath, {
      filter: (src) => {
        // Sadece node_modules ve .DS_Store'u hariç tut
        return !src.includes('node_modules') && !src.includes('.DS_Store');
      }
    });
  }
}



async function installDependencies(projectPath) {
  const { execSync } = require('child_process');
  
  try {
    execSync('yarn install', { 
      cwd: projectPath, 
      stdio: 'pipe' 
    });
  } catch (error) {
    // Fallback to npm if yarn fails
    try {
      execSync('npm install', { 
        cwd: projectPath, 
        stdio: 'pipe' 
      });
    } catch (npmError) {
      throw new Error('Failed to install dependencies. Please run "yarn install" or "npm install" manually.');
    }
  }
} 