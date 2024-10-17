// Blog.jsx
import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState('');
  const [postId, setPostId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      setPosts(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchPosts();
  }, []);

  const handleComment = async (e) => {
    e.preventDefault();
    if (postId) {
      await addDoc(collection(db, `posts/${postId}/comments`), { text: comment });
      setComment('');
      setPostId(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Blog Posts</h1>
      {posts.map((post) => (
        <div key={post.id} className="mb-4 p-4 bg-white rounded shadow">
          <h2 className="text-2xl font-bold">{post.title}</h2>
          {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="mb-4" />}
          <ReactMarkdown>{post.content}</ReactMarkdown>
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">Comments</h3>
            <form onSubmit={handleComment} className="mb-4">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border p-2 w-full mb-2"
                placeholder="Add a comment"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
                onClick={() => setPostId(post.id)}
              >
                Comment
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;
