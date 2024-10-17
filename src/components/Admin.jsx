import React, { useState, useEffect } from 'react';
import { db, storage, auth } from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import ReactMarkdown from 'react-markdown';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [readingTime, setReadingTime] = useState(0);
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

  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200; // Average reading speed
    const words = text.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setReadingTime(calculateReadingTime(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = '';
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);
      imageUrl = await getDownloadURL(storageRef);
    }
    await addDoc(collection(db, 'posts'), {
      title,
      content,
      category,
      tags: tags.split(',').map(tag => tag.trim()),
      imageUrl,
      readingTime,
      publishedDate: new Date().toISOString()
    });
    setTitle('');
    setContent('');
    setCategory('');
    setTags('');
    setImage(null);
    setReadingTime(0);
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
            <label className="block mb-2 text-gray-700">Category</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Tags</label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="border p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Content</label>
            <textarea
              value={content}
              onChange={handleContentChange}
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
          <div className="mt-4">
            <h3>Preview:</h3>
            <ReactMarkdown>{content}</ReactMarkdown>
            <p>Reading Time: {readingTime} min</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;
