import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import css from './LinkButton.module.scss'

let cx = classNames.bind(css);

const LinkButton = (props) => {
  const { href, title, subClass, isWidth100 } = props;
  let className = cx({
    btn: true,
    [`${subClass}`]: true,
    width100: isWidth100
  })
  
  return (
    <Link to={href} className={className}>
      {title}
    </Link>
  );
}

export default LinkButton;