import classNames from 'classnames/bind'
import css from './Button.module.scss'

let cx = classNames.bind(css);

const Button = (props) => {
  const { type, title, isDisabled, width100, subClass } = props;
  const inlineStyle = (width100) ? '100%' : 'auto'
  let className = cx('btn', `${subClass}`)
  return (
    <button className={className} type={type} disabled={isDisabled} style={{width: inlineStyle}} >{title}</button>
  );
}

export default Button;