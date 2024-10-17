// Admin.jsx
import React, { useState, useEffect } from 'react';
import { db, storage, auth } from './firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import ReactMarkdown from 'react-markdown';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      setPosts(querySnapshot.docs.map((doc) => doc.data()));
    };
    fetchPosts();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = '';
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);
      imageUrl = await getDownloadURL(storageRef);
    }
    await addDoc(collection(db, 'posts'), { title, content, imageUrl });
    setTitle('');
    setContent('');
    setImage(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Panel</h2>
        <button onClick={handleSignOut} className="bg-red-500 text-white p-2 rounded mb-4 w-full">Sign Out</button>
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div>
            <label className="block mb-2 text-gray-700">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="mb-4"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Submit</button>
          <ReactMarkdown className="mt-4">{content}</ReactMarkdown>
        </form>

        <h3 className="text-xl font-bold mb-4 text-center">All Posts</h3>
        <ul className="space-y-4">
          {posts.map((post, index) => (
            <li key={index} className="bg-gray-100 p-4 rounded shadow">
              <h4 className="text-lg font-bold">{post.title}</h4>
              <p>{post.content.substring(0, 100)}...</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
