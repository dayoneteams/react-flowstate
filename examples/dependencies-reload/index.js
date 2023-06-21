import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { DataLayout } from 'react-flowstate';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

const REACT_LIBS = [
  {
    name: 'React Router',
    websiteUrl: 'https://reactrouter.com/',
  },
  {
    name: 'Material-UI',
    websiteUrl: 'https://mui.com/',
  },
  {
    name: 'Next.js',
    websiteUrl: 'https://nextjs.org/',
  },
  {
    name: 'Redux',
    description:
      'A predictable state container for JavaScript apps, providing a centralized store for managing application state.',
    websiteUrl: 'https://redux.js.org/',
  },
  {
    name: 'Axios',
    description:
      'A library for making HTTP requests from JavaScript applications, offering a simple API for sending and receiving data from APIs.',
    websiteUrl: 'https://axios-http.com/',
  },
];

const Basic = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const fetchSuccess = () =>
    new Promise(resolve =>
      setTimeout(
        () =>
          resolve(
            REACT_LIBS.filter(lib =>
              lib.name.match(new RegExp(searchKeyword, 'gi'))
            )
          ),
        1000
      )
    );

  return (
    <Container>
      <Typography variant="h5" textAlign="center" marginBottom={2}>
        Reload on dependency changes
      </Typography>
      <Box>
        <TextField
          label="Type to search, e.g: redux"
          variant="standard"
          value={searchKeyword}
          onChange={e => {
            setSearchKeyword(e.target.value);
          }}
        />
      </Box>
      <DataLayout
        dependencies={[searchKeyword]}
        dataSource={fetchSuccess}
        loadingIndicator={() => (
          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        )}
      >
        {({ data }) => (
          <Paper sx={{ p: 3, mt: 3 }}>
            <Grid container spacing={2}>
              {data.map((jsLib, index) => (
                <Grid key={index} item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {jsLib.name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button href={jsLib.websiteUrl} size="small">
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}
      </DataLayout>
    </Container>
  );
};

ReactDOM.render(<Basic />, document.getElementById('root'));
