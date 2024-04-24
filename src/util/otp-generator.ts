import { randomInt } from 'crypto';

const generateOTP = () => {
  const digits = '0123456789';

  let password = '';
  while (password.length < 6) {
    const charIndex = randomInt(0, digits.length);
    password += digits[charIndex];
  }

  return password;
};

export default generateOTP;
