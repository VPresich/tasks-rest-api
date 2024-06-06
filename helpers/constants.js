export const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PHONE_PATTERN = /^\(\d{3}\) \d{3}-\d{4}$/;
export const NAME_PATTERN =
  /^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|`~\-\s]{2,32}$/;

export const CLOUD_STORAGE = 'https://storage.cloud.google.com/';
export const DEF_THEME = 'light';

const def_avatar = 'defavatar' + DEF_THEME.toLowerCase() + '1x.jpg';
export const AVATAR_SIZE_1 = 68;
export const PATH_DEF_AVATAR_CGS = `${CLOUD_STORAGE}${process.env.GOOGLE_BUCKET_NAME}/avatars/${def_avatar}`;

export const PATH_DEF_VIOLET_AVATAR =
  'https://res.cloudinary.com/dirtbd4yk/image/upload/v1717687718/def-avatar-violet_1x_f2b0ft.jpg';

export const PATH_DEF_LIGHT_AVATAR =
  'https://res.cloudinary.com/dirtbd4yk/image/upload/v1717687717/def-avatar-light_1x_fkwy6u.jpg';

export const PATH_DEF_BLACK_AVATAR =
  'https://res.cloudinary.com/dirtbd4yk/image/upload/v1717687719/def-avatar-dark_1x_mg7mpo.jpg';
