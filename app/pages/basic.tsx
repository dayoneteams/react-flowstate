import React from 'react';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { DataLayout } from 'react-flowstate';
import { fetchDataWithRandomError } from '@/fixtures/data';

export default function BasicExample() {
  return (
    <Paper elevation={1} sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        React libraries
      </Typography>
      <DataLayout
        dataSource={fetchDataWithRandomError}
        loadingIndicator={
          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        }
        errorFallback={(e, { reload }) => (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {e.message}
            <Button
              onClick={() => reload()}
              variant="contained"
              sx={{ ml: 1 }}
              color="error"
            >
              Try Again
            </Button>
          </Alert>
        )}
      >
        {({ data, reload }) => (
          <>
            <Grid container spacing={2}>
              {data.items.map((jsLib, index) => (
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
            <Stack
              direction="row"
              spacing={1}
              sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
            >
              <Button onClick={() => reload()} variant="contained">
                Reload
              </Button>
              <Button
                onClick={() => reload({ shadow: true })}
                variant="contained"
              >
                Shadow Reload
              </Button>
            </Stack>
          </>
        )}
      </DataLayout>
    </Paper>
  );
}
