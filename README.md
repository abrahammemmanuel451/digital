Digital Art Gallery - Readme
Overview
 The Digital Art Gallery is a React-based web application, which besides other incredible features, showcases an infinite scroll for fetching and displaying a handpicked collection of digital art photos fetched through the Pexels API. Thus, users get to scroll and load more images as they wish. They can also search for any of the specific photos by the photographer name of the image description.

Features
1. Curated Photo Display: Fetch and display a collection of curated photos taken from the Pexels API.
2. Infinite Scrolling: Additional images will be loaded automatically if the user scrolls down the page to the end.
3. Search Functionality: Helps users filter images according to the name of the photographer, or the description of the image.
4. Responsive design: For example, the site will work in a very simple and clean way, regardless of screen size.

Technologies Used
1. React: For building application user interfaces.
2. Axios: For sending HTTP requests to the Pexels API.
3. CSS-in-JS: Inline styles using JSX for styling those components.
4. Pexels API: To fetch the curated collection of photos.

Setup and Installation
Prerequisites 
Node.js and npm installed on your system. 
A valid API key from Pexels API. 

Steps 

Clone the Repository: 
 git clone <repository-url>
 cd <repository-directory>

Install Dependencies: 
 npm install

Add Your API Key: 
Replace apiKey placeholder in the code with your Pexels API key: 
const apiKey = 'YOUR_PEXELS_API_KEY'; 

Run the Application: 
 npm start 

Then navigate with your browser to http://localhost:3000 and you will view the application. 

File Structure 

. 
├── src 
│ ├── Home.js # Main component for the application 
│ ├── App.js # Entry point of the application 
│ ├── index.js # Renders the React application to DOM 
│ └── styles.css # Styles for the application 
└── package.json # Dependency and script
