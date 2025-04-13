import { useState } from 'react'
import { Segment } from '../../components/Segment'
import { trpc } from '../../lib/trpc'
import { useFormik } from 'formik'
import Cookies from 'js-cookie'
import { withZodSchema } from 'formik-validator-zod'
import { zSignInTrpcInput } from '@fullstckk/backend/src/router/signIn/input'
import { Alert, Button, FormItems, Input } from '../../components/ui'
import { useNavigate } from 'react-router-dom'
import { getAllIdeasRoute } from '../../lib/routes'

export const SignIn = () => {
  const navigate = useNavigate()
   const trpcUtils = trpc.useContext()
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const signIn = trpc.signIn.useMutation()
  const formik = useFormik({
    initialValues: {
      nick: '',
      password: '',
    },
    validate: withZodSchema(zSignInTrpcInput),
    onSubmit: async (values) => {
      try {
        const { token } = await signIn.mutateAsync(values)
        Cookies.set('token', token, { expires: 99999 })
        void trpcUtils.invalidate()
        navigate(getAllIdeasRoute())
      } catch (error: any) {
        setSubmittingError(error.message)
      }
    },
  })

  return (
    <Segment title="Sign In">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <FormItems>
          <Input name="nick" label="Nick" formik={formik} />
          <Input label="Password" name="password" type="password" formik={formik} />
          {!formik.isValid && !!formik.submitCount && <Alert color="red">Some fields are invalid</Alert>}
          {submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Sign In</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
