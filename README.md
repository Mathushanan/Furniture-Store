🪑 Furniture Store Web Application
A web app for furniture store that lets users and in-store staff design and visualize rooms in 2D and 3D. 
Customize layouts with room size, shape, and color to see how furniture fits and looks before buying.

-----------------------------------------------------------------------------------------------

🚀 Features
👤 User Roles
- **Customer**: Design rooms remotely, save and revisit layouts, shop furniture.
- **Admin**: Create personalized room setups in-store using the design tool.

🏠 Homepage
- Hero section with call-to-action
- Featured furniture products (sofas, chairs, tables)
- Company services: Custom furniture, design consultation, fast delivery

🔒 Authentication
- JWT-based login for both Admin and Customer
- Role-based navigation and feature access

🛋️ Room Designer
- Drag & drop furniture from sidebar (beds, chairs, tables, etc.)
- Customize room size, wall/floor textures or colors, and toggle 2D/3D view
- Style furniture: color, dimensions, shade, shadow
- Save designs with name and reuse/edit/delete later

------------------------------------------------------------------------------------------------

🛠️ Tech Stack
### Frontend
- **React 19**
- **Vite** – Build tool for faster development
- **React Router DOM** – Client-side routing
- **Bootstrap 5** – Responsive layout and UI
- **@react-three/fiber** & **drei** – 3D rendering engine
- **Axios** – API requests
- **Leva** – UI sliders and controls
- **React Icons** – Vector icons

### Backend
- **Azure Functions v4** – Serverless APIs
- **.NET 8**
- **Entity Framework Core 9** – Database ORM
- **SQL Server** – User and design data storage
- **Newtonsoft.Json** – JSON parsing
- **PasswordHasher<T>** – Secure password hashing

------------------------------------------------------------------------------------------------

🔐 Security
### JWT Authentication
- Tokens generated at login contain user ID, role, and expiration
- Attached to every secure API request (`Authorization` header)

### Password Protection
- Passwords stored as secure hashes using ASP.NET Core's `PasswordHasher<T>`
- Hashed password compared during login (no plaintext storage)

🧪 Setup Instructions
1. Clone Repository
git clone https://github.com/Mathushanan/Furniture-Store.git
cd furniture-store

2. Frontend Setup
cd frontend -> npm install -> npm run dev

3. Backend Setup
cd backend -> dotnet restore ->func start

Ensure a local SQL Server instance is running and configured in appsettings.json

------------------------------------------------------------------------------------------------

💾 Database Schema (Overview)
The database consists of three main entities: User, RoomDesign, and Furniture. These entities are related to each other to store user information, room design details, and associated furniture for each user.

1. User Table
A User can have multiple RoomDesigns (one-to-many relationship).

2. RoomDesign Table
A RoomDesign belongs to one User (many-to-one relationship).
A RoomDesign can have multiple Furnitures (one-to-many relationship).

3. Furniture Table
A Furniture item belongs to one RoomDesign (many-to-one relationship).

------------------------------------------------------------------------------------------------

🎨 Resources & Credits
Art / Textures / 3D Models
1. 3D Furniture Models: All 3D models used in the application were downloaded from Free3D.com. These models are free to use under their respective free licenses.
2. Wall & Floor Textures: Texture images were sourced directly from Google search (free-to-use images). Used solely for demonstration purposes.
3. Model Conversion: 3D models were converted to .glb format using anyconv.com – a free and easy-to-use model conversion tool.
4. Icons: React Icons – MIT licensed icon packs including FontAwesome, Material Icons, and others.







