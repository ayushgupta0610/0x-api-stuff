# 🚀 Express TypeScript Boilerplate 2024

[![Build](https://github.com/edwinhern/express-typescript-2024/actions/workflows/build.yml/badge.svg)](https://github.com/edwinhern/express-typescript-2024/actions/workflows/build.yml)
[![Test](https://github.com/edwinhern/express-typescript-2024/actions/workflows/test.yml/badge.svg)](https://github.com/edwinhern/express-typescript-2024/actions/workflows/test.yml)
[![Code Quality](https://github.com/edwinhern/express-typescript-2024/actions/workflows/code-quality.yml/badge.svg)](https://github.com/edwinhern/express-typescript-2024/actions/workflows/code-quality.yml)
[![Docker Image CI](https://github.com/edwinhern/express-typescript-2024/actions/workflows/docker-image.yml/badge.svg)](https://github.com/edwinhern/express-typescript-2024/actions/workflows/docker-image.yml)

``` code
Hey There! 🙌 
🤾 that ⭐️ button if you like this boilerplate. 
```

## 🌟 Introduction

Welcome to the Express TypeScript Boilerplate 2024 – a streamlined, efficient, and scalable foundation for building powerful backend services with modern tools and practices in Express.js and TypeScript.

## 💡 Motivation

This boilerplate aims to:

- ✨ Reduce setup time for new projects
- 📊 Ensure code consistency and quality
- ⚡  Facilitate rapid development
- 🛡️ Encourage best practices in security, testing, and performance

## 🚀 Features

- 📁 Modular Structure: Organized by feature for easy navigation and scalability
- 💨 Faster Execution with tsx: Rapid TypeScript execution with `tsx` and type checking with `tsc`
- 🌐 Stable Node Environment: Latest LTS Node version in `.nvmrc`
- 🔧 Simplified Environment Variables: Managed with Envalid
- 🔗 Path Aliases: Cleaner code with shortcut imports
- 🔄 Renovate Integration: Automatic updates for dependencies
- 🔒 Security: Helmet for HTTP header security and CORS setup
- 📊 Logging: Efficient logging with `pino-http`
- 🧪 Comprehensive Testing: Setup with Vitest and Supertest
- 🔑 Code Quality Assurance: Husky and lint-staged for consistent quality
- ✅ Unified Code Style: `Biomejs` for consistent coding standards
- 📃 API Response Standardization: `ServiceResponse` class for consistent API responses
- 🐳 Docker Support: Ready for containerization and deployment
- 📝 Input Validation with Zod: Strongly typed request validation using `Zod`
- 🧩 Swagger UI: Interactive API documentation generated from Zod schemas

## 🛠️ Getting Started

### Video Demo

Swap Tokens with 0x api

1. Token allowance (on 0xdef1c0ded9bec7f1a1670819833240f027b25eff)
2. Fetch Quote
3. Sign Transaction

### Step-by-Step Guide

#### Step 1: 🚀 Initial Setup



#### Step 2: ⚙️ Environment Configuration

- Create `.env`: Copy `.env.template` to `.env`
- Update `.env`: Fill in necessary environment variables

#### Step 3: 🏃‍♂️ Running the Project

- Development Mode: `npm run dev`
- Building: `npm run build`
- Production Mode: Set `.env` to `NODE_ENV="production"` then `npm run build && npm run start`
