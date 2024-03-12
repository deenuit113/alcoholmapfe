import * as yup from 'yup';

// 이메일 정규표현식
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

export const loginSchema = yup.object({
  email: yup
    .string()
    .required('이메일을 입력하세요.')
    .matches(emailRegex, '올바른 이메일 형식이 아닙니다.')
    .email('올바른 이메일 형식이 아닙니다.'),
  password: yup
    .string()
    .required('비밀번호를 입력하세요.'),
});