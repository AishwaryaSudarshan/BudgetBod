import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
//import { useHistory } from 'react-router-dom';


function MasonryImageList() {
    //const history = useHistory();
  
    const itemData = [
        {
          img: 'lemons.jpg', // Example path to the locally downloaded image
          title: 'lemons',
        },
        {
          img: 'shoes.jpg',
          title: 'shoes',
        },
        {
          img: 'scenary.jpg',
          title: 'BUDGETBOD',
        },
        {
          img: 'avacado.jpg',
          title: 'avacado',
        },
        {
          img: 'woman.jpg',
          title: 'woman',
        },
      ];
  
    return (
    <Box sx={{
      width: '100%', // Take up 100% of the width
      height: '100vh', // Take up 100% of the viewport height
      overflowY: 'scroll',
    }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
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
    <div style={{
      position: 'absolute',
      top: '40%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      //backgroundColor: 'rgba(0, 0, 0, 0.5)',
      color: 'white',
      fontSize: '64px',
      fontFamily: 'Inter, sans-serif', // Using Inter as the font family 
      fontWeight: '800', // Making the text extra bold
      whiteSpace: 'nowrap', // Keeping the text on one line
    }}>
      {item.title}
    </div>
    <div style={{
      position: 'absolute',
      top: '47%', // Adjust the vertical position as needed
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: 'white',
      fontSize: '14px', // Adjust the font size as needed
      fontFamily: 'Inter, sans-serif', // Using Inter as the font family
      whiteSpace: 'nowrap', // Keeping the text on one line
    }}>
      Track your fitness and calories all in one place.
    </div>
    <div style={{
      position: 'absolute',
      top: '60%', // Adjust the vertical position as needed
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'orange', // Adjust the color as needed
      padding: '10px 20px', // Adjust the padding as needed
      borderRadius: '5px', // Adjust the border radius as needed
      cursor: 'pointer', // Show pointer cursor on hover
    }}>
      {/* <button 
        style={{ color: 'white', border: 'none', background: 'transparent', fontSize: '16px', fontFamily: 'Inter, sans-serif' }}
        onClick={() => {
            history.push('./pages/Home.'); 
          }}
        >
          Go to Home
        </button> */}
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

