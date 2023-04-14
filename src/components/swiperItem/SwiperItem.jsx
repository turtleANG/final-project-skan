import css from './SwiperItem.module.scss'

const SwiperItem = (props) => {
  const { item } = props
  
  return (
    <div className={css.item}>
      <img src={item.img} alt="" />
      <p>{item.description}</p>
    </div>
  );
}

export default SwiperItem;