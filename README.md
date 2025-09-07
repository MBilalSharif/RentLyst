🏡 RentLyst

RentLyst is a full-stack MERN (MongoDB, Express, React, Node.js) web application designed for renting houses and apartments. It connects landlords and renters by providing a seamless platform to list, manage, and browse rental properties.

✨ Features
👤 Authentication & User Management

Secure JWT-based authentication (Login / Register).

Roles: Landlord and Renter.

Landlord profile management with image & ID uploads.

🏠 Property Listings

Landlords can add, edit, delete rental properties.

Upload property images with descriptions, price, and location.

View all properties with search and filter options.

📊 Landlord Dashboard

Add and manage multiple properties.

Update personal and business details.

Feature property for better visibility.

🔍 Renters’ Features

Browse all available listings.

Filter by location, price, and area.

View detailed property information.

🛠️ Tech Stack

Frontend:

React.js (with components, props, state)

React Router DOM (for navigation)

Axios (for API calls)

CSS Modules / Custom Styling

Backend:

Node.js & Express.js

MongoDB & Mongoose (Schema-based models)

bcrypt.js (password hashing)

JSON Web Tokens (authentication)

Multer + Cloudinary (image uploads)

🚀 Installation

Clone the repository:

git clone https://github.com/your-username/RentLyst.git
cd RentLyst


Install dependencies for both backend and frontend:

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install


Create a .env file in the backend folder with:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


Run the development servers:

# Backend
cd backend
npm run dev

# Frontend
cd ../frontend
npm start

📸 Screenshots

<img width="1348" height="668" alt="rentLystgit1" src="https://github.com/user-attachments/assets/87d28029-3610-463a-8c7b-a6ba537cfa1c" />
<img width="1350" height="633" alt="rentlystgit2" src="https://github.com/user-attachments/assets/de6637c1-22af-4f0f-8ff1-e79399bc1f8a" />


<img width="1342" height="681" alt="rentlystgit3" src="https://github.com/user-attachments/assets/67157390-7924-4fe9-b07b-2e2c2525e5a2" />


🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.

📜 License

This project is licensed under the MIT License.

⚡ With RentLyst, finding and renting your next home has never been easier!
