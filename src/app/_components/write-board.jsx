import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function WritePostPage() {
  const handleSubmit = () => {
    // 글쓰기 버튼이 클릭되었을 때의 동작
    console.log('글이 성공적으로 작성되었습니다.');
  };

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12} md={8}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h5" gutterBottom>
            글쓰기
          </Typography>
            <TextField
              label="제목"
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="내용"
              fullWidth
              margin="normal"
              variant="outlined"
              multiline
              rows={10}
            />
            {/* 글쓰기 버튼 */}
            <Button type="submit" color="primary">
              글쓰기
            </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}
