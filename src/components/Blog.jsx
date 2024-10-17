import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      setPosts(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchPosts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Blog Home - My Blog</title>
        <meta name="description" content="Welcome to My Blog. Explore amazing content on various topics." />
        <meta name="keywords" content="blog, posts, articles, my blog" />
      </Helmet>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">Blog Posts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
              {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />}
              <div className="p-4">
                <h2 className="text-2xl font-bold text-gray-800">{post.title}</h2>
                <p className="text-gray-600 mt-2">{post.content.substring(0, 100)}...</p>
                <p className="text-sm text-gray-500">Category: {post.category}</p>
                <p className="text-sm text-gray-500">Tags: {post.tags.join(', ')}</p>
                <p className="text-sm text-gray-500">Reading Time: {post.readingTime} min</p>
                <p className="text-sm text-gray-500">Published Date: {new Date(post.publishedDate).toLocaleDateString()}</p>
                <Link to={`/post/${post.id}`} className="text-blue-500 hover:underline mt-4 inline-block">Read more</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blog;
