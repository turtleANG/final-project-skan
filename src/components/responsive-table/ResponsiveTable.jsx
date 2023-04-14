import { useMediaQuery } from "react-responsive"
import { connect } from 'react-redux'
import css from './ResponsiveTable.module.scss'

const ResponsiveTable = (props) => {
  const { histograms } = props
  const isMobile = useMediaQuery({
    query: "(max-width: 800px)"
  });

  return (
    <div className={css.responsive}>
      <table cellSpacing="0" className={css.table}>
        <tbody>
          {isMobile ? <>
            <tr style={{ position: 'sticky', top: '-2px' }}>
              <th>Период</th>
              <th>Всего</th>
              <th>Риски</th>
            </tr>
            {histograms.map(item => {
              return <tr key={item.date}>
                <td>{new Date(item.date).toLocaleString('ru-RU', { year: 'numeric', month: 'numeric', day: 'numeric' })}</td>
                <td>{item.value}</td>
                <td>{item.riskValue}</td>
              </tr>
            })}
          </> : <>
            <tr>
              <th>Период</th>
              {histograms.map(item => {
                return <td key={item.date}>{new Date(item.date).toLocaleString('ru-RU', { year: 'numeric', month: 'numeric', day: 'numeric' })}</td>
              })}
            </tr>
            <tr>
              <th>Всего</th>
              {histograms.map(item => {
                return <td key={item.date}>{item.value}</td>
              })}
            </tr>
            <tr>
              <th>Риски</th>
              {histograms.map(item => {
                return <td key={item.date}>{item.riskValue}</td>
              })}
            </tr>
          </>}
        </tbody>
      </table>
    </div>
  );
}

export default connect(
  state => ({
    histograms: state.searchingResults.histograms
  })
)(ResponsiveTable);