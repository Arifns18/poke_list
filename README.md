# Pokémon Vue App  

A simple Vue.js app to explore Pokémon data.  

---

## 🛠️ Manual Setup (from scratch)  

### 1. Create a New Vue Project  
npm create vue@latest

Follow this setting:
Project name (target directory): poke_list

When creating the Vue project, use the following settings:  

- **Project name (target directory):** `poke_list`  

---

## Feature Selection  

When prompted to select features, choose only **ESLint**:  


---

## Example Code  

Skip the example code and start with a blank Vue project:  


### 2. Clean Up Default Files
rm poke_list/index.html
rm poke_list/package.json
rm poke_list/src/App.vue
rm poke_list/src/main.js

### 3. Initialize Git and Fetch Repository
cd poke_list
git init
git remote add origin https://github.com/Arifns18/poke_list.git
git fetch origin
git checkout -t origin/main

### 4. Install Project Dependencies
npm install

### 5. Start the Development Server
npm run dev

After running npm run dev, your app will be available at the URL shown in the terminal (usually http://localhost:5173).