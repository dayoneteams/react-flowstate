import React from 'react';
import { Formik } from 'formik';
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
  LinearProgress,
} from '@mui/material';
import { DataLayout } from 'react-flowstate';
import toastr from 'toastr';
import { fetchData } from '@/fixtures/data';

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
        pageNo: 1,
        pageCount: 0,
        showProgressBarOnShadowLoading: false,
      }}
    >
      {({ values, handleChange, setFieldValue }) => (
        <Stack spacing={3}>
          <Typography variant="h4" textAlign="center">
            Super Example
          </Typography>
          <Typography textAlign="center">
            An all-in-one place for react-flowstate contributors to test all use
            case variants.
          </Typography>
          <Paper elevation={1} sx={{ padding: 3 }}>
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
                          onChange={handleChange}
                          value={values.shadowReload}
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
                          onChange={handleChange}
                          value={values.preserveDataOnError}
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
                          onChange={handleChange}
                          value={values.throwErrorViaToastAlert}
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
                          onChange={handleChange}
                          value={values.throwErrorOnNextFetch}
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
                          onChange={handleChange}
                          value={values.supportSearch}
                        />
                      }
                      label="Support search"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      name="showProgressBarOnShadowLoading"
                      control={
                        <Checkbox
                          onChange={handleChange}
                          value={values.showProgressBarOnShadowLoading}
                        />
                      }
                      label="Show progress bar on shadow loading"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            </form>
          </Paper>
          <DataLayout
            debounceDelay={values.supportSearch ? 1000 : 0}
            dependencies={[values.searchKeyword, values.pageNo]}
            shadowReload={values.shadowReload}
            onData={data => {
              setFieldValue('pageCount', data.pageCount);
            }}
            preserveDataOnError={values.preserveDataOnError}
            dataSource={([searchKeyword, pageNo]) => {
              console.log(searchKeyword, pageNo);
              return values.throwErrorOnNextFetch
                ? fetchError()
                : fetchData({
                    searchKeyword: searchKeyword as string,
                    pageNo: pageNo as number,
                  });
            }}
            loadingIndicator={() => (
              <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
            )}
            onError={err => {
              if (values.throwErrorViaToastAlert) {
                toastr.error(err.message);
              }
            }}
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
            dataFallback={({ data }) => (
              <Grid container spacing={2} mt={1}>
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
            )}
          >
            {({
              data,
              renderAutoFallback,
              isLoadingInShadow,
              reload,
              isLoading,
            }) => (
              <Box>
                {values.showProgressBarOnShadowLoading && isLoadingInShadow && (
                  <LinearProgress />
                )}
                <Paper elevation={1} sx={{ padding: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    React libraries
                  </Typography>
                  <Box>
                    <Stack direction="row" justifyContent="space-between">
                      <Box>
                        {values.supportSearch ? (
                          <Input
                            value={values.searchKeyword}
                            onChange={e => {
                              setFieldValue('searchKeyword', e.target.value);
                              setFieldValue('pageNo', 1);
                            }}
                            placeholder="react, router, ..."
                          />
                        ) : (
                          <div />
                        )}
                      </Box>
                      <Button
                        onClick={() => reload()}
                        variant="contained"
                        disabled={isLoading}
                      >
                        Refresh
                      </Button>
                    </Stack>
                    {renderAutoFallback()}
                    <Stack mt={2} justifyContent="flex-end" direction="row">
                      {values.pageNo && values.pageCount && (
                        <Pagination
                          page={values.pageNo}
                          count={values.pageCount}
                          color="primary"
                          onChange={(e, val) => setFieldValue('pageNo', val)}
                        />
                      )}
                    </Stack>
                  </Box>
                </Paper>
              </Box>
            )}
          </DataLayout>
        </Stack>
      )}
    </Formik>
  );
}
