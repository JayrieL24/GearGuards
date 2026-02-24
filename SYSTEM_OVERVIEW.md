# GearGuard System Overview

## What is GearGuard?

GearGuard is a comprehensive equipment tracking and management system designed for educational institutions. It streamlines the process of borrowing, returning, and managing equipment inventory with role-based access control and AI-powered analytics.

## Key Features

### 1. Role-Based Access Control
- **Admin**: Full system control, user approvals, inventory management,  analytics using ai
- **Handler**: Process borrow/return transactions, scan items, manage walk-in requests
- **Student/Personnel**: Browse equipment, request borrows, track their borrowed items

### 2. Equipment Management
- Organized by categories (Devices, Computer Parts, Ejectables, Robotics Parts)
- Track individual item instances with unique barcodes
- Monitor item status (Available, In Use, Faulty, In Repair)
- Real-time inventory updates

### 3. Borrow Workflow
- **Students/Personnel**: Browse items → Request borrow → Wait for approval
- **Handler**: Scan user RFID → Scan item barcode → Process transaction
- **Admin**: Approve/reject borrow requests, view all transactions

### 4. AI-Powered Analytics (Google Gemini)
- Inventory analysis and recommendations
- Borrow pattern insights
- Custom data analysis queries
- Predictive maintenance suggestions

### 5. Notifications System
- Real-time updates on borrow request status
- Approval/rejection notifications
- Return reminders

## System Architecture

### Frontend (React + Vite)
- **Technology**: React 18, React Router, PrimeReact UI components
- **Deployment**: Netlify
- **URL**: https://gearguards.netlify.app
- **Features**:
  - Responsive design
  - Role-specific dashboards
  - Real-time notifications
  - Barcode/RFID scanning interface

### Backend (Django REST Framework)
- **Technology**: Django 5.1, Django REST Framework, PostgreSQL
- **Deployment**: Render
- **URL**: https://gearguard-backend-g4b1.onrender.com
- **Features**:
  - RESTful API
  - Token-based authentication
  - Role-based permissions
  - AI service integration

### Database (PostgreSQL)
- **Provider**: Neon (free tier)
- **Features**:
  - Relational data model
  - Transaction logging
  - User profiles and permissions
  - Inventory tracking

### AI Service
- **Provider**: Google Gemini API
- **Use Cases**:
  - Generate inventory insights
  - Analyze borrow patterns
  - Provide recommendations
  - Custom data queries

## User Roles & Capabilities

### Admin
- Approve/reject user registrations
- Manage all inventory (add, edit, delete items)
- View comprehensive analytics and reports
- Access AI-powered recommendations
- Approve/reject borrow requests
- View all system transactions
- Manage categories and items

### Handler
- Process walk-in borrow transactions
- Scan user RFID cards
- Scan item barcodes
- Approve/reject borrow requests
- View pending requests
- Process returns

### Student/Personnel (Borrowers)
- Browse available equipment by category
- Request to borrow items
- View their active borrows
- Track borrow history
- Receive notifications on request status
- View account information

## Sample Accounts

After deployment, the system includes these test accounts:

1. **Admin Account**
   - Username: `admin1`
   - Password: `AdminPass123!`
   - Role: Administrator

2. **Handler Account**
   - Username: `handler1`
   - Password: `HandlerPass123!`
   - Role: Handler

3. **Student Account**
   - Username: `student1`
   - Password: `StudentPass123!`
   - Role: Student (Borrower)

4. **Personnel Account**
   - Username: `personnel1`
   - Password: `PersonnelPass123!`
   - Role: Personnel (Borrower)

## Data Model

### Core Entities

**User & UserProfile**
- Authentication and role management
- Approval workflow for new registrations
- Role-based permissions

**Category**
- Equipment categories (Devices, Computer Parts, etc.)
- Organizes items logically

**Item**
- Equipment types (Laptop, Mouse, Arduino, etc.)
- Belongs to a category
- Has multiple instances

**ItemInstance**
- Individual physical items with unique barcodes
- Tracks status (Available, In Use, Faulty, In Repair)
- Links to specific borrows

**Borrow**
- Borrow transactions
- Status tracking (Pending, Approved, Rejected, Returned)
- Links borrower, item instances, and handlers
- Timestamps for request, approval, and return

**BorrowLog**
- Audit trail of all borrow actions
- Tracks who did what and when
- Maintains transaction history

## Workflow Examples

### New User Registration
1. User visits the site and clicks "Create account"
2. Fills in registration form (username, email, password, role request)
3. Submission creates pending user account
4. Admin reviews and approves/rejects
5. User receives notification and can log in if approved

### Borrowing Equipment (Student/Personnel)
1. Log in and browse categories
2. Select desired item
3. Submit borrow request with quantity and reason
4. Wait for admin/handler approval
5. Receive notification when approved
6. Pick up equipment from handler

### Processing Walk-in Borrow (Handler)
1. Handler scans user's RFID card
2. System displays user information
3. Handler scans item barcode
4. Confirms quantity and processes transaction
5. System updates inventory and creates borrow record

### Inventory Management (Admin)
1. View all categories and items
2. Add new items or item instances
3. Update item status (mark as faulty, in repair, etc.)
4. View analytics on item usage
5. Get AI recommendations for inventory optimization

## Technology Stack Summary

**Frontend:**
- React 18
- React Router v6
- PrimeReact (UI components)
- Vite (build tool)
- Axios (HTTP client)

**Backend:**
- Python 3.12
- Django 5.1
- Django REST Framework
- PostgreSQL (via psycopg)
- Google Generative AI (Gemini)
- Gunicorn (WSGI server)

**Infrastructure:**
- Frontend: Netlify (CDN, auto-deploy)
- Backend: Render (free tier, auto-deploy)
- Database: Neon PostgreSQL (free tier)
- Version Control: GitHub

## Security Features

- Token-based authentication (Django REST Framework tokens)
- Role-based access control (RBAC)
- Password validation and hashing
- CORS protection
- HTTPS encryption (provided by Netlify/Render)
- Environment variable management for secrets
- Admin approval workflow for new users

## Deployment Architecture

```
User Browser
    ↓
Netlify CDN (Frontend)
    ↓
Render (Backend API)
    ↓
Neon PostgreSQL (Database)
    ↓
Google Gemini API (AI Analytics)
```

## Future Enhancement Possibilities

- Email notifications
- SMS alerts for overdue items
- QR code generation for items
- Mobile app (React Native)
- Advanced reporting and exports
- Integration with school ID systems
- Automated overdue reminders
- Damage reporting workflow
- Multi-location support
- Reservation system

---

**System Status**: ✅ Fully Deployed and Operational

**Live URLs:**
- Frontend: https://gearguards.netlify.app
- Backend: https://gearguard-backend-g4b1.onrender.com
- Database: Neon PostgreSQL (managed)
