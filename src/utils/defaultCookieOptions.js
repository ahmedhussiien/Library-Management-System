import Config from '../config.js';

const defaultCookieOptions = {
  httpOnly: true,
  secure: Config.NODE_ENV === 'prod' ? true : false,
  sameSite: Config.NODE_ENV === 'prod' ? true : 'none',
};

export default defaultCookieOptions;
