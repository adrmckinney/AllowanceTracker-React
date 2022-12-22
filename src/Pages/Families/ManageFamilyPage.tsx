import { useNavigate } from 'react-router-dom'
import useGetChoresList from '../../api/Chore/useGetChoresList'
import useGetUsersList from '../../api/User/useGetUsersList'
import AddChoreCard from '../../components/Family/AddChoreCard'
import AddFamilyMemberCard from '../../components/Family/AddFamilyMemberCard'
import FamilyEditorCard from '../../components/Family/FamilyEditorCard'
import { fontThemes } from '../../configs/global-styles'
import Button from '../../CustomComponents/Buttons/Button'
import ConditionalRender from '../../CustomComponents/conditional-render'
import PaddedLayout from '../../CustomComponents/padded-layout'
import useAuthUser from '../../hooks/useAuthUser'
import FamilySetupSection from './FamilySetupSection'

const ManageFamilyPage = () => {
  const { authUser } = useAuthUser()
  const { users } = useGetUsersList(authUser?.api_token)
  const { chores } = useGetChoresList(authUser?.api_token)
  const navigate = useNavigate()

  return (
    <>
      <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md sm:max-w-lg w-full space-y-8'>
          <div>
            <h1 className={`mt-6 mb-10 text-center ${fontThemes.appTitle}`}>Family Settings</h1>
          </div>

          <FamilySetupSection
            sectionTitle={authUser?.family_id ? 'Your Family Name' : 'Create or Join Your Family'}
            familySetupCardComponent={<FamilyEditorCard />}
          />

          <ConditionalRender condition={!!authUser?.family_id}>
            <FamilySetupSection
              sectionTitle={'Family Members'}
              familySetupCardComponent={<AddFamilyMemberCard users={users} />}
            />

            <FamilySetupSection
              sectionTitle='Family Chores'
              familySetupCardComponent={<AddChoreCard chores={chores} />}
            />
          </ConditionalRender>
        </div>
      </div>
      <ConditionalRender condition={!!authUser?.family_id}>
        <PaddedLayout classNames='flex justify-center pb-20'>
          <Button title='Done' size='xl' onClick={() => navigate(`../user/${authUser.id}`)} />
        </PaddedLayout>
      </ConditionalRender>
    </>
  )
}

export default ManageFamilyPage
