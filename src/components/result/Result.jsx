import Button from '../button/Button'
import { addNewPublications } from '../storage/actions'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { connect } from 'react-redux'
import ResponsiveTable from "../responsive-table/ResponsiveTable"
import ResultDocumentList from '../resultDocumentList/ResultDocumentList'
import css from './Result.module.scss'

const Result = (props) => {
  const { accessToken, histograms, publicationsIds, publications } = props
  const dispatch = useDispatch()

  const optionsRequest = {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
  };

  function getNewPublications(ids) {
    const maxLength = ids.length;
    let counter = (maxLength - publications.length < 10) ? Number(maxLength - publications.length) : 10;
    const displayedPublications = publications.length ?? 0;
    const requestIds = [];
    for (let i = displayedPublications; i < displayedPublications + counter; i++) {
      requestIds.push(ids[i])
    }
    return axios.post('https://gateway.scan-interfax.ru/api/v1/documents', {
      "ids": requestIds
    }
      , optionsRequest)
  }

  function showMore() {
    getNewPublications(publicationsIds)
      .then(result => {
        const publications = result.data.map((item) => {
          return {
            date: item.ok.issueDate,
            url: item.ok.url,
            sourceName: item.ok.source.name,
            title: item.ok.title.text,
            content: item.ok.content.markup,
            isTechNews: item.ok.attributes.isTechNews,
            isAnnouncement: item.ok.attributes.isAnnouncement,
            isDigest: item.ok.attributes.isDigest,
            wordCount: item.ok.attributes.wordCount,
          }
        })
        dispatch(addNewPublications(publications))
      })
  }

  return (
    <>
      <section className={css.jumbotron}>
        <div className={css.jumbotron__text}>
          <h1 className={css.mainTitle}>Ищем. Скоро будут результаты</h1>
          <p>Поиск может занять некоторое время, просим сохранять терпение.</p>
        </div>
        <div className={css.jumbotron__image}>
          <img src="/images/result.svg" alt="" className={css.imgFluid} />
        </div>
      </section>
      {histograms.length > 0 ?
        <section className={css.total}>
          <h2 className={css.subTitle}>Общая сводка</h2>
          <p className={css.total__subText}>Найдено 4 221 вариантов</p>
          <ResponsiveTable />
        </section>
        : null}
      {publications.length > 0 ?
        <section className={css.listBlock}>
          <h2 className={css.subTitle}>Список документов</h2>
          <ResultDocumentList />
          {(publicationsIds.length === publications.length) ? null :
            <div className={css.showMore} onClick={showMore}>
              <Button type={'button'} title={'Показать больше'} subClass={'main'} />
            </div>
          }
        </section>
        : null}
    </>
  );
}

export default connect(
  state => ({
    accessToken: state.user.info.accessToken,
    histograms: state.searchingResults.histograms,
    publicationsIds: state.searchingResults.publicationsIds,
    publications: state.searchingResults.publications
  })
)(Result);