import { useState } from 'react';
import { Link } from 'react-router-dom'
import LinkButton from '../link-button/LinkButton'
import { connect } from 'react-redux'
import { logout } from '../storage/actions'
import { useMediaQuery } from "react-responsive"
import { useDispatch, useSelector } from 'react-redux'
import logo_color from '../../assets/images/logo_color.svg'
import logo_white from '../../assets/images/logo_white.svg'
import avatar from '../../assets/images/avatar.svg'
import burgerIcon from '../../assets/images/burger_icon.svg'
import closeIcon from '../../assets/images/close_icon.svg'
import css from './Header.module.scss'

const Header = (props) => {
  const { isAuth, eventFiltersInfo } = props;
  const [nav, setNav] = useState(false);
  const dispatch = useDispatch()
  const isMobile = useMediaQuery({
    query: "(max-width: 900px)"
  });

  const handleLogoutClick = () => {
    dispatch(logout())
  }

  return (
    <>
      <header className={css.header}>
        <div className={css.wrapper}>
          <div className={css.logo}>
            <img src={nav ? logo_white : logo_color} alt="СКАН" />
          </div>
          <nav className={nav ? `${css.navBlock} ${css.active}` : `${css.navBlock}`}>
            <ul className={css.nav}>
              <li className={css.navItem} onClick={() => setNav(false)}>
                <Link to='/'>Главная</Link>
              </li>
              <li className={css.navItem} onClick={() => setNav(false)}>
                <a href='#'>Тарифы</a>
              </li>
              <li className={css.navItem} onClick={() => setNav(false)}>
                <a href='#'>FAQ</a>
              </li>
            </ul>
            {(isMobile) ? <>
              {isAuth ? <div className={css.userInfo} onClick={() => setNav(false)}>
                <p className={css.userName}>Алексей А.</p>
                <p className={`${css.greyText} ${css.logout}`} onClick={handleLogoutClick}>Выйти</p>
              </div>
                : <>
                  <div className={css.reg}><a href='#'>Зарегистрироваться</a></div>
                  <div className={css.loginButton} onClick={() => setNav(!nav)}>
                    <LinkButton href={'/login'} title={'Войти'} subClass={'light-blue'} />
                  </div>
                </>}
            </>
              : null}
          </nav>
          <div className={css.account}>
            {isAuth ?
              <>
                <div className={css.info}>
                  <p className={css.greyText}>Использовано компаний <span className={`${css.infoCount} ${css.green}`}>{eventFiltersInfo.usedCompanyCount}</span></p>
                  <p className={css.greyText}>Лимит по компаниям <span className={css.infoCount}>{eventFiltersInfo.companyLimit}</span></p>
                </div>
                {isMobile ? null :
                  <div className={css.userInfo}>
                    <div>
                      <p className={css.userName}>Алексей А.</p>
                      <p className={`${css.greyText} ${css.logout}`} onClick={handleLogoutClick}>Выйти</p>
                    </div>
                    <div className={css.avatar}>
                      <img src={avatar} alt="avatar" />
                    </div>
                  </div>
                }
              </> : <>
                {isMobile ? null : <>
                  <div className={css.reg}><a href='#'>Зарегистрироваться</a></div>
                  <LinkButton href={'/login'} title={'Войти'} subClass={'light-blue'} />
                </>}
              </>
            }
          </div>
          <div onClick={() => setNav(!nav)} className={css.mobile_btn}>
            {nav ? <img src={closeIcon} alt="close" /> : <img src={burgerIcon} alt="menu" />}
          </div>
        </div>
      </header>

    </>
  );
}

export default connect(
  state => ({
    eventFiltersInfo: state.user.eventFiltersInfo,
    isAuth: state.isAuth
  })
)(Header);