import * as tariff from '../app/Tariffs'
import LinkButton from '../link-button/LinkButton'
import css from './TariffItem.module.scss'

const TariffItem = (props) => {
  const { currentTariff, activeTariff } = props
  const border = (activeTariff === currentTariff) ? `2px solid ${tariff.COLOR[currentTariff]}` : '0'
  const textColor = (currentTariff === 'business') ? 'white' : 'black'
  
  return (
    <div className={css.item} style={{border: border}}>
      <div className={css.itemHeader} style={{backgroundColor: tariff.COLOR[currentTariff]}}>
        <div style={{color: textColor}}>
          <h3 className={css.title}>{tariff.TITLES[currentTariff]}</h3>
          <p className={css.description}>{tariff.DESCRIPTION[currentTariff]}</p>
        </div>
        <div>
          <img src={tariff.IMAGE[currentTariff]} alt={tariff.TITLES[currentTariff]} className={css.headerImage} />
        </div>
      </div>
      <div className={css.itemBody}>
        {(activeTariff === currentTariff) ? <div className={css.curentTariff}>Текущий тариф</div> : null}
        <div className={css.priceBlock}>
          <p className={css.price}>{tariff.ACTUAL_PRICE[currentTariff]} &#8381; <span className={css.oldPrice}>{tariff.OLD_PRISE[currentTariff]} &#8381;</span></p>
          {tariff.PAYMENT_AMOUNT[currentTariff] ? <p className={css.payment}>или {tariff.PAYMENT_AMOUNT[currentTariff]} &#8381;/мес. при рассрочке на 24 мес.</p> : null}
        </div>
        <div className={css.conteins}>
          <h4 className={css.subTitle}>В тариф входит:</h4>
          <ul className={css.conteinsList}>
            {
              Object.values(tariff.CONTAINS[currentTariff]).map(item => {
                return (
                  <li key={item} className={css.conteinsListItem}>{item}</li>
                )
              })
            }
          </ul>
        </div>
        {(activeTariff === currentTariff) ? 
          <LinkButton subClass={'main-active'} title={'Перейти в личный кабинет'} isWidth100={true} /> 
          : <LinkButton subClass={'main'} title={'Подробнее'} isWidth100={true} />
        }
      </div>
    </div>
  );
}

export default TariffItem;