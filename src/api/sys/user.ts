import { defHttp } from '@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '#/axios';

enum Api {
  Login = '/api/v1/login',
  Logout = 'api/v1/logout',
  GetUserInfo = '/api/v1/getinfo',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
  GetCaptcha = '/api/v1/captcha',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
      isTransformResponse: false,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.post({ url: Api.Logout });
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}

export function getCaptcha() {
  return defHttp.get(
    { url: Api.GetCaptcha },
    {
      isReturnNativeResponse: true,
    },
  );
}
