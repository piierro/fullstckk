import { Link } from 'react-router-dom';
import css from './index.module.scss'
import cn from 'classnames'

export const Button = ({ children, loading = false }: { children: React.ReactNode; loading?: boolean }) => {
  return (
    <button className={cn({ [css.button]: true, [css.disabled]: loading })} type="submit" disabled={loading}>
      {loading ? 'Submitting...' : children}
    </button>
  )
}

export const LinkButton = ({ children, to}: {children: React.ReactNode; to: string}) => {
  return (
    <Link className={cn({ [css.button]: true})} type='submit' to={to}>
      {children}
    </Link>
  )
}