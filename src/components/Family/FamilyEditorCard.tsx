import React, { useEffect, useState } from 'react'
import useGetFamily from '../../api/Family/useGetFamily'
import useUpsertFamily, { ErrorResponse, SuccessResponse } from '../../api/Family/useUpsertFamily'
import useGetUser from '../../api/User/useGetUser'
import useFamilyValidation from '../../configs/ValidationRules/useFamilyValidation'
import Button from '../../CustomComponents/Buttons/Button'
import CancelSubmitButtons from '../../CustomComponents/Buttons/CancelSubmitButtons'
import Card from '../../CustomComponents/Card/Card'
import CardHeader from '../../CustomComponents/Card/card-header'
import ConditionalRender from '../../CustomComponents/conditional-render'
import Input from '../../CustomComponents/Inputs/Input'
import useAuthUser from '../../hooks/useAuthUser'
import useFormHelpers from '../../hooks/useFormHelpers'
import { FormChangeType } from '../../types/FormChangeType'
import useUpsertUser from '../../api/User/useUpsertUser'

type InputType = {
  name: string
  family_id?: number | null
}

const FamilyEditorCard = () => {
  const { authUser, updateAuthLocalStorage } = useAuthUser()
  const { family, getFamily } = useGetFamily(authUser?.api_token, authUser?.family_id)
  const [isEditing, setIsEditing] = useState(false)
  const { input, handleChange, setInput, touched, handleOnBlur } = useFormHelpers<InputType>({
    name: family?.name,
    family_id: null,
  })
  const { upsertUser } = useUpsertUser()
  const { upsertFamily } = useUpsertFamily()
  const { getUser } = useGetUser()

  useEffect(() => {
    if (!!authUser?.family_id) setInput({ name: family?.name })
  }, [family])

  const { validations, isDisabled } = useFamilyValidation(input, touched)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const familyId = !!authUser?.family_id ? authUser?.family_id : null

    upsertFamily(authUser?.api_token, input, familyId)?.then((data) => {
      if (familyId === null) {
        getUser(authUser?.api_token, authUser?.id).then((user) => {
          updateAuthLocalStorage('familyId', user?.family_id)
        })
      } else {
        getFamily(authUser?.api_token, data?.id)
      }
      setIsEditing(false)
    })
  }

  const handleJoinFamily = () => {
    upsertUser(authUser?.api_token, { id: authUser?.id, family_id: input?.family_id }).then(
      (user) => updateAuthLocalStorage('familyId', user?.family_id)
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card
        header={
          <CardHeader
            leftSideComponent={
              <ConditionalRender
                condition={isEditing || !authUser?.family_id}
                falseRender={
                  <p className={'text-lg leading-6 font-medium text-gray-900'}>{family?.name}</p>
                }
              >
                <div className='flex flex-col space-y-4'>
                  <Input
                    type='text'
                    label={authUser?.family_id ? 'Family Name' : 'Create Your Family'}
                    placeholder='Family Name'
                    name='name'
                    value={input?.name ?? ''}
                    onChange={(e: FormChangeType) => handleChange(e.target)}
                    handleOnBlur={(e: FormChangeType) => handleOnBlur(e?.target)}
                    touched={touched}
                    errors={validations?.name}
                  />
                  <Input
                    type='number'
                    label={'Join Family'}
                    placeholder='Family ID'
                    name='family_id'
                    value={input?.family_id ?? undefined}
                    onChange={(e: FormChangeType) => handleChange(e.target)}
                    touched={touched}
                  />
                </div>
              </ConditionalRender>
            }
            rightSideContent={
              <ConditionalRender
                condition={isEditing}
                falseRender={
                  <ConditionalRender
                    condition={!!authUser?.family_id}
                    falseRender={
                      <div className='flex flex-col space-y-10'>
                        <Button
                          type='submit'
                          title='Create Family'
                          size='sm'
                          customClassName='mt-4'
                          disabled={isDisabled}
                        />
                        <Button
                          type='button'
                          title='Join Family'
                          size='sm'
                          customClassName='mt-4'
                          onClick={handleJoinFamily}
                        />
                      </div>
                    }
                  >
                    <Button
                      type='button'
                      title='Edit'
                      size='sm'
                      onClick={(e) => {
                        setIsEditing(true)
                        e.preventDefault()
                      }}
                    />
                  </ConditionalRender>
                }
              >
                <CancelSubmitButtons
                  handleCancel={() => setIsEditing(false)}
                  isDisabled={isDisabled}
                  size='sm'
                />
              </ConditionalRender>
            }
          />
        }
      />
    </form>
  )
}

export default FamilyEditorCard
