
import { useNavigate } from 'react-router-dom';
import { useMeQuery } from '../api/authApi';
import { useEffect } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const Me = () => {
  const navigate = useNavigate();

  const { data, error } = useMeQuery();

  useEffect(()=>{
    
    if ((error as FetchBaseQueryError)?.status === 401) {
        navigate('/login');
    }
  }, [error])
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Hello!, {data?.Data.email}</h1>
    </div>
  );
};

export default Me;
