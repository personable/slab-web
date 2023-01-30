# Web Slab

A repo for making components with storybook while we wait for a real repo.

## Get Started

- Clone the repo in Github
- `yarn`
- `yarn storybook`

## Important

- This repo has a single branch: `main`.
- 🚨 Every time you push changes up to `main`, Netlify deploys a new version of the storybook [here](https://slab-web.netlify.app/). 🚨
- Because it's just us designers here, we can see how it works out just having a single branch.
- 🙏 **However, please don't change other peoples' components/files without asking them first.** 🙏
- There are unpublished components in the repo (Drawer, etc.) that aren't quite ready for primetime yet. Please just leave them for now.

## About the storybook

The storybook is set up to match the web app as closely as possible. You have access to:

- The CSS variables of our design tokens (use these whenever possible)
- Averta (Bold/`font-weight: 700;`, ExtraBold/`font-weight: 800;`)
- The `mdi` icon font

Components should be copy-and-paste-able into the `SlabTransferPortal` directory in the web app, when they're ready to use.

- Exception is the **javascript** version of the tokens. On storybook: `import * as tokens from "./shared/tokens.js";`. In the web app: `import { tokens } from @companycam/slab`.
