// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
// Import Swiper styles
import 'swiper/scss'
import 'swiper/scss/navigation'
import SwiperItem from '../swiperItem/SwiperItem'
import WhyWeItems from '../app/WhyWeItems.json'
import css from './MySwiper.scss'

const MySwiper = () => {
  return (
    <>
          <Swiper
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            modules={[Navigation]}
            navigation={true}
            
          >
            {
              WhyWeItems.map(item => {
                return (
                  <SwiperSlide key={item.id}>
                    <SwiperItem item={item} />
                  </SwiperSlide>
                )
              })
            }
          </Swiper>
    </>
  );
}

export default MySwiper;