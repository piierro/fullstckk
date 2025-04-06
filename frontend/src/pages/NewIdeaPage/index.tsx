import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { Segment } from '../../components/Segment'
// import css from './index.module.scss'
import { Alert, Button, FormItems, Input } from '../../components/ui'
import { TextArea } from '../../components/ui'
import { trpc } from '../../lib/trpc'
import { zCreateIdeaTrpcInput } from '@fullstckk/backend/src/router/createIdea/input'
import { useState } from 'react'

export const NewIdea = () => {
  const [succesesMess, setSuccesesMess] = useState(false)
  const [submittingError, setSudmittingError] = useState<string | null>(null)
  const createIdea = trpc.createIdea.useMutation()
  const formik = useFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validate: withZodSchema(zCreateIdeaTrpcInput),
    onSubmit: async (values) => {
      try {
        await createIdea.mutateAsync(values)
        formik.resetForm()
        setSuccesesMess(true)
        setTimeout(() => {
          setSuccesesMess(false)
        }, 3000)
      } catch (error: any) {
        setSudmittingError(error.message)
        setTimeout(() => {
          setSudmittingError(null)
        }, 3000)
      }
    },
  })
  return (
    <Segment title={'New Idea Add'}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <FormItems>
          <Input name="name" label="Name" formik={formik} />
          <Input name="nick" label="Nick" formik={formik} />
          <Input name="description" label="Description" formik={formik} maxWidth={500} />
          <TextArea name="text" label="Text" formik={formik} />

          {!formik.isValid && !!formik.submitCount && <Alert color="red">Some fields are invalid</Alert>}

          {!!submittingError && <Alert color="red">{submittingError}</Alert>}

          {succesesMess && <Alert color="green">Idea created</Alert>}

          <Button loading={formik.isSubmitting}>Create Idea</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
