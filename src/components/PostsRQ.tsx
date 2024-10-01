import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

interface Post {
  id: number;
  title: string;
  body: string;
}

const PostsRQ: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery<{ data: Post[] }, AxiosError>({
    queryKey: ["posts"],
    queryFn: () => axios.get<Post[]>("http://localhost:4000/posts")
  });

  if (isLoading) {
    return <div>Page is loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className='post-list'>
      {data?.data.map((post: Post) => (
        <div className='post-item' key={post.id}>
          <h3 className='post-title'>{post.title}</h3>
          <p className='post-body'>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default PostsRQ;