'use client'
import { useRef, ReactElement, useState, } from 'react';

// ? Importing the necessary infrastructure from the @react-google-maps/api library. An important aspect is to use the LoadScriptNext component, and not just LoadScript, since it is optimized for SR and SSG.
// ? Импортируем необходимую инфраструктуру из библиотеки @react-google-maps/api. Важный аспект - нужно использовать компонент LoadScriptNext, а не просто LoadScript, так как он оптимизирован для SSR и SSG.
import { GoogleMap, Marker, MarkerClusterer, LoadScriptNext } from '@react-google-maps/api';

import { posts, Post } from '../postsData';
import D2_small from '@/public/D2_small.png';
import image from '@/public/image.png';
import ActivePost from './activePost';

type GoogleMapsInstance = google.maps.Map;

// ? Describing the styles of the map container.
// ? Описываем стили контейнера карты.
const containerStyle = {
  width: '100%',
  height: '80vh',
  zIndex: 1,
}

// ? Coordinate typing. Coordinates are an object with two fields: lat and lng, the value of each is a number.
// ? Типизация координат. Координаты - это объект с двумя полями: lat и lng, значением каждого из которых является число.
export interface Coordinates {
  lat: number,
  lng: number,
}

// ? Coordinates of the center of the map
// ? Координаты центра карты
export const center: Coordinates = {
  lat: 55.755811,
  lng: 37.617617,
};

export type MapComponentProps = {
  postsData: Post[],
  setPostsData: React.Dispatch<React.SetStateAction<Post[]>>,
}

const MapComponent = ({postsData, setPostsData}: MapComponentProps): ReactElement => {
  // ? Creating a ref of the map.
  // ? Создаем реф карты.
  const mapRef = useRef<GoogleMapsInstance | null>(null);

  // ? In this method, we save GoogleMapsInstance class to the ref, then when rendering, we will pass it to the map in 'onLoad' prop
  // ? В этом методе сохраняем в реф инстанс класса GoogleMaps, потом при рендеринге передадим его в проп onLoad карты
  const handleMapLoad = (mapInstance: GoogleMapsInstance): void => {
    mapRef.current = mapInstance;
  }

  const [activePost, setActivePost] = useState<Post | null>(null);

  const handleMarkerClick = (event: google.maps.MapMouseEvent, post: Post): void => { 
    setActivePost(post);
  }

  const handleMapClick = (): void => { 
    if (activePost) setActivePost(null);
  }

  return (
    <div className="flex justify-center w-full m-auto sm:mt-[-20px] md:mt-0 hover:cursor-default">
      <LoadScriptNext googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={8}
          onLoad={handleMapLoad}
          onClick={handleMapClick}
        >
          <MarkerClusterer >
            {(clusterer) => (
              <>
                {postsData.map((marker, index) => {
                  if (marker !== null) {
                    return (
                      <Marker
                        key={index}
                        position={marker.coordinates}
                        onClick={(event) => handleMarkerClick(event, marker)}
                        icon={{
                          url: image.src,
                          scaledSize: new google.maps.Size(30, 30),
                        }}
                        clusterer={clusterer}
                        />
                )}
                  return null;
                })}
              </>
            )}
          </MarkerClusterer>
        </GoogleMap>
      </LoadScriptNext >
      {activePost && <ActivePost post={activePost} setPost={setActivePost} />}
    </div>
  );
}

export default MapComponent;

// 'use client'
// import { useRef, ReactElement, useState, } from 'react';

// // ? Importing the necessary infrastructure from the @react-google-maps/api library. An important aspect is to use the LoadScriptNext component, and not just LoadScript, since it is optimized for SR and SSG.
// // ? Импортируем необходимую инфраструктуру из библиотеки @react-google-maps/api. Важный аспект - нужно использовать компонент LoadScriptNext, а не просто LoadScript, так как он оптимизирован для SSR и SSG.
// import { GoogleMap, Marker, MarkerClusterer, LoadScriptNext } from '@react-google-maps/api';

// import { posts, Post } from '../postsData';
// import image from '@/public/image.png'; // Ensure this is the correct path
// import ActivePost from './activePost';

// type GoogleMapsInstance = google.maps.Map;

// // ? Describing the styles of the map container.
// // ? Описываем стили контейнера карты.
// const containerStyle = {
//   width: '100%',
//   height: '600px',
//   zIndex: 1,
// }

// // ? Coordinate typing. Coordinates are an object with two fields: lat and lng, the value of each is a number.
// // ? Типизация координат. Координаты - это объект с двумя полями: lat и lng, значением каждого из которых является число.
// export interface Coordinates {
//   lat: number,
//   lng: number,
// }

// // ? Coordinates of the center of the map
// // ? Координаты центра карты
// export const center: Coordinates = {
//   lat: 55.755811,
//   lng: 37.617617,
// };

// export type MapComponentProps = {
//   postsData: Post[],
//   setPostsData: React.Dispatch<React.SetStateAction<Post[]>>,
// }

// const MapComponent = (): ReactElement => {
//   // ? Creating a ref of the map.
//   // ? Создаем реф карты.
//   const mapRef = useRef<GoogleMapsInstance | null>(null);

//   // ? In this method, we save GoogleMapsInstance class to the ref, then when rendering, we will pass it to the map in 'onLoad' prop
//   // ? В этом методе сохраняем в реф инстанс класса GoogleMaps, потом при рендеринге передадим его в проп onLoad карты
//   const handleMapLoad = (mapInstance: GoogleMapsInstance): void => {
//     mapRef.current = mapInstance;
//   }

//   const [activePost, setActivePost] = useState<Post | null>(null);

//   const handleMarkerClick = (event: google.maps.MapMouseEvent, post: Post): void => { 
//     setActivePost(post);
//   }

//   const handleMapClick = (): void => { 
//     if (activePost) setActivePost(null);
//   }

//   return (
//     <div className="flex justify-center w-full m-auto sm:mt-[-20px] md:mt-0 hover:cursor-default">
//       <LoadScriptNext googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={center}
//           zoom={8}
//           onLoad={handleMapLoad}
//           onClick={handleMapClick}
//         >
//           {posts.map((marker, index) => {
//             if (marker !== null) {
//               return (
//                 <Marker
//                   key={index}
//                   position={marker.coordinates}
//                   onClick={(event) => handleMarkerClick(event, marker)}
//                   icon={{
//                     url: image.src,
//                     scaledSize: typeof google !== 'undefined' ? new google.maps.Size(30, 30) : undefined,
//                   }}
//                 />
//               )
//             }
//             return null;
//           })}
//         </GoogleMap>
//       </LoadScriptNext >
//       {activePost && <ActivePost post={activePost} setPost={setActivePost} />}
//     </div>
//   );
// }

// export default MapComponent;