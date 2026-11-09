# Workout Fight — Solo Builder

**AI-assisted application project | Functional testing | Iterative quality improvement**

[Repository](https://github.com/hezirbrasil/SoloMode)

## Overview

Solo Builder is an independent web application for building and organizing training sessions. It supports exercise libraries, lesson blocks, timing configuration, grouping, reordering, saved sessions, and printable workout scripts.

This project is part of an independent, AI-assisted application development portfolio. The workflow focused on defining expected behavior, guiding AI tools through prompts, reviewing generated results, and repeatedly testing application features.

## Key features

- Exercise library with search and filters by modality and muscle group.
- Full Body and Leg Blast session categories.
- Add, edit, remove, and organize exercises.
- Work and rest intervals for individual blocks.
- Multi-selection, time standardization, grouping, ungrouping, duplication, and reordering.
- Custom exercises scoped to the current session.
- Simplified workout script and print support.
- Local saving, saved-session management, duplication, renaming, and JSON import/export.
- Responsive interface with a dark and neon-purple visual style.

## Quality assurance and testing

The repository includes automated checks and Node.js tests for core application logic. Current test coverage includes:

- Exercise-bank uniqueness and standardized muscle groups.
- Creating, updating, and deleting exercises.
- Duplicate prevention and combined search filters.
- Preventing repeated exercises in a session.
- Requiring both sides of a unilateral exercise.
- Custom exercises and their session-level scope.
- Bulk time updates, grouping, ungrouping, joining, reordering, and duplication.
- Structural checks for key application views and UI elements.

Run the tests with:

```bash
npm test
node tests/checks.mjs
```

The presence of automated tests documents the intended validation coverage; it does not by itself imply that every test run has passed.

## AI-assisted development and evaluation workflow

My contribution to this project focused on:

1. Defining functional requirements and expected user flows.
2. Translating requirements into structured prompts for AI tools.
3. Reviewing AI-generated implementations against those requirements.
4. Repeatedly testing features and identifying inconsistencies.
5. Refining prompts and requirements to improve the results.
6. Iterating on the application and maintaining project versions in GitHub.

**Tools used:** ChatGPT, Claude, GitHub, Supabase, and Visual Studio Code.

The application was developed primarily through prompt-based AI assistance. This portfolio describes hands-on requirement definition, output review, and functional validation—not professional software engineering or independent authorship of all source code.

## Technologies in the repository

- HTML5
- CSS3
- JavaScript (ES modules)
- Node.js test runner
- LocalStorage for browser-based persistence

## Run locally

Serve the project directory over HTTP because the application uses ES modules. For example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

---

# Versão em português

## Visão geral

O Solo Builder é uma aplicação web independente para montar e organizar aulas e sessões de treinamento. Oferece banco de exercícios, blocos de aula, configuração de tempos, agrupamento, reordenação, aulas salvas e roteiros para impressão.

Este projeto integra um portfólio de desenvolvimento assistido por IA. O processo envolveu definir comportamentos esperados, orientar ferramentas de IA por meio de prompts, revisar os resultados gerados e testar repetidamente as funcionalidades.

## Testes e qualidade

O repositório contém verificações automatizadas e testes de lógica com Node.js. A cobertura atual inclui gerenciamento e busca do banco de exercícios, prevenção de duplicatas, regras para exercícios unilaterais, exercícios personalizados, atualização de tempos, agrupamento, junção, reordenação e duplicação de blocos.

A existência dos testes documenta a cobertura de validação planejada, mas não significa, por si só, que todas as execuções tenham sido aprovadas.

## Minha participação no projeto

- Definição de requisitos funcionais e fluxos esperados.
- Transformação de requisitos em prompts estruturados.
- Revisão de implementações geradas por IA.
- Testes repetidos e identificação de inconsistências.
- Refinamento de prompts e requisitos.
- Iteração e organização das versões do projeto no GitHub.

**Ferramentas:** ChatGPT, Claude, GitHub, Supabase e Visual Studio Code.

O desenvolvimento foi realizado principalmente com assistência de IA por meio de prompts. A descrição destaca definição de requisitos, revisão de resultados e validação funcional, sem alegar atuação como engenheiro de software profissional.
