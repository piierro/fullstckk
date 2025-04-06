import css from './index.module.scss'
import cn from 'classnames'

export const Alert = ({ color, children }: { color: 'red' | 'green'; children: React.ReactNode }) => {
  return <div className={cn({ [css.alert]: true, [css[color]]: true })}>{children}</div>
}
