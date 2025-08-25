# Pokémon Vue App  

A simple Vue.js app to explore Pokémon data.  

## 🛠️ Manual Setup (from scratch)  

### 1. Create a New Vue Project
```
npm create vue@latest
```

When creating the Vue project, use the following settings:  
```
◇  Project name (target directory):
│  poke_list
│
◇  Select features to include in your project: (↑/↓ to navigate, space to select, a to toggle all, enter to
confirm)
│  ESLint (error prevention)
│
◇  Select experimental features to include in your project: (↑/↓ to navigate, space to select, a to toggle
all, enter to confirm)
│  none
│
◆  Skip all example code and start with a blank Vue project?
│  ● Yes / ○ No
```

### 2. Clean Up Default Files
```
rm poke_list/index.html
rm poke_list/package.json
rm poke_list/src/App.vue
rm poke_list/src/main.js
rm poke_list/.editorconfig
rm poke_list/.gitattributes
rm poke_list/.gitignore
rm poke_list/README.md
rm poke_list/eslint.config.js
rm poke_list/jsconfig.json
rm poke_list/package-lock.json
rm poke_list/public/favicon.ico
rm poke_list/vite.config.js
```

### 3. Initialize Git and Fetch Repository
```
cd poke_list
git init
git remote add origin https://github.com/Arifns18/poke_list.git
git fetch origin
git checkout -t origin/main
```

### 4. Install Project Dependencies
```
npm install
```

### 5. Start the Development Server
```
npm run dev
```

After running npm run dev, your app will be available at the URL shown in the terminal (usually http://localhost:5173).

### Known issue
In effort to publish the project to Github page, the routing is affected. This result the project to run on http://localhost:5173/poke_list/ and showing blank page. To counteract this, click on the home button to load the Pokemon list.
<img width="1268" height="496" alt="image" src="https://github.com/user-attachments/assets/689aced8-e7a9-46ce-8a0e-431dabe1e75f" />


