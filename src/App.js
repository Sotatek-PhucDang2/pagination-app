import React, { useEffect, useState, useCallback, useMemo } from 'react';
import PostList from './PostList';
import _ from 'lodash' 
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setPosts(data));
  }, []);

  const chunkedData = useMemo(() => _.chunk(posts, postsPerPage), [posts]);
  const currentItems  = chunkedData[currentPage-1] || [];
  const totalPages = chunkedData.length

  const handlePageChange = (page)=>{
    setCurrentPage(page);
  } 
  return (
    <div>
      <h1>Danh sách bài viết</h1>
      <PostList posts={currentItems} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  return (
    <div>
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{ margin: '5px', fontWeight: page === currentPage ? 'bold' : 'normal' }}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default App;
