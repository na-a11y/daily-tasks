import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import UpdatePost from './components/UpdatePost';


import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/update/:id" element={<UpdatePost />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
