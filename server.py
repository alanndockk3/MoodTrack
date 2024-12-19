from flask_cors import CORS
from flask import Flask, request, jsonify
import requests
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "https://mood-track-pink.vercel.app"}})

# Spotify API Credentials
SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")

# Function to get Spotify access token
def get_spotify_token():
    url = "https://accounts.spotify.com/api/token"
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    data = {"grant_type": "client_credentials"}
    response = requests.post(
        url,
        headers=headers,
        data=data,
        auth=(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET),
    )

    if response.status_code != 200:
        print(f"Error fetching token: {response.status_code} - {response.text}")
        return None

    response_json = response.json()
    return response_json.get("access_token")


# Complex Decision Tree Logic
def decision_tree(feeling, energy, genre, time_frame, popularity, activity, align_mood="Yes"):
    # Extended decision map for combinations of feeling and energy
    decision_map = {
        "Relaxed": {
            "Low": {"default": "Lo-Fi Chill", "Jazz": "Smooth Jazz Vibes", "Rock": "Acoustic Rock Relax"},
            "Moderate": {"default": "Smooth Jazz", "Classical": "Light Classical", "Pop": "Relaxed Pop Hits"},
            "High": {"default": "Calm Vibes", "Electronic": "Ambient Electronica", "Rock": "Soft Rock Energetic"},
        },
        "Happy": {
            "Low": {"default": "Chill Pop", "Indie": "Happy Indie Vibes", "Acoustic": "Feel-Good Acoustic"},
            "Moderate": {"default": "Feel-Good Hits", "Pop": "Pop Party", "Folk": "Happy Folk Tunes"},
            "High": {"default": "Party Hits", "Electronic": "Dance Party Vibes", "Rock": "Rock Party Anthems"},
        },
        "Sad": {
            "Low": {"default": "Acoustic Heartbreak", "Jazz": "Sad Jazz Ballads", "Indie": "Indie Sad Melancholy"},
            "Moderate": {"default": "Indie Sad Vibes", "Pop": "Melancholic Pop", "Classical": "Somber Classical"},
            "High": {"default": "Uplifting Pop", "Electronic": "Hopeful Beats", "Folk": "Uplifting Folk Tunes"},
        },
        "Stressed": {
            "Low": {"default": "Mindfulness Meditation", "Nature": "Nature Sounds", "Classical": "Soft Piano"},
            "Moderate": {"default": "Nature Sounds", "Jazz": "Smooth Stress Relief Jazz", "Ambient": "Ambient Relaxation"},
            "High": {"default": "Ambient Chill", "Electronic": "Stress Relief Beats", "Rock": "Soothing Rock Tunes"},
        },
        "Focused": {
            "Low": {"default": "Study Beats", "Classical": "Calm Classical Focus", "Jazz": "Soft Jazz Study"},
            "Moderate": {"default": "Classical Focus", "Electronic": "Focus Electronica", "Ambient": "Deep Focus Ambient"},
            "High": {"default": "Productive Energy", "Rock": "Energetic Focus Rock", "Pop": "Motivating Pop Hits"},
        },
        "Excited": {
            "Low": {"default": "Chill Party Vibes", "Pop": "Feel-Good Dance Pop", "Indie": "Upbeat Indie"},
            "Moderate": {"default": "Upbeat Hits", "Electronic": "Exciting EDM", "Rock": "Energetic Rock Vibes"},
            "High": {"default": "Party Anthems", "Electronic": "Festival EDM", "Pop": "Pop Dance Anthems"},
        },
        "Angry": {
            "Low": {"default": "Chill Instrumentals", "Rock": "Soft Rock to Calm", "Classical": "Piano to Soothe"},
            "Moderate": {"default": "Alternative Rock", "Metal": "Aggressive Metal", "Electronic": "Dark Beats"},
            "High": {"default": "Hard Rock Hits", "Metal": "Heavy Metal Energy", "Electronic": "Powerful Bass Drops"},
        },
        "Romantic": {
            "Low": {"default": "Soft Love Songs", "Jazz": "Romantic Jazz", "Classical": "Classical Romance"},
            "Moderate": {"default": "Love Ballads", "Pop": "Romantic Pop Hits", "Acoustic": "Acoustic Romance"},
            "High": {"default": "Date Night Beats", "Electronic": "Chill Romantic EDM", "Rock": "Love Rock Anthems"},
        },
        "Lonely": {
            "Low": {"default": "Reflective Acoustic", "Indie": "Melancholy Indie", "Jazz": "Soft Lonely Jazz"},
            "Moderate": {"default": "Emo Ballads", "Pop": "Sad Pop Hits", "Classical": "Lonely Piano Pieces"},
            "High": {"default": "Hopeful Indie Vibes", "Electronic": "Uplifting Beats", "Pop": "Positive Pop Anthems"},
        },
    }

    # Default playlist if no match is found
    default_playlist = "Top Picks for You"

    # Mood opposites for alignment "No"
    mood_opposites = {
        "Relaxed": "Excited",
        "Happy": "Sad",
        "Sad": "Happy",
        "Stressed": "Relaxed",
        "Focused": "Distracted",
        "Excited": "Relaxed",
        "Angry": "Calm",
        "Romantic": "Lonely",
        "Lonely": "Romantic",
    }

    # Step 1: Adjust mood based on alignment
    if align_mood == "No":
        feeling = mood_opposites.get(feeling, feeling)

    # Step 2: Retrieve mood and energy-specific playlist
    mood_category = decision_map.get(feeling, {})
    energy_category = mood_category.get(energy, {})
    base_playlist = energy_category.get(genre, energy_category.get("default", default_playlist))

    # Step 3: Enhance the search term with additional inputs
    if activity and activity != "None":
        base_playlist += f" {activity}"
    if time_frame == "Past two weeks":
        base_playlist += " New"
    if popularity == "Hidden Gems":
        base_playlist += " Hidden Gems"

    # Return a clean, search-friendly query
    return " ".join(base_playlist.split())




