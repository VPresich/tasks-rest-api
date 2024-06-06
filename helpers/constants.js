export const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PHONE_PATTERN = /^\(\d{3}\) \d{3}-\d{4}$/;
export const NAME_PATTERN =
  /^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|`~\-\s]{2,32}$/;

export const CLOUD_STORAGE = 'https://storage.cloud.google.com/';
export const DEF_THEME = 'light';
const def_avatar = 'defavatar' + DEF_THEME.toLowerCase() + '1x.jpg';
export const AVATAR_SIZE_1 = 68;
export const PATH_DEF_AVATAR = `${CLOUD_STORAGE}${process.env.GOOGLE_BUCKET_NAME}/avatars/${def_avatar}`;
