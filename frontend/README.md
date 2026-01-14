# BD Admin Frontend

BD Admin Panel Frontend Application

## Setup Instructions

### 1. Install Dependencies

```bash
cd bdadmin/frontend
npm install
```

### 2. Configure API

Edit `src/util/Config.js` and set your API configuration:

```javascript
export const baseURL = "http://localhost:5000"; // Your backend API URL
export const key = "your-secret-key"; // Your API secret key
```

### 3. Run Development Server

```bash
npm start
```

The application will start on port **5003** (http://localhost:5003)

### 4. Build for Production

```bash
npm run build
```

This will create a `build` folder with optimized production files.

## Usage

### Login Methods

1. **URL Parameter Login** (like Agency):
   - `http://localhost:5003/bdadmin?id=bdAdminId`
   - Or: `http://localhost:5003/bdadmin?uniqueId=12345&bdId=BD1234567890`

2. **Direct Navigation**:
   - After login, navigate to: `http://localhost:5003/bdadmin/dashboard`

## Routes

- `/bdadmin/dashboard` - Agency Dashboard (view host stats)
- `/bdadmin/agencies` - List all agencies
- `/bdadmin/create-agency` - Create new agency

## Dependencies

- React 18.3.1
- React Router DOM 6.28.0
- Redux & Redux Thunk
- Axios
- Material-UI
- React Toastify

## Notes

- Make sure the backend API is running and accessible
- Update `baseURL` and `key` in `src/util/Config.js` before running
- The app uses JWT tokens stored in localStorage for authentication
