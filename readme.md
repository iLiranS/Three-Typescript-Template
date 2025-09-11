
## Three.JS + Typescript boilerplate
This repository contains my Three.js + TypeScript starter project.  
## 🚀 Getting Started

 1. Clone the repository
```bash
git clone https://github.com/iLiranS/Three-Typescript-Template
```
2. Install dependencies
```bash
pnpm install 
# or
npm install
```
3. Update packages to latest recommended versions
```bash
pnpm update --latest
# or
npm update

```
4. Run development server to make sure it works
```bash
pnpm dev
# or
npm run dev

```
## 📂 Project structure
This is the basic structure of which you can expand on your own :
```css
📂src
 └─ 📂Experience
    ├─ 📂Utils
    │   ├─ 📄 Debug.ts
    │   ├─ 📄 EventEmitter.ts
    │   ├─ 📄 Resources.ts
    │   ├─ 📄 Sizes.ts
    │   └─ 📄 Time.ts
    │  
    ├─ 📂 World
    │   ├─ 📄 Environment.ts
    │   ├─ 📄 World.ts
    │   ├─ ... (your own models - Fox, Floor, etc...)
    │
    ├─ Camera.ts
    ├─ Experience.ts
    ├─ sources.ts (array of sources to load)
    └─ Renderer.ts


```