// LoginForm.tsx
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
    shouldFocusError: true,
    shouldUnregister: true,
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    // 로그인 처리 로직 추가
    console.log(data);
  };
  console.log("rerendering")

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email:</label>
        <input
          type="text"
          {...register('email', {
            required: '이메일을 입력하세요.',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
              message: '올바른 이메일 형식이 아닙니다.',
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          {...register('password', {
            required: '비밀번호를 입력하세요.',
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <button type="submit">로그인</button>
      </div>
    </form>
  );
};

export default LoginForm;