import { useState } from 'react';
import axios from 'axios';

const useApi = (url) => {
  const Post = async (requestData) => {
    try {
      const response = await axios.post(url, requestData);
      return response.data;
    } catch (error) {
       throw error.response.data
    }
  };

  return {
    Post,
  };
};

export default useApi;
