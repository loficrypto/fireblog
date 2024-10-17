// Blog.jsx
import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig';
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
        <h1 className="text-4xl font-bold mb-4">Blog Posts</h1>
        {posts.map((post) => (
          <div key={post.id} className="mb-4 p-4 bg-white rounded shadow">
            <h2 className="text-2xl font-bold">{post.title}</h2>
            {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="mb-4" />}
            <p>{post.content.substring(0, 100)}...</p>
            <Link to={`/post/${post.id}`} className="text-blue-500">Read more</Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Blog;
