# MoodTrack

### Logging in

When logging in you can either use the account **testuser@iu.edu** with the password of **hoosiers2024** or create your own account with register

### Overview

MoodTrack is an innovative music recommendation platform that personalizes playlists based on user moods, energy levels, activities, and preferences. The app integrates a responsive and modern frontend with a robust backend, providing users with seamless and curated music experiences powered by Spotify's API.

### How It Works

MoodTrack utilizes a **complex decision tree** to interpret user inputs such as mood, energy level, genre, activity, time frame, and popularity preference. The decision tree dynamically generates a search term tailored to the user's unique inputs. This search term is sent to the backend API, which connects to Spotify to fetch playlists that best match the user’s criteria.

The decision tree accounts for various combinations of user inputs, including:

- Mood alignment or contrast, such as generating playlists to uplift a sad mood or complement a happy mood.
- Energy levels ranging from low to high.
- Specific genres, activities, and popularity preferences like hidden gems or trending hits.

The backend server, built using Flask, processes the requests from the frontend and communicates with Spotify’s API to fetch playlists. The server also manages user feedback, allowing users to save or like playlists, which are stored in Firebase Firestore.


### Features

1. **Personalized Playlists**:
   - Users can input their mood, activity, and other preferences to get custom playlists.

2. **Spotify API Integration**:
   - Spotify's vast music library is accessed to curate playlists for the user’s preferences.

3. **Responsive Frontend**:
   - Built with **Next.js** and **Tailwind CSS**, the app provides a sleek and modern user interface.

4. **Robust Backend**:
   - A Flask-powered API handles complex decision-making and Spotify integrations.

5. **User Feedback**:
   - Users can like, save, or provide feedback on playlists, which is stored in a **Firebase Firestore** database.

### Technologies Used

1. **Frontend**:
   - Next.js: Framework for the user interface.
   - Tailwind CSS: Utility-first styling for responsive design.
   - NextUI: Component library for enhanced UI elements.

2. **Backend**:
   - Flask: Lightweight framework for handling API requests.
   - Spotify API: For fetching curated playlists.
   - Python-dotenv: To manage environment variables securely.

3. **Database**:
   - Firebase Firestore: For storing user data, liked playlists, and user feedback.

4. **Hosting**:
   - Vercel: For hosting the frontend.
   - Render: For deploying the Flask backend.

### Conclusion

MoodTrack combines advanced decision logic, responsive design, and seamless API integrations to offer a truly personalized music experience. It bridges the gap between user preferences and curated music, making every listening session tailored and enjoyable.
