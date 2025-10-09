# Cricket CRUD App

This is a React-based CRUD application for managing cricket player information. The application allows users to create, read, update, and delete player records, with a user-friendly interface and responsive design.

## Features

- **List Players**: View a list of cricket players with search and delete functionality.
- **Add/Edit Player**: Create new player records or update existing ones.
- **Loading States**: Visual feedback during data fetching with loading spinners.
- **Error Handling**: Graceful error handling for API interactions.
- **Responsive Design**: Mobile-friendly layout using Bootstrap.
- **Placeholder Images**: Default avatars for players without images.

## Technologies Used

- React
- React Router
- Bootstrap
- React Toastify for notifications
- Async/Await for API calls

## Project Structure

```
cricket-crud-app
├── public
│   └── index.html
├── src
│   ├── api
│   │   └── api.js
│   ├── assets
│   │   └── placeholder-avatar.svg
│   ├── components
│   │   ├── CardItem.jsx
│   │   ├── FormItem.jsx
│   │   ├── Header.jsx
│   │   └── Spinner.jsx
│   ├── pages
│   │   ├── ListPage.jsx
│   │   └── UpsertPage.jsx
│   ├── utils
│   │   └── helpers.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── package.json
├── README.md
└── yarn.lock
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd cricket-crud-app
   ```

2. Install dependencies:
   Using npm:
   ```
   npm install
   ```
   Or using Yarn:
   ```
   yarn install
   ```

3. Start the development server:
   Using npm:
   ```
   npm start
   ```
   Or using Yarn:
   ```
   yarn start
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.