import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useNavigate } from 'react-router-dom';



function MasonryImageList() {
  const itemData = [
    {
      img: 'lemons.svg', 
      title: 'lemons',
    },
    {
      img: 'shoes.svg',
      title: 'shoes',
    },
    {
      img: 'scenery.svg',
      title: 'BUDGETBOD',
    },
    {
      img: 'avacado.svg',
      title: 'avacado',
    },
    {
      img: 'woman.svg',
      title: 'woman',
    },
  ];

  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100%', height: '100vh' }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.img} className='h-full'>
            <div style={{ position: 'relative' }}>
              <img
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=248&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {item.title === 'BUDGETBOD' && (
                <>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-6xl font-bold whitespace-nowrap z-10">
                    {item.title}
                  </div>
                  <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm whitespace-nowrap z-10">
                    Track your fitness and calories all in one place.
                  </div>
                  <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white px-5 py-2 rounded cursor-pointer z-10">
                    <button
                      className="text-white bg-transparent border-none text-base focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600"
                      onClick={() => navigate('/home')}
                    >
                      Go to Home
                    </button>
                  </div>
                </>
              )}
            </div>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

export default MasonryImageList;
