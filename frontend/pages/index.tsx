import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const onClickMoveToLogin = () => {
        router.push("../login")
  }
  const onClickMoveToSignup = () => {
    router.push("../signup")
}
  return (
    <>
      <main className={styles.main}>
          <p>
            안녕하세요, 그린보틀입니다.
          </p>
          <button onClick={onClickMoveToLogin}>로그인</button>
          <button onClick={onClickMoveToSignup}>회원가입</button>
      </main>
    </>
  )
}