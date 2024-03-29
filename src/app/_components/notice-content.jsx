'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Paper, Button, Divider, Box, IconButton, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { styled } from '@mui/system';
import { usePathname } from 'next/navigation';
import { blue } from '@mui/material/colors';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  textAlign: 'center',
}));

const StyledOutlinedButton = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
  '&:hover': {
    backgroundColor: blue[500],
    color: '#fff',
  },
}));

const BusinessNoticePage = () => {
  const pathname = usePathname();
  const lastSlashIndex = pathname.lastIndexOf('/');
  const articleId = pathname.substring(lastSlashIndex + 1);
  const [articleData, setArticleData] = useState(null);
  const [liked, setLiked] = useState(false);
  const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjI5LCJ1c2VybmFtZSI6Imh5dW53b28iLCJlbWFpbCI6ImtodzQ0MjBAbmF2ZXIuY29tIiwicmVnaW9uIjoiYXNkIiwidGVsIjoiYXNkIiwiaWF0IjoxNzExNzEyNDA0LCJleHAiOjE3MTE3OTg4MDR9.Ua8N5SVi-KTGR28Jm5M9nqtYqvjytOOqJ85iVUc6TfA";

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const response = await axios.get(`http://43.202.133.160:8000/api/article/${articleId}`, {
          headers: {
            Authorization: token
          }
        });
        setArticleData(response.data);
        setLiked(response.data.user_likes === "1");
      } catch (error) {
        console.error('Error fetching article data:', error);
      }
    };
  
    if (articleId) {
      fetchArticleData();
    }
  }, [articleId]);

  const handleAttachmentButtonClick = (url) => {
    window.open(`https://www.k-startup.go.kr${url}`, '_blank');
  };

  const handleLikeClick = async () => {
    try {
      if (!liked) {
        await axios.post(`http://43.202.133.160:8000/api/article/${articleId}/like`, null, {
          headers: {
            Authorization: token
          }
        });
      } else {
        await axios.delete(`http://43.202.133.160:8000/api/article/${articleId}/like`, {
          headers: {
            Authorization: token
          }
        });
      }
      setLiked(!liked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <div>
      {articleData && (
        <div>
          <Typography variant="h4">{articleData.a_title}</Typography>
          <Divider sx={{ marginY: 1 }} />
          <StyledPaper>
            {articleData.a_content.info_box && (
              <>
                <Typography variant="h5" gutterBottom><strong>개요</strong></Typography>
                <Divider sx={{ marginY: 1 }} />
                <TableContainer>
                  <Table>
                    <TableBody>
                      {Object.entries(articleData.a_content.info_box).reduce((accumulator, [key, value], index) => {
                        if (index % 2 === 0) {
                          accumulator.push(
                            <TableRow key={index}>
                              <TableCell><strong>{key}: </strong></TableCell>
                              <TableCell>{value}</TableCell>
                            </TableRow>
                          );
                        } else {
                          accumulator[accumulator.length - 1] = (
                            <>
                              {accumulator[accumulator.length - 1]}
                              <TableCell><strong>{key}: </strong></TableCell>
                              <TableCell>{value}</TableCell>
                            </>
                          );
                        }
                        return accumulator;
                      }, [])}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
            <Divider sx={{ marginY: 1 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {articleData.a_content.desc_list.map((descItem, index) => (
                <div key={index}>
                  <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>{descItem.title}</Typography>
                  {descItem.infos.map((infoItem, subIndex) => (
                    <Typography key={subIndex} variant="body1" component="div" style={{ marginBottom: '8px' }}>
                      {Object.entries(infoItem).map(([key, value]) => (
                        <div key={key}>
                          {value}
                        </div>
                      ))}
                    </Typography>
                  ))}
                  <Divider sx={{ marginY: 2 }} />
                </div>
              ))}
            </Box>
          </StyledPaper>
          <StyledPaper>
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 1 }}>첨부파일</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              {articleData.a_content.attachment_list.map((attachment, index) => (
                   <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 1 }}>
                  <StyledOutlinedButton
                    onClick={() => handleAttachmentButtonClick(attachment.url)}
                    color="primary"
                    variant="contained" 
                    disableElevation 
                    size="small" 
                    style={{ borderRadius: '5px' }} 
                  >
                    {attachment.name}
                  </StyledOutlinedButton>
                </Box>
              ))}
            </Box>
          </StyledPaper>
          <StyledPaper>
            <IconButton onClick={handleLikeClick}>
              {liked ? <FavoriteIcon color="error" style={{ fontSize: "5rem" }} /> 
              : <FavoriteBorderIcon style={{ fontSize: "5rem" }} />}
            </IconButton>
            <Typography variant="body2">좋아요</Typography>
          </StyledPaper>
        </div>
      )}
    </div>
  );
};

export default BusinessNoticePage;
