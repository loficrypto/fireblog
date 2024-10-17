Dynamic and feature-rich blog platform built with Vite, React, Firebase, and Tailwind CSS. It’s designed to offer a sleek user experience and robust functionality, suitable for bloggers who want a modern and efficient way to manage their content.

## Key Features
- Admin Panel: Secure login with Firebase Authentication to manage blog posts.

- Firebase Integration: Utilizes Firestore for storing posts and comments, Storage for image uploads, and Analytics for tracking user interactions.

- Markdown Support: Allows creating posts with rich content using Markdown, including headings, lists, code blocks, and more.

- Custom Embeds: Automatically embeds YouTube, Facebook videos, GitHub Gists, custom audio, and video files within posts.

- Enhanced SEO: Uses react-helmet to manage meta tags and JSON-LD schema for SEO optimization.

- Real-time Data: Displays real-time updates and dynamic content fetching from Firestore.

- Responsive Design: Tailored to look great on any device using Tailwind CSS.

- Syntax Highlighting: Features syntax highlighting for code snippets using react-syntax-highlighter.

## Technologies Used
- Vite: For fast and efficient development with modern tooling.

- React: For building the user interface components.

- Firebase: Comprehensive backend platform for authentication, database, and storage.

- Tailwind CSS: For utility-first styling and responsive design.

- React Markdown: To render Markdown content within React components.

- React Helmet: For managing document head and SEO tags.

- React Player: For embedding video players.

- Syntax Highlighter: For highlighting code snippets in various programming languages.

- Google Analytics: To track user interactions and gather analytics data.

### Database Structure
*Collection*: `posts`
*Document fields*: `title, content, category, tags, imageUrl, readingTime, publishedDate`

*Collection*: `posts/{postId}/comments`
- Document fields: `text`

## Sample Data
Here's a sample data structure for your Firestore database:

```
{
  "posts": [
    {
      "id": "post1",
      "title": "First Post",
      "content": "# Welcome to my blog\nThis is the first post. Stay tuned for more!",
      "category": "General",
      "tags": ["introduction", "welcome"],
      "imageUrl": "https://example.com/image1.jpg",
      "readingTime": 2,
      "publishedDate": "2023-01-01T00:00:00.000Z"
    },
    {
      "id": "post2",
      "title": "Second Post",
      "content": "## Another Day\nHere's another post with some *cool* content.",
      "category": "Updates",
      "tags": ["daily", "updates"],
      "imageUrl": "https://example.com/image2.jpg",
      "readingTime": 3,
      "publishedDate": "2023-01-02T00:00:00.000Z"
    },
    {
      "id": "post3",
      "title": "Embedding Content",
      "content": "### Embedding YouTube\n\nCheck out this video:\n\n[https://www.youtube.com/watch?v=dQw4w9WgXcQ](https://www.youtube.com/watch?v=dQw4w9WgXcQ)\n\n### Embedding Facebook\n\nAnd this one:\n\n[https://www.facebook.com/facebook/videos/10153231379946729/](https://www.facebook.com/facebook/videos/10153231379946729/)\n\n### Embedding Gist\n\nHere's a gist:\n\n[https://gist.github.com/username/gistid](https://gist.github.com/username/gistid)",
      "category": "Tutorials",
      "tags": ["embedding", "tutorial"],
      "imageUrl": "https://example.com/image3.jpg",
      "readingTime": 5,
      "publishedDate": "2023-01-03T00:00:00.000Z"
    }
  ]
}
```
#### Collection: `posts/post1/comments`

```json
{
  "comments": [
    {
      "id": "comment1",
      "text": "Great first post!"
    },
    {
      "id": "comment2",
      "text": "Looking forward to more content."
    }
  ]
}
```
#### Collection: `posts/post2/comments`
```
{
  "comments": [
    {
      "id": "comment1",
      "text": "Thanks for the update!"
    }
  ]
}
```
#### Collection: `posts/post3/comments`
```
{
  "comments": [
    {
      "id": "comment1",
      "text": "Loved the embedding tutorial!"
    }
  ]
}
```

### Firestore Setup Instructions
- Go to your Firebase console.

- Navigate to Firestore Database.

- Create a new database and start in test mode.

- Add the collections and documents as described above using the Firebase console or a script.

### Admin Panel Login Details
The admin panel uses Firebase Authentication to handle login. Make sure to set up Email/Password authentication in the Firebase console.

- Step 1: Firebase Authentication Setup
- Go to Firebase console.

- Select your project.

- Navigate to Authentication.

- Go to the Sign-in method tab.

- Enable the Email/Password provider