# Function to search Spotify for a playlist
def search_spotify_playlist(search_term):
    token = get_spotify_token()
    if not token:
        return {"error": "Failed to retrieve Spotify access token."}

    url = "https://api.spotify.com/v1/search"
    headers = {"Authorization": f"Bearer {token}"}
    params = {"q": search_term, "type": "playlist", "limit": 10}

    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()

        response_json = response.json()
        print("Spotify API Response:", response_json)

        # Extract and filter out None values
        playlists = response_json.get("playlists", {}).get("items", [])
        valid_playlists = list(filter(lambda x: x is not None, playlists))

        if valid_playlists:
            return [
                {
                    "name": playlist.get("name", "Unknown Playlist"),
                    "url": playlist.get("external_urls", {}).get("spotify", "#"),
                    "description": playlist.get("description", "No description available."),
                    "image": playlist.get("images", [{}])[0].get("url", ""),  # Default empty string for image
                }
                for playlist in valid_playlists
            ]

        return {"error": f"No playlists found for search term '{search_term}'."}

    except requests.exceptions.RequestException as e:
        print(f"Spotify API Request Error: {e}")
        return {"error": "Failed to fetch playlists from Spotify."}

    except Exception as e:
        print(f"Unexpected Error: {e}")
        return {"error": "An unexpected error occurred while processing the request."}









# Flask API Endpoint
@app.route("/recommend", methods=["POST"])
def recommend():
    try:
        data = request.get_json()
        feeling = data.get("feeling", "")
        energy = data.get("energy", "")
        genre = data.get("genre", "")
        time_frame = data.get("timeFrame", "Any Time")
        popularity = data.get("popularity", "Popular")
        activity = data.get("activity", "None")
        align_mood = data.get("alignMood", "Yes")

        # Generate search term using decision tree
        search_term = decision_tree(feeling, energy, genre, time_frame, popularity, activity, align_mood)

        # Search Spotify for playlists
        playlists = search_spotify_playlist(search_term)
        return jsonify(playlists)

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal server error"}), 500





@app.route("/feedback", methods=["POST"])
def receive_feedback():
    data = request.json
    playlist_name = data.get("playlist_name")
    feedback = data.get("feedback")
    user_id = data.get("user_id", "unknown")

    if playlist_name and feedback:
        print(f"Feedback: User '{user_id}' - Playlist '{playlist_name}' - {feedback}")
        return jsonify({"message": "Feedback received successfully!"}), 200
    else:
        return jsonify({"error": "Invalid feedback data"}), 400


if __name__ == "__main__":
    app.run(debug=True)
