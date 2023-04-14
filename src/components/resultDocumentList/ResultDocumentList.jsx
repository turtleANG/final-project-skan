import LinkButton from "../link-button/LinkButton"
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import css from './ResultDocumentList.module.scss'

const ResultDocumentItem = (props) => {
  const { publications } = props

  return (
    <>
        <div className={css.list}>
          {publications.map(item => {
            return <div className={css.listItem} key={`${item.title}+${item.date}+${item.sourceName}`}>
              <div>
                <ul className={css.listItem__head}>
                  <li className={css.date}>{new Date(item.date).toLocaleString('ru-RU', { year: 'numeric', month: 'numeric', day: 'numeric' })}</li>
                  <li>
                    <Link to={`${item.url}`} className={css.link}>
                      {item.sourceName}
                    </Link>
                  </li>
                </ul>
              </div>
              <h4 className={css.listItem__title}>{item.title}</h4>
              {item.isTechNews ? (<div className={css.listItem__type}>Технические новости</div>) : null}
              {item.isAnnouncement ? (<div className={css.listItem__type}>Анонсы и события</div>) : null}
              {item.isDigest ? (<div className={css.listItem__type}>Сводки новостей</div>) : null}
              <div className={css.listItem__image}>
                {/* <img src="https://storage.scan-interfax.ru/images/1%3A0JPQqdGM0JNWCdCzf2Jt0LHQotGV0ZUh0ZbRlBXCt0Je0JHQruKAnDcUXkZQ0YvQscKn0KjQlsKu0K%2FSkdGXfOKAsF3QkjrRnCRmGCFFBybQoNGL0ZMhEFkC4oCYaNC9a9GO0KFYwqwOeNGO0JdUDGzihKJXTNC%2B0ZzRinE%3D\" alt="" className={css.imgFluid} /> */}
              </div>
              <div className={css.listItem__content} dangerouslySetInnerHTML={{ __html: item.content }}>
              </div>
              <div className={css.listItem__footer}>
                <LinkButton href={`${item.url}`} title={'Читать в источнике'} subClass={'light-blue'} />
                <p className={css.wordCount}>{item.wordCount} слов(а)</p>
              </div>
            </div>
          })}
        </div>
    </>
  );
}

export default connect(
  state => ({
    publications: state.searchingResults.publications
  })
)(ResultDocumentItem);