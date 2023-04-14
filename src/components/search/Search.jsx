import SearchForm from "../search-form/SearchForm"
import css from './Search.module.scss'

const Search = () => {
  return (
    <>
      <section className={css.search}>
        <div className={css.search__text}>
          <h1 className={css.mainTitle}>Найдите необходимые<br />данные в пару кликов.</h1>
          <p>Задайте параметры поиска.<br />
            Чем больше заполните, тем точнее поиск</p>
        </div>
        <div className={css.search__block}>
          <div className={css.search__form}>
            <SearchForm />
          </div>
          <img src="/images/find.svg" alt="" className={css.imgFluid} />
        </div>
      </section>
    </>
  );
}

export default Search;