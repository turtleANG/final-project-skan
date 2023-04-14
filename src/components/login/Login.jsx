import { useMediaQuery } from "react-responsive"
import LoginForm from '../login-form/LoginForm'
import css from './Login.module.scss'

const Login = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 992px)"
  });
  
  return (
    <>
      <section className={css.authorization}>
        <div className={css.authorization__text}>
          <h1 className={css.mainTitle}>Для оформления подписки<br />на тариф, необходимо<br />авторизоваться.</h1>
          {!isMobile ? <img src="/images/authorization.svg" alt="" className={css.imgFluid} /> : null}
        </div>
        <div className={css.authorization__form}>
          <LoginForm />
        </div>
        {isMobile ? <img src="/images/authorization.svg" alt="" className={css.imgFluid} /> : null}
      </section>
    </>
  );
}

export default Login;