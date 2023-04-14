import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { addPublicationsIds, addHistograms, addPublications } from '../storage/actions'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from '../button/Button'
import DatePicker from '../date-picker/DatePicker'
import css from './SearchForm.module.scss'
import axios from 'axios'
import { parse } from 'date-fns'

const SearchForm = (props) => {
  const { accessToken, publicationsIds, publicationsStore } = props
  const navigate = useNavigate();
  const [values, setValues] = useState({
    isDisabled: true,
    inn: '',
    count: 0,
    tone: 'any',
    rangeFrom: '',
    rangeTo: '',
    maxFullness: true,
    inBusinessNews: true,
    onlyMainRole: true,
    onlyWithRiskFactors: false,
    includeTechNews: false,
    includeAnnouncements: true,
    includeDigests: false
  })
  const [errors, setErrors] = useState({
    inn: false,
    innErrorMsg: '',
    count: false,
    range: false
  })

  const dispatch = useDispatch()
  const borderColorINN = errors.inn ? '#FF5959' : '#C7C7C7'
  const errorColorINN = errors.inn ? '#FF5959' : '#000000'
  const borderColorCount = errors.count ? '#FF5959' : '#C7C7C7'
  const errorColorCount = errors.count ? '#FF5959' : '#000000'
  const errorColorRange = errors.range ? '#FF5959' : '#000000'
  const isDisabled = (errors.inn || errors.count || errors.range || values.inn.length <= 0 || (values.count < 1 || values.count > 1000) || values.rangeFrom.length <= 0 || values.rangeTo.length <= 0) ? true : false

  const optionsRequest = {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
  };

  const getRequestParams = () => {
    return {
      "issueDateInterval": {
        "startDate": values.rangeFrom,
        "endDate": values.rangeTo
      },
      "searchContext": {
        "targetSearchEntitiesContext": {
          "targetSearchEntities": [
            {
              "type": "company",
              "sparkId": null,
              "entityId": null,
              "inn": values.inn,
              "maxFullness": values.maxFullness,
              "inBusinessNews": values.inBusinessNews
            }
          ],
          "onlyMainRole": values.onlyMainRole,
          "tonality": values.tone,
          "onlyWithRiskFactors": values.onlyWithRiskFactors,
          "riskFactors": {
            "and": [],
            "or": [],
            "not": []
          },
          "themes": {
            "and": [],
            "or": [],
            "not": []
          }
        },
        "themesFilter": {
          "and": [],
          "or": [],
          "not": []
        }
      },
      "searchArea": {
        "includedSources": [],
        "excludedSources": [],
        "includedSourceGroups": [],
        "excludedSourceGroups": []
      },
      "attributeFilters": {
        "excludeTechNews": !values.includeTechNews,
        "excludeAnnouncements": !values.includeAnnouncements,
        "excludeDigests": !values.includeDigests
      },
      "similarMode": "duplicates",
      "limit": values.count,
      "sortType": "sourceInfluence",
      "sortDirectionType": "desc",
      "intervalType": "month",
      "histogramTypes": [
        "totalDocuments",
        "riskFactors"
      ]
    }
  }

  // * histograms
  function getHistograms(params) {
    return axios.post('https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms', params, optionsRequest)
  }

  function dispatchHistograms(params) {
    const [totalDocuments, riskFactors] = params.data
    const histograms = totalDocuments.data.map((item) => {
      let riskValue = riskFactors.data.find(e => e.date === item.date)
      return { ...item, riskValue: riskValue.value }
    })
    dispatch(addHistograms(histograms))
  }

  // * publications id
  function getPublicationsIds(params) {
    return axios.post('https://gateway.scan-interfax.ru/api/v1/objectsearch', params, optionsRequest)
  }

  // * publications 
  function getPublications(ids) {
    const displayedPublications = publicationsStore.length ?? 0;
    const requestIds = [];
    for (let i = displayedPublications; i < displayedPublications + 10; i++) {
      requestIds.push(ids[i])
    }
    return axios.post('https://gateway.scan-interfax.ru/api/v1/documents', {
      "ids": requestIds
    }
      , optionsRequest)
  }

  function dispatchPublications(params) {
    const publications = params.map((item) => {
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
    dispatch(addPublications(publications))
  }

  const handleChangeInput = e => {
    const fieldName = e.target.name
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    switch (fieldName) {
      case 'inn':
        validateInn(e.target.value);
        break;
      case 'count':
        if (value < 1 || value > 1000) {
          setErrors({ ...errors, count: true });
        } else {
          setValues({ ...values, [fieldName]: value });
          setErrors({ ...errors, count: false });
        }
        break;
      default:
        return setValues({ ...values, [fieldName]: value });
    }
  }

  function validateInn(inn) {
    let result = false;
    if (typeof inn === 'number') {
      inn = inn.toString();
    } else if (typeof inn !== 'string') {
      inn = '';
    }
    if (!inn.length) {
      setErrors({ ...errors, inn: true, innErrorMsg: 'ИНН пуст' });
    } else if (/[^0-9]/.test(inn)) {
      setErrors({ ...errors, inn: true, innErrorMsg: 'ИНН может состоять только из цифр' });
    } else if ([10].indexOf(inn.length) === -1) {
      setErrors({ ...errors, inn: true, innErrorMsg: 'ИНН может состоять только из 10 цифр' });
    } else {
      var checkDigit = function (inn, coefficients) {
        var n = 0;
        for (var i in coefficients) {
          n += coefficients[i] * inn[i];
        }
        return parseInt(n % 11 % 10);
      };
      switch (inn.length) {
        case 10:
          var n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
          if (n10 === parseInt(inn[9])) {
            result = true;
            setValues({ ...values, inn: inn });
            setErrors({ ...errors, inn: false, innErrorMsg: '' })
          }
          break;
      }
      if (!result) {
        setErrors({ ...errors, inn: true, innErrorMsg: 'Неправильное контрольное число' });
      }
    }
    return
  }

  // * here post and dispatch
  const handleSubmit = (e) => {
    e.preventDefault()
    let publicationsIdsLocal = []
    const requestParams = getRequestParams()
    getPublicationsIds(requestParams)
      .then(result => {
        result.data.items.forEach((item) => {
          publicationsIdsLocal.push(item.encodedId)
        })
        dispatch(addPublicationsIds(publicationsIdsLocal))
        return getHistograms(requestParams)
      })
      .then(result => {
        dispatchHistograms(result.data)
        return getPublications(publicationsIdsLocal)
      })
      .then(result => {
        dispatchPublications(result.data)
      })
      .catch(error => console.log(error));
    navigate("/result");
  }

  return (
    <form action="" className={css.formBlock} onSubmit={handleSubmit}>
      <div className={css.formLeftBlock}>
        <div className={css.formGroup}>
          <label htmlFor="INN" className={css.label}>ИНН компании <span style={{ color: errorColorINN }}>*</span></label>
          <input id='INN' type="text" name='inn' onChange={handleChangeInput} className={css.input} style={{ borderColor: borderColorINN, color: errorColorINN }} />
          {errors.inn ? <p className={css.errorMsg}>{errors.innErrorMsg}</p> : null}
        </div>
        <div className={css.formGroup}>
          <label htmlFor="tone" className={css.label}>Тональность</label>
          <select name="tone" id="tone" value={values.tone} onChange={handleChangeInput} className={css.select}>
            <option value="any">любая</option>
            <option value="positive">позитивная</option>
            <option value="negative">негативная</option>
          </select>
        </div>
        <div className={css.formGroup}>
          <label htmlFor="count" className={css.label}>Количество документов в выдаче <span style={{ color: errorColorCount }}>*</span></label>
          <input id='count' type="number" name='count' onChange={handleChangeInput} placeholder='от 1 до 1000' className={css.input} style={{ borderColor: borderColorCount, textAlign: 'center', color: errorColorCount }} />
          {errors.count ? <p className={css.errorMsg}>Обязательное поле</p> : null}
        </div>
        <div className={css.formGroup}>
          <label className={css.label}>Диапазон поиска <span style={{ color: errorColorRange }}>*</span></label>
          <DatePicker isError={errors.range} values={values} setValues={setValues} />
          {errors.range ? <p className={css.errorMsg} style={{ marginTop: 0 }}>Введите корректные данные</p> : null}
        </div>
      </div>
      <div className={css.formRightBlock}>
        <div>
          <div className={css.formGroup}>
            <input id='maxFullness' type="checkbox" name='maxFullness' checked={values.maxFullness} onChange={handleChangeInput} className={css.input} />
            <label htmlFor="maxFullness" className={css.labelCheckbox}>Признак максимальной полноты</label>
          </div>
          <div className={css.formGroup}>
            <input id='inBusinessNews' type="checkbox" name='inBusinessNews' checked={values.inBusinessNews} onChange={handleChangeInput} className={css.input} />
            <label htmlFor="inBusinessNews" className={css.labelCheckbox}>Упоминания в бизнес-контексте</label>
          </div>
          <div className={css.formGroup}>
            <input id='onlyMainRole' type="checkbox" name='onlyMainRole' checked={values.onlyMainRole} onChange={handleChangeInput} className={css.input} />
            <label htmlFor="onlyMainRole" className={css.labelCheckbox}>Главная роль в публикации</label>
          </div>
          <div className={css.formGroup}>
            <input id='onlyWithRiskFactors' type="checkbox" name='onlyWithRiskFactors' checked={values.onlyWithRiskFactors} onChange={handleChangeInput} className={css.input} />
            <label htmlFor="onlyWithRiskFactors" className={css.labelCheckbox}>Публикации только с риск-факторами</label>
          </div>
          <div className={css.formGroup}>
            <input id='includeTechNews' type="checkbox" name='includeTechNews' checked={values.includeTechNews} onChange={handleChangeInput} className={css.input} />
            <label htmlFor="includeTechNews" className={css.labelCheckbox}>Включать технические новости рынков</label>
          </div>
          <div className={css.formGroup}>
            <input id='includeAnnouncements' type="checkbox" name='includeAnnouncements' checked={values.includeAnnouncements} onChange={handleChangeInput} className={css.input} />
            <label htmlFor="includeAnnouncements" className={css.labelCheckbox}>Включать анонсы и календари</label>
          </div>
          <div className={css.formGroup}>
            <input id='includeDigests' type="checkbox" name='includeDigests' checked={values.includeDigests} onChange={handleChangeInput} className={css.input} />
            <label htmlFor="includeDigests" className={css.labelCheckbox}>Включать сводки новостей</label>
          </div>
        </div>
        <Button subClass={'main'} type={'submit'} isDisabled={isDisabled} title={'Поиск'} />
      </div>
      <div className={css.requaredText}>* Обязательные к заполнению поля</div>
    </form>
  );
}

export default connect(
  state => ({
    accessToken: state.user.info.accessToken,
    publicationsIds: state.searchingResults.publicationsIds,
    publicationsStore: state.searchingResults.publications
  })
)(SearchForm);