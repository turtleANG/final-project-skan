import logo from '../../assets/images/logo_white.svg'
import css from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.wrapper}>
        <div className={css.logo}>
          <img src={logo} alt="СКАН" />
        </div>
        <div className={css.contacts}>
          <p>г. Москва, Цветной б-р, 40<br />
            +7 495 771 21 11<br />
            <a href='mailto:info@skan.ru'>info@skan.ru</a></p>
          <p className={css.copy}>Copyright. 2022</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;