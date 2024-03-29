'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Chip } from '@mui/material';
import Link from 'next/link';

const App = () => {
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://43.202.133.160:8000/api/article/?pageNumber=${currentPage}`);
        setData(response.data.data);
        setPageCount(response.data.page_count);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPageData = () => {
    return data.map((item) => (
      <TableRow key={item.a_id}>
        <TableCell>
          <Link href={`/business-notice/${item.a_id}`} className='hover:underline'>
            {item.a_title}
          </Link>
        </TableCell>
        <TableCell>{new Date(item.date_begin).toLocaleDateString()}</TableCell>
        <TableCell>{new Date(item.date_end).toLocaleDateString()}</TableCell>
        <TableCell>{item.organization}</TableCell>
        <TableCell>
          <Chip label={item.tag} style={{ backgroundColor: getTagColor(item.tag), color: '#fff' }} />
        </TableCell>
        <TableCell>{item.hit_count}</TableCell>
        <TableCell>{item.like_count}</TableCell>
      </TableRow>
    ));
  };

  const getTagColor = (tag) => {
    let color;
    switch (tag) {
      case '창업교육':
        color = '#64b5f6'; // 진한 파란색
        break;
      case '사업화':
        color = '#81c784'; // 진한 초록색
        break;
      case '시설ㆍ공간ㆍ보육':
        color = '#ffb74d'; // 진한 주황색
        break;
      case '멘토링ㆍ컨설팅ㆍ교육':
        color = '#e57373'; // 진한 붉은색
        break;
      case '행사ㆍ네트워크':
        color = '#9575cd'; // 진한 보라색
        break;
      default:
        color = '#757575'; // 진한 회색
        break;
    }
    return color;
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>제목</TableCell>
              <TableCell>시작일</TableCell>
              <TableCell>종료일</TableCell>
              <TableCell>기관</TableCell>
              <TableCell>태그</TableCell>
              <TableCell>조회수</TableCell>
              <TableCell>좋아요 수</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getPageData()}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {[...Array(pageCount)].map((_, index) => (
          <Button key={index} onClick={() => handlePageChange(index + 1)}>
             {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default App;
