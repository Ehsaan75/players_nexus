// pages/index.tsx
import React from 'react';
import getGames from './../services/globalapi'


export default function Home() {

  getGames().then((response: { data: any; }) => {
    console.log(response.data); // Log only the data from the response
  });
  return <div></div>;
} 