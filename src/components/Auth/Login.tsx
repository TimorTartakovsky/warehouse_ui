import React, { Dispatch } from 'react';
import {
  Grid, Container, Input, InputLabel, InputAdornment, Typography,
  Card, CardContent, Button, FormControl,
} from '@material-ui/core';
import logo from '../../assets/images/illustrations/login.svg';
import EmailIcon from '@material-ui/icons/MailOutlineTwoTone';
import LockIcon from '@material-ui/icons/LockTwoTone';
import { connect } from 'react-redux';
import { LOGIN_ACTIONS, IActionPayload } from '../../actions'
import { RootState } from '../../store';
import { withCookies, Cookies } from 'react-cookie';
import { COOKIE_TOKEN_NAME } from '../../api/HttpService';
import { RouteChildrenProps } from 'react-router';

export type LoginState = {
  password: string;
  token: string;
  isTokenExist: boolean;
  isTokenValid: boolean;
}

export interface LoginProps extends RouteChildrenProps {
  username?: string;
  isWaiting?: boolean;
  isTokenExist?: boolean;
  isLoginSucceeded?: boolean; 
  cookies: Cookies;
  login: (u: string, p: string, h: any) => void;
  token: (t: string) => void;
  setUserName: (u: string) => void; 
}

class LoginPage extends React.Component<LoginProps, LoginState> {

    public state = {
      password: '',
      token: '',
      isTokenExist: false,
      isTokenValid: false,
    }  

    private setPassword = (v: string): void => {
      const password: string = v;
      this.setState((p: any) => ({
        ...p,
        password,
      }))
    }

    private async login(): Promise<void> {
      const { username, cookies, isLoginSucceeded } = this.props;
      const { password } = this.state;
      if (!username) {
        // show exception
        return;
      }
      if (!password) {
        // show exception
        return;
      }
      const { history } = this.props;
      this.props.login(username, password, history);
    }

    public componentDidMount() {
      const { cookies, isTokenExist } = this.props;
      const token = cookies.get(COOKIE_TOKEN_NAME)
      if (token || isTokenExist) {
        this.setState(p => ({
          ...p,
          token,
          isTokenExist: true,
          isTokenValid: true,
        }))
      }
    }

    private setToken(token: string) {
      const length = token.length;
      if (length && length === 6) {
        this.setState(p => ({
          ...p,
          token: token.toUpperCase(),
          isTokenValid: true,
        }));
      } else {
        this.setState(p => ({
          ...p,
          isTokenValid: false,
        }));
      }
    }

    private async sendToken() {
      await this.props.token(this.state.token);
      const { cookies, isTokenExist } = this.props;
      console.log('cookies: ', cookies)
      console.log('isTokenExist: ', isTokenExist)
      const isLogin = cookies.get(COOKIE_TOKEN_NAME) || isTokenExist;
      this.setState(p => ({
        ...p,
        isTokenValid: isLogin,
        isTokenExist: isLogin,
      }));
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
                            lg={3}
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
                            lg={6}
                            className="d-flex flex-column align-items-center">
                            <span className="w-100 text-center text-md-center pb-4">
                              <Typography style={{ paddingTop: '15px', paddingBottom: '15px' }} variant="h4" color="primary">
                                WELCOME TO WAREHOUSE
                              </Typography>
                            </span>
                            <Card className="m-0 w-100 p-0 border-0">
                              <CardContent className="p-3">
                                {
                                  (this.state.isTokenExist || this.props.isTokenExist) ? (
                                    <form className="px-5">
                                      <div className="mb-3">
                                        <FormControl fullWidth className="w-100">
                                          <InputLabel htmlFor="input-with-icon-adornment">
                                            Login
                                          </InputLabel>
                                          <Input
                                            fullWidth
                                            type="email"
                                            id="input-with-icon-adornment"
                                            value={this.props.username}
                                            onChange={e => this.props.setUserName(e.target.value)}
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
                                      <div style={{ marginTop: '10%' }} className="text-center mb-3 mt-3">
                                        <Button
                                          color="primary"
                                          variant="contained"
                                          disabled={this.props.isWaiting}
                                          size="large"
                                          onClick={() => this.login()}
                                          className="my-2">
                                          Sign in
                                        </Button>
                                      </div>
                                    </form>
                                  ) : null
                                }
                                {
                                  (!this.state.isTokenExist && !this.props.isTokenExist) ? (
                                    <form className="px-5">
                                      <div className="mb-3">
                                        <FormControl fullWidth className="w-100">
                                          <InputLabel htmlFor="input-with-token">
                                            Token
                                          </InputLabel>
                                          <Input
                                            fullWidth
                                            type="text"
                                            id="input-with-token"
                                            onChange={e => this.setToken(e.target.value)}
                                            startAdornment={
                                              <InputAdornment position="start">
                                                {/* <EmailIcon /> */}
                                              </InputAdornment>
                                            }
                                          />
                                        </FormControl>
                                      </div>
                                      <div style={{ marginTop: '10%' }} className="text-center mb-3 mt-3">
                                        <Button
                                          color="primary"
                                          variant="contained"
                                          disabled={!this.state.isTokenValid}
                                          size="large"
                                          onClick={() => this.sendToken()}
                                          className="my-2">
                                          Add Token
                                        </Button>
                                      </div>
                                    </form>
                                  ) : null
                                }
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

const mapStateToProps = (state: RootState) => {
  return {
    username: state.login.username || '',
    isWaiting: state.login.isWaiting,
    isLoginSucceeded: state.login.isLoginSucceeded,
    isTokenExist: state.login.isTokenExist,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<IActionPayload>) => ({
  login: (username: string, password: string, history: History): void => {
    dispatch(LOGIN_ACTIONS.loginBasicRequest({
      username, password, history,
    }))
  },
  token: (token: string): void => {
    dispatch(LOGIN_ACTIONS.tokenBasicRequest(token))
  },
  setUserName: (username: string): void => { dispatch(LOGIN_ACTIONS.setUserName(username)); },
}) 

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(LoginPage));