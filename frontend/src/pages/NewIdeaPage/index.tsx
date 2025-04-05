import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { Segment } from '../../components/Segment'
// import css from './index.module.scss'
import { Input } from '../../components/ui'
import { TextArea } from '../../components/ui'
import { trpc } from '../../lib/trpc'
import { zCreateIdeaTrpcInput } from '@fullstckk/backend/src/router/createIdea/input'

export const NewIdea = () => {
  const createIdea = trpc.createIdea.useMutation()
  const formik = useFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validate: withZodSchema(
      zCreateIdeaTrpcInput
    ),
    onSubmit: async (values) => {
     await createIdea.mutateAsync(values)
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
        <Input name="name" label="Name" formik={formik} />
        <Input name="nick" label="Nick" formik={formik} />
        <Input name="description" label="Description" formik={formik} />
        <TextArea name="text" label="Text" formik={formik} />
        {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Some fields are invalid</div>}
        <button type="submit">Create Idea</button>
      </form>
    </Segment>
  )
}
