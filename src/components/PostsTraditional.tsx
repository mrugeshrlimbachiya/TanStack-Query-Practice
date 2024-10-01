import React, { useEffect, useState } from 'react';
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
}

function PostsTraditional(): JSX.Element {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchPosts = async (): Promise<void> => {
    try {
      const response = await axios.get<Post[]>("http://localhost:4000/posts");
      setPosts(response.data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  if (isLoading) {
    return <div>Page is loading...</div>;
  }

  if (isError) {
    return <div>Error has occurred...</div>;
  }

  return (
    <div className='post-list'>
      {posts.map((post: Post) => (
        <div className='post-item' key={post.id}>
          <h3 className='post-title'>{post.title}</h3>
          <p className='post-body'>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default PostsTraditional;