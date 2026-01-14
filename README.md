# 🕹️ GameCollect-Front

Front-end de l’application **GameCollect**, une interface web pour gérer et visualiser une collection de jeux vidéo.

Ce projet est construit avec **Vue 3** et **Vite**, et sert d’application front destinée à communiquer avec une API backend (GameCollect API).

---

## 🧱 Stack technique

| Technologie             | Version / Usage                                                |
| ----------------------- | -------------------------------------------------------------- |
| Vue 3                   | Framework UI principal                                         |
| Vite                    | Outil de build et dev serveur rapide                           |
| JavaScript / TypeScript | Langage principal                                              |
| Tailwind CSS            | Styles utilitaires                                             |
| …                       | et autres dépendances (Axios, Pinia ou Vue Router si présents) |

---

## 🚀 Fonctionnalités principales

👉 _Adapter cette section après lecture du code si nécessaire_ :

- Visualisation de la liste des jeux de l’utilisateur
- Ajout / édition / suppression de jeux
- Filtrage / tri de la collection
- Intégration avec une API backend pour stocker les données de collection

---

## 📂 Structure du projet

```
GameCollect-Front
├── public/                # Assets publics
├── src/
│   ├── assets/            # Images & styles
│   ├── components/        # Composants Vue réutilisables
│   ├── views/             # Pages Vue
│   ├── router/            # Routes de l’application
│   ├── store/             # Gestion d’état (Pinia / Vuex)
│   ├── App.vue            # Entrypoint Vue
│   └── main.js (ou main.ts)# Bootstrap de l’app
├── .gitignore
├── index.html
├── package.json           # Dépendances & scripts
├── vite.config.js         # Config Vite
└── tailwind.config.js     # Config Tailwind
```

---

## 🛠️ Installation

Clone le dépôt :

```bash
git clone https://github.com/MuhammadZelliche/GameCollect-Front.git
cd GameCollect-Front
```

Installe les dépendances :

```bash
npm install
```

ou (si tu utilises pnpm / yarn) :

```bash
pnpm install
# ou
yarn
```

---

## 🧪 Environnement de développement

Crée un fichier `.env` à la racine pour configurer les variables d’environnement. Exemple :

```env
VITE_API_BASE_URL=https://ton-api-backend.com
```

✏️ _Adapte les clés en fonction de ton backend._

---

## 🧑‍💻 Commandes utiles

Lance le serveur de développement :

```bash
npm run dev
```

Compile le projet en build de production :

```bash
npm run build
```

Prévisualiser la build production localement :

```bash
npm run preview
```

---

## 📡 API & Back-end

Ce front communique avec une API externe pour :

- Authentification (login / token)
- Récupérer les jeux
- Ajouter / modifier / supprimer

> Assure-toi que l’API backend est disponible et que l’URL est configurée dans `.env` (`VITE_API_BASE_URL`).

---

## 📦 Déploiement

### 📌 GitHub Pages

1. Génère la build :

   ```bash
   npm run build
   ```

2. Déploie le dossier `dist/` sur ta plateforme d’hébergement.

### 📌 Autres plateformes

Tu peux déployer sur :

| Plateforme | Notes                                |
| ---------- | ------------------------------------ |
| Netlify    | Assure la build avec `npm run build` |
| Vercel     | Détecte Vite automatiquement         |
| Surge      | Simple pour projets statiques        |

---

## 🧩 Personnalisation

### ✨ Thèmes & styles

Ce projet utilise **Tailwind CSS**. Tu peux modifier :

- `tailwind.config.js` pour ajouter des couleurs / plugins
- les classes utilitaires directement dans les composants

---

## 🧪 Tests (optionnel)

Si des tests unitaires sont présents, utilise :

```bash
npm run test
```

---

## 🤝 Contribution

1. Fork le repo
2. Crée une branche feature :
   ```bash
   git checkout -b feature/ma-feature
   ```
3. Commit tes changements
4. Push & crée une pull request

---

## 📜 License

Ce projet est libre — _ajoute ici la licence si tu en as une (MIT, ISC, etc.)_.

---

## 📬 Contact

Pour toute question ou suggestion :

🔹 **Auteurs:** Romain Nivelle & Muhammad Zelliche

---

✨ _Merci d’utiliser GameCollect-Front ! Améliore ta collection de jeux avec élégance 😉_
