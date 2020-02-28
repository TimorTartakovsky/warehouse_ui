import React, { Dispatch, useState } from 'react';
import {
  Grid, Container, Input, InputLabel, InputAdornment, FormControlLabel,
  Checkbox, Card, CardContent, Button, FormControl
} from '@material-ui/core';
import logo from '../../assets/images/login.svg';
import EmailIcon from '@material-ui/icons/MailOutlineTwoTone';
import LockIcon from '@material-ui/icons/LockTwoTone';
import { connect } from 'react-redux';
import { LOGIN_ACTIONS } from '../../actions'
// import * as _ from 'lodash';

class LoginPage extends React.Component<any, any> {

    public state = {
      isChecked: true,
      password: '',
    }  

    public componentDidMount() {
      console.log(this.props);
    }

    private toggleChecked = (): void => {
      this.setState((p: any) => ({
        ...p,
        isChecked: !p.isChecked,
      }))
    }

    private setPassword = (v: string): void => {
      const password: string = v;
      this.setState((p: any) => ({
        ...p,
        password,
      }))
    }

    private login(): void {

    }

    public render() {
      return (
        <>
          <div className="app-wrapper min-vh-100">
            <div className="app-main flex-column">
              <div className="app-content p-0">
                <div className="app-content--inner d-flex align-items-center">
                  <div className="flex-grow-1 w-100 d-flex align-items-center">
                    <div className="bg-composed-wrapper--content py-5">
                      <Container maxWidth="lg">
                        <Grid container spacing={5}>
                          <Grid
                            item
                            xs={12}
                            lg={2}
                            className="d-none d-xl-flex align-items-center">
                            <img
                              style={{ height: '55px', width: '55px'}}
                              alt="warehouse-login-logo"
                              className="w-100 mx-auto d-block img-fluid"
                              src={logo}
                            />
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            lg={8}
                            className="d-flex flex-column align-items-center">
                            <span className="w-100 text-left text-md-center pb-4">
                              <h1 className="display-3 text-xl-left text-center mb-3 font-weight-bold">
                                Welcome To Warehouse
                              </h1>
                              <p className="font-size-lg text-xl-left text-center mb-0 text-black-50">
                                We're glad you're working on your app.
                                Login below to continue.
                              </p>
                            </span>
                            <Card className="m-0 w-100 p-0 border-0">
                              <CardContent className="p-3">
                                <form className="px-5">
                                  <div className="mb-3">
                                    <FormControl fullWidth className="w-100">
                                      <InputLabel htmlFor="input-with-icon-adornment">
                                        Email address
                                      </InputLabel>
                                      <Input
                                        fullWidth
                                        id="input-with-icon-adornment"
                                        value={this.props.username}
                                        onChange={e => { console.log(e.target.value) }}
                                        startAdornment={
                                          <InputAdornment position="start">
                                            <EmailIcon />
                                          </InputAdornment>
                                        }
                                      />
                                    </FormControl>
                                  </div>
                                  <div className="mb-3">
                                    <FormControl fullWidth className="w-100">
                                      <InputLabel htmlFor="standard-adornment-password">
                                        Password
                                      </InputLabel>
                                      <Input
                                        id="standard-adornment-password"
                                        fullWidth
                                        type="password"
                                        value={this.state.password}
                                        onChange={e => this.setPassword(e.target.value)}
                                        startAdornment={
                                          <InputAdornment position="start">
                                            <LockIcon />
                                          </InputAdornment>
                                        }
                                      />
                                    </FormControl>
                                  </div>
                                  <div className="w-100">
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={this.state.isChecked}
                                          onChange={this.toggleChecked}
                                          value="checked1"
                                          color="primary"
                                        />
                                      }
                                      label="Remember me"
                                    />
                                  </div>
                                  <div className="text-center">
                                    <Button
                                      color="primary"
                                      variant="contained"
                                      size="large"
                                      onClick={() => this.login()}
                                      className="my-2">
                                      Sign in
                                    </Button>
                                  </div>
                                </form>
                              </CardContent>
                            </Card>
                          </Grid>
                        </Grid>
                      </Container>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
   
} 

const mapStateToProps = (state: any) => {
  return {
    username: state.login.username || '',
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  login: () => dispatch(LOGIN_ACTIONS.loginBasicRequest),
}) 

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);