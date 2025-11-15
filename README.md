# Ticketing System - Frontend

## 🚀 Features

- **User Authentication** - Login and registration with JWT token management
- **Role-Based Dashboards** - Separate interfaces for Users and Admins
- **Customer Features**
  - Create new tickets
  - View personal tickets
  - Edit tickets (only when status = "Requested")
  - Real-time status updates
- **Admin Features**
  - View all tickets from all users
  - Approve/Reject requested tickets
  - Close open tickets
  - Process tickets with status workflow

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Angular CLI](https://angular.io/cli) (v18)
- Code editor (VS Code recommended)

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ticketing-system  # or your frontend folder name
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure API Endpoint

Update the API URL in service files to match your backend:

**src/app/services/auth.service.ts:**
```typescript
private apiUrl = 'http://localhost:5004/api/Auth';  // Change port if needed
```

**src/app/services/ticket.service.ts:**
```typescript
private apiUrl = 'http://localhost:5004/api/Tickets';  // Change port if needed
```

### 4. Run Development Server

```bash
ng serve
```

Navigate to `http://localhost:4200` in your browser.

## 🎯 Usage

### First Time Setup

1. **Start the backend API** first (ensure it's running on `http://localhost:5004`)
2. **Start the frontend** with `ng serve`
3. **Open browser** to `http://localhost:4200`

### Login Credentials (Seeded Accounts)

| Email | Password | Role | Access |
|-------|----------|------|--------|
| admin@test.com | Admin123! | Admin | Full access to all tickets |
| customer@test.com | User123! | User | Access to own tickets only |

### User Flow

1. **Login** - Navigate to login page (User can't register new accounts, user accounts will be given by admins)
2. **Create Ticket** - Click "Create New Ticket" button
3. **Fill Details** - Title, description, priority
4. **View Tickets** - See your tickets in the dashboard table
5. **Edit Ticket** - Click pencil icon (only if status = "Requested")
6. **Track Status** - See status update

### Admin Flow

1. **Login/Register New Account as Admin** - Use admin@test.com
2. **View All Tickets** - See tickets from all users
3. **Process Requested Tickets** - Click gear icon
4. **Approve or Reject** - Click "Approve (Open)" or "Reject"
5. **Close Tickets** - Click gear icon on "Open" tickets → "Close Ticket"
