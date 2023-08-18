import React from 'react';
import {Formik} from 'formik';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Grid,
  Input,
  Paper,
  Stack,
  Typography,
  Pagination,
} from '@mui/material';
import {DataLayout} from 'react-flowstate';
import sampleSize from 'lodash.samplesize';
import toastr from 'toastr';

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
const SIZE = 2;
const fetchSuccess = () =>
  new Promise(resolve =>
    setTimeout(() => resolve(sampleSize(REACT_LIBS, SIZE)), 1000)
  );
const fetchError = () =>
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error('Failed to fetch data')), 1000)
  );

export default function SuperExample() {
  return (
    <Formik
      initialValues={{
        shadowReload: false,
        preserveDataOnError: false,
        throwErrorOnNextFetch: false,
        throwErrorViaToastAlert: false,
        supportSearch: false,
        searchKeyword: '',
      }}
    >
      {props => (
        <Stack spacing={3}>
          <Paper elevation={1} sx={{padding: 3}}>
            <form>
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="h6" gutterBottom>
                    DataLayout options
                  </Typography>
                  <FormGroup>
                    <FormControlLabel
                      name="shadowReload"
                      control={
                        <Checkbox
                          onChange={props.handleChange}
                          value={props.values.shadowReload}
                        />
                      }
                      label="Shadow reload"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      name="preserveDataOnError"
                      control={
                        <Checkbox
                          onChange={props.handleChange}
                          value={props.values.preserveDataOnError}
                        />
                      }
                      label="Preserve data on error"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      name="throwErrorViaToastAlert"
                      control={
                        <Checkbox
                          onChange={props.handleChange}
                          value={props.values.throwErrorViaToastAlert}
                        />
                      }
                      label="Throw error via toast alert"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" gutterBottom>
                    Misc
                  </Typography>
                  <FormGroup>
                    <FormControlLabel
                      name="throwErrorOnNextFetch"
                      control={
                        <Checkbox
                          onChange={props.handleChange}
                          value={props.values.throwErrorOnNextFetch}
                        />
                      }
                      label="Throw error on next fetch"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      name="supportSearch"
                      control={
                        <Checkbox
                          onChange={props.handleChange}
                          value={props.values.supportSearch}
                        />
                      }
                      label="Support search"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            </form>
          </Paper>
          <Paper elevation={1} sx={{padding: 3}}>
            <Typography variant="h6" gutterBottom>
              React libraries
            </Typography>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              sx={{mb: 3}}
            >
              {props.values.supportSearch ? (
                <Input
                  name="searchKeyword"
                  onChange={props.handleChange}
                  placeholder="react, router, ..."
                />
              ) : <div />}
              <Pagination count={10} color="primary"/>
            </Grid>
            <DataLayout
              debounceDelay={props.values.supportSearch ? 1000 : 0}
              dependencies={
                props.values.supportSearch ? [props.values.searchKeyword] : []
              }
              shadowReload={props.values.shadowReload}
              preserveDataOnError={props.values.preserveDataOnError}
              dataSource={
                props.values.throwErrorOnNextFetch ? fetchError : fetchSuccess
              }
              loadingIndicator={() => (
                <Box sx={{mt: 1, display: 'flex', justifyContent: 'center'}}>
                  <CircularProgress/>
                </Box>
              )}
              onError={err => {
                if (props.values.throwErrorViaToastAlert) {
                  toastr.error(err.message);
                }
              }}
              errorFallback={(e, {reload}) => (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {e.message}
                  <Button
                    onClick={() => reload()}
                    variant="contained"
                    sx={{ml: 1}}
                    color="error"
                  >
                    Try Again
                  </Button>
                </Alert>
              )}
            >
              {({data, reload}) => (
                <>
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
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{mt: 3, display: 'flex', justifyContent: 'center'}}
                  >
                    <Button onClick={() => reload()} variant="contained">
                      Reload
                    </Button>
                    <Button
                      onClick={() => reload({shadow: true})}
                      variant="contained"
                    >
                      Shadow Reload
                    </Button>
                  </Stack>
                </>
              )}
            </DataLayout>
          </Paper>
        </Stack>
      )}
    </Formik>
  );
}
