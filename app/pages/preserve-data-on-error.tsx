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
import toastr from 'toastr';
import { fetchDataWithRandomError } from '@/fixtures/data';

export default function PreserveDataOnErrorExample() {
  return (
    <Paper elevation={1} sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        React libraries
      </Typography>
      <DataLayout
        preserveDataOnError
        dataSource={fetchDataWithRandomError}
        loadingIndicator={() => (
          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        )}
        onError={err =>
          toastr.error(`${err.message} Old data is displayed instead.`)
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
        {({ data, reload, lastFetchSuccessAt, lastFetchErrorAt }) => (
          <>
            <Grid container spacing={2}>
              {lastFetchSuccessAt < lastFetchErrorAt && (
                <Typography>
                  As error happened, we fallback to previous data snapshot.
                </Typography>
              )}
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
            </Stack>
          </>
        )}
      </DataLayout>
    </Paper>
  );
}
