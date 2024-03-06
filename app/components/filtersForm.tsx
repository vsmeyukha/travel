'use client'
import React, { ReactElement, useState, useEffect } from 'react';
import { MapComponentProps } from './GoogleMaps';
import { Post, posts } from '../postsData';
import calculateDistance from '../utils/calculateDistance';
import { center } from './GoogleMaps';

const FiltersForm = ({ postsData, setPostsData }: MapComponentProps): ReactElement => {
  const [offroad, setOffroad] = useState<boolean>(false);
  const [tourismType, setTourismType] = useState<string>('');
  const [distance, setDistance] = useState<number | null>(null);
  const [rangeValue, setRangeValue] = useState<number>(2000);
  

  // Handle changes in the filter states to apply filters to the posts
  useEffect(() => {
    let filteredPosts = posts.filter(post => {
      // Apply the offroad filter if it is toggled
      const meetsOffroadCondition = offroad ? post.offroad : true;

      // Apply the tourism type filter if a type is selected
      const meetsTourismTypeCondition = tourismType ? post.typeOfTourism === tourismType : true;

      const meetsDistanceCondition = distance === null ? true : 
      calculateDistance(center.lat, center.lng, post.coordinates.lat, post.coordinates.lng) <= distance;

      return meetsOffroadCondition && meetsTourismTypeCondition && meetsDistanceCondition;
    });

    setPostsData(filteredPosts);
  }, [offroad, tourismType, distance, setPostsData]);

  const handleOffroadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOffroad(event.target.checked);
  };

  const handleTourismTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTourismType(event.target.value);
  };

  const handleDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setRangeValue(value);
    // Optionally apply distance filter immediately, or use another criterion like a button click
    // Here, we're applying it directly for demonstration
    setDistance(value !== 8000 ? value : null); // Replace 8000 with your logic for "no filter"
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOffroad(false);
    setTourismType('');
    setDistance(2000);
    setRangeValue(2000);
    setPostsData(posts);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full flex flex-col md:flex-row gap-4 justify-between mb-[24px]'
    >
      <div>
        <label>
          Бездорожье
          <input type="checkbox" checked={offroad} onChange={handleOffroadChange} />
        </label>
      </div>
      <div>
        <label>
          Место:
          <select value={tourismType} onChange={handleTourismTypeChange}>
            <option value="">Все</option>
            <option value="sea">Море</option>
            <option value="mounts">Горы</option>
            <option value="city">Города</option>
            <option value="countryside">Деревня и природа</option>
            <option value="forest">Лес</option>
            <option value="north">Север</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Расстояние (км):
          <input type="range" min={50} max={2000} step={50} value={rangeValue} onChange={handleDistanceChange} />
          {distance} km
        </label>
      </div>
      <div>
        <label>
          Расстояние (км):
          <input type="number" min={50} max={2000} step={50} value={rangeValue} onChange={handleDistanceChange} />
          {distance} km
        </label>
      </div>
      <button
        type="submit"
        className='bg-gray-500 rounded-md text-white p-2 hover:bg-gray-600 transition-all duration-200'
      >
        Сбросить фильтры
      </button>
    </form>
  );
};

export default FiltersForm;
