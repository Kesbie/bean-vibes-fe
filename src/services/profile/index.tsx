import axiosInstance from "../axiosInstance";
import { promise } from "../promise";

const END_POINT = '/profile';

const getProfile: App.Services.ProfileService.getProfile = () => {
  return promise<App.Types.User.UserResponse>((axios) => axios.get(END_POINT));
};

const updateProfile: App.Services.ProfileService.updateProfile = (payload: App.Services.ProfileService.UpdateProfilePayload) => {
  return promise<App.Types.User.UserResponse>((axios) => axios.patch(END_POINT, payload));
};

const changePassword: App.Services.ProfileService.changePassword = (payload: App.Services.ProfileService.ChangePasswordPayload) => {
  return promise<void>((axios) => axios.post(`${END_POINT}/change-password`, payload));
};

const forgotPassword: App.Services.ProfileService.forgotPassword = (email: string) => {
  return promise<void>((axios) => axios.post('/auth/forgot-password', { email }));
};

const resetPassword: App.Services.ProfileService.resetPassword = (token: string, password: string) => {
  return promise<void>((axios) => axios.post('/auth/reset-password', { password }, { 
    params: { token } 
  }));
};

const sendVerificationEmail: App.Services.ProfileService.sendVerificationEmail = () => {
  return promise<void>((axios) => axios.post('/auth/send-verification-email'));
};

const verifyEmail: App.Services.ProfileService.verifyEmail = (token: string) => {
  return promise<void>((axios) => axios.post('/auth/verify-email', { token }));
};

const requestModerator: App.Services.ProfileService.requestModerator = (payload: App.Services.ProfileService.RequestModeratorPayload) => {
  return promise<void>((axios) => axios.post('/moderator-requests', payload));
};

export { 
  getProfile, 
  updateProfile, 
  changePassword, 
  forgotPassword, 
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  requestModerator
};
