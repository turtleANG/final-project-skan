import { useState } from 'react'
import { login, addUserInfo, addUserFiltersInfo } from '../storage/actions'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import axios from 'axios'
import Button from '../button/Button'
import css from './LoginForm.module.scss'

const LoginForm = (props) => {
  const { accessToken } = props
  const [values, setValues] = useState({
    login: '',
    password: ''
  })
  const [errors, setErrors] = useState({
    login: false,
    password: false,
  })
  const dispatch = useDispatch()
  const colorLogin = errors.login ? '#FF5959' : '#000000'
  const colorPassword = errors.password ? '#FF5959' : '#000000'
  const borderColorLogin = errors.login ? '#FF5959' : '#C7C7C7'
  const borderColorPassword = errors.password ? '#FF5959' : '#C7C7C7'
  const isDisabled = (values.login.length <= 0 || values.password.length <= 0) ? true : false

  const handleChangeInput = e => {
    const fieldName = e.target.name
    setValues({ ...values, [fieldName]: e.target.value })
  }

  // * login

  const optionsRequestLogin = {
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
  }

  function getLogin() {
    return axios.post('https://gateway.scan-interfax.ru/api/v1/account/login', {
      "login": values.login,
      "password": values.password
    }
      , optionsRequestLogin)
  }

  function dispatchLogin(params) {
    dispatch(login())
    dispatch(addUserInfo(params.accessToken, params.expire))
  }

  // * get user info

  function getUserFiltersInfo(params) {
    return axios.get('https://gateway.scan-interfax.ru/api/v1/account/info', {
      headers: {
        'Authorization': 'Bearer ' + params.accessToken,
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
  }

  function dispatchUserFiltersInfo(params) {
    dispatch(addUserFiltersInfo(params.eventFiltersInfo.usedCompanyCount, params.eventFiltersInfo.companyLimit))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getLogin()
      .then(result => {
        dispatchLogin(result.data)
        return getUserFiltersInfo(result.data)
      })
      .then(result => {
        dispatchUserFiltersInfo(result.data)
      })
      .catch(error => setErrors({...errors, login: true, password: true}));
  }

  return (
    <div className={css.formBlock}>
      <div className={css.header}>
        <h2 className={`${css.headerItem} ${css.active}`}>Войти</h2>
        <h2 className={css.headerItem}>Зарегистрироваться</h2>
      </div>
      <form className={css.form} action="" onSubmit={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="login" className={css.label}>Логин или номер телефона:</label>
          <input id='login' type="text" className={css.input} name='login' onChange={handleChangeInput} style={{ borderColor: borderColorLogin, color: colorLogin }} />
          {errors.login ? <p className={css.errorMsg}>Введите корректные данные</p> : null}
        </div>
        <div className={css.formGroup}>
          <label htmlFor="password" className={css.label}>Пароль:</label>
          <input id='password' type="password" className={css.input} name='password' onChange={handleChangeInput} style={{ borderColor: borderColorPassword, color: colorPassword }} />
          {errors.password ? <p className={css.errorMsg}>Неправильный пароль</p> : null}
        </div>
        <Button subClass={'main'} type={'submit'} title={'Войти'} color={'azure'} isDisabled={isDisabled} />
        <a href="#" className={css.restore}>Восстановить пароль</a>
      </form>
      <div className={css.loginVia}>
        <h4 className={css.loginViaTitle}>Войти через:</h4>
        <div className={css.loginViaList}>
          <div className={css.loginViaItem}>
            <img src="/images/google_logo.svg" alt="google" />
          </div>
          <div className={css.loginViaItem}>
            <img src="/images/facebook_logo.svg" alt="facebook" />
          </div>
          <div className={css.loginViaItem}>
            <img src="/images/yandex_logo.svg" alt="yandex" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(
  state => ({
    accessToken: state.user.info.accessToken
  })
)(LoginForm);