import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './Components/PostList';
import PostForm from './Components/PostForm';
import UpdatePostForm from './Components/UpdatePostForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostForm />} />
        <Route path="/getdata" element={<PostList />} />
        <Route path="/edit/:id" element={<UpdatePostForm />} />
      

      </Routes>
    </Router>
  );
}

export default App;
