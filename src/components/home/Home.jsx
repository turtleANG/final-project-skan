import { useMediaQuery } from "react-responsive"
import LinkButton from "../link-button/LinkButton"
import MySwiper from '../mySwiper/MySwiper'
import { BLOKS } from '../app/Tariffs'
import { connect } from 'react-redux'
import TariffItem from "../tariffItem/TariffItem"
import css from './Home.module.scss'


const Home = (props) => {
  const { isAuth, activeTariff } = props;
  const isMobile = useMediaQuery({
    query: "(max-width: 500px)"
  });
  return (
    <>
      <section className={css.jumbotron}>
        <div className={css.jumbotron__text}>
          <h1 className={css.mainTitle}>сервис по поиску<br />публикаций<br />о компании<br />по его ИНН</h1>
          <p className={css.desc}>Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>
          {isAuth ? <LinkButton href={'/search'} title={'Запросить данные'} subClass={'main'} /> : null}
        </div>
        <div className={css.jumbotron__image}>
          <img src="/images/jumbotron.svg" alt="" className={css.imgFluid} />
        </div>
      </section>
      <section className={css.whyWe}>
        <h2 className={css.subTitle}>Почему именно мы</h2>
        <MySwiper />
        {!isMobile ? <img src="/images/why_we.svg" alt="" className={css.imgFluid} /> : <img src="/images/why_we__small.svg" alt="" className={css.imgFluid} />}
      </section>
      <section className={css.tariffs}>
        <h2 className={css.subTitle}>наши тарифы</h2>
        <div className={css.tariffsList}>
          {
            Object.values(BLOKS).map(tariff => {
              return (
                <TariffItem key={tariff} currentTariff={tariff} activeTariff={activeTariff} />
              )
            })
          }
        </div>
      </section>
    </>
  );
}

export default connect(
  state => ({
    isAuth: state.isAuth,
    activeTariff: state.activeTariff
  })
)(Home);