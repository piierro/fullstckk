import { FormikProps } from 'formik'
import css from './index.module.scss'
import cn from 'classnames'

export const Input = ({
  label,
  name,
  formik,
  maxWidth,
  type = 'text',
}: {
  label?: string
  name: string
  formik: FormikProps<any>
  maxWidth?: number
  type?: 'text' | 'password'
}) => {
  const value = formik.values[name]
  const error = formik.errors[name] as string | undefined
  const touched = formik.touched[name]
  const invalid = !!touched && !!error
  const disabled = formik.isSubmitting

  return (
    <div className={cn({ [css.field]: true, [css.disabled]: disabled })}>
      <label className={css.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={cn({ [css.input]: true, [css.invalid]: invalid })}
        onChange={(e) => {
          void formik.setFieldValue(name, e.target.value)
        }}
        onBlur={() => {
          void formik.setFieldTouched(name)
        }}
        value={value}
        name={name}
        id={name}
        disabled={disabled}
        style={{ maxWidth }}
        type={type}
      />
      {invalid && <div className={css.error}>{error}</div>}
    </div>
  )
}
