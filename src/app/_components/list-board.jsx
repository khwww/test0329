'use client'

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import TableSortLabel from '@mui/material/TableSortLabel';

function createData(num, name, author, hit, date) {
  return { num, name, author, hit, date };
}

const rows = [
  createData(5, '가다나', '홍길동', 1, '2024-03-07'),
  createData(4, '가다나', '홍길동', 2, '2024-03-07'),
  createData(3, '가다나', '홍길동', 3, '2024-03-07'),
  createData(2, '가다나', '홍길동', 16, '2024-03-07'),
  createData(1, '가다나', '홍길동', 12, '2024-03-07')
];

export default function CommunityBoard() {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">번호</TableCell>
              <TableCell align="left">글제목</TableCell>
              <TableCell align="right">작성자</TableCell>
              <TableCell align="right">조회수</TableCell>
              <TableCell align="right">날짜</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{row.num}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.author}</TableCell>
                <TableCell align="right">{row.hit}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ textAlign: 'right', marginRight: '1rem', marginTop: '1rem' }}>
        <Link href="/community/write">
          <Button
            color="primary"
            startIcon={<AddIcon />}
            style={{ marginBottom: '1rem' }}
          >
            글쓰기
        </Button>
        </Link>
      </div>
    </div>
  );
}
