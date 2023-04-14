import { useRef, useState } from 'react'
import FocusTrap from 'focus-trap-react'
import { DayPicker, Row } from 'react-day-picker'
import { differenceInCalendarDays } from 'date-fns'
import { usePopper } from 'react-popper'
import { format, isAfter, isBefore, isValid, parse } from 'date-fns'
import { ru } from 'date-fns/locale'
import 'react-day-picker/dist/style.css'
import css from './DatePicker.module.scss'

export default function DatePicker(props) {
  const { isError, values, setValues } = props
  const borderColor = isError ? '#FF5959' : '#C7C7C7'
  const [isPopperOpen, setIsPopperOpen] = useState(false)
  const [rangeDate, setRangeDate] = useState({
    from: '',
    to: ''
  })

  const popperRef = useRef(null);
  const [popperElement, setPopperElement] = useState(
    null
  );

  const popper = usePopper(popperRef.current, popperElement, {
    placement: 'bottom-start'
  });

  function toIsoString(date) {
    var tzo = -date.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num) {
            return (num < 10 ? '0' : '') + num;
        };
  
    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds()) +
        dif + pad(Math.floor(Math.abs(tzo) / 60)) +
        ':' + pad(Math.abs(tzo) % 60);
  }

  const handleCloseClick = () => {
    setIsPopperOpen(false);
    setValues({ ...values, rangeFrom: toIsoString(rangeDate.from), rangeTo: toIsoString(rangeDate.to) });
  };

  const handleInputClick = () => {
    setIsPopperOpen(true);
  };

  const [selectedRange, setSelectedRange] = useState();
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');

  const handleFromChange = (e) => {
    setFromValue(e.target.value);
    const date = parse(e.target.value, 'y-MM-dd', new Date());
    if (!isValid(date)) {
      return setSelectedRange({ from: undefined, to: undefined });
    }
    if (selectedRange.to && isAfter(date, selectedRange.to)) {
      setSelectedRange({ from: selectedRange.to, to: date });
    } else {
      setSelectedRange({ from: date, to: selectedRange.to });
    }
  };

  const handleToChange = (e) => {
    setToValue(e.target.value);
    const date = parse(e.target.value, 'y-MM-dd', new Date());

    if (!isValid(date)) {
      return setSelectedRange({ from: selectedRange.from, to: undefined });
    }
    if (selectedRange.from && isBefore(date, selectedRange.from)) {
      setSelectedRange({ from: date, to: selectedRange.from });
    } else {
      setSelectedRange({ from: selectedRange.from, to: date });
    }
  };

  const handleRangeSelect = (range) => {
    setSelectedRange(range);
    setRangeDate({ ...rangeDate, from: range.from, to: range.to });
    if (range.from) {
      setFromValue(format(range.from, 'dd.MM.y'));
    } else {
      setFromValue('');
    }
    if (range.to) {
      setToValue(format(range.to, 'dd.MM.y'));
    } else {
      setToValue('');
    }
  };

  function isFutureDate(date) {
    return differenceInCalendarDays(date, new Date()) > 0;
  }

  return (
    <>
      <div ref={popperRef} className={css.DatePicker}>
        <input
          style={{ borderColor: borderColor }}
          placeholder="дд.мм.гггг"
          value={fromValue}
          onClick={handleInputClick}
          onChange={handleFromChange}
          className={css.input}
        />

        <input
          style={{ borderColor: borderColor }}
          placeholder="дд.мм.гггг"
          value={toValue}
          onClick={handleInputClick}
          onChange={handleToChange}
          className={css.input}
        />
      </div>
      {isPopperOpen && (
        <FocusTrap
          active
        >
          <div
            tabIndex={-1}
            style={popper.styles.popper}
            className={css.calendar}
            {...popper.attributes.popper}
            ref={setPopperElement}
            role="dialog"
          >
            <DayPicker
              disabled={isFutureDate}
              initialFocus={isPopperOpen}
              mode="range"
              modifiersClassNames={{
                selected: css.selected,
                today: css.today
              }}
              selected={selectedRange}
              onSelect={handleRangeSelect}
              locale={ru}
              footer={
                <button className={css.close} onClick={handleCloseClick}>Применить</button>
              }
            />
          </div>
        </FocusTrap>
      )}
    </>
  );
}