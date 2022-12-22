import { fontThemes } from '../../configs/global-styles'

type Props = {
  sectionTitle: string
  familySetupCardComponent: React.ReactNode
}

const FamilySetupSection = ({ sectionTitle, familySetupCardComponent }: Props) => {
  return (
    <>
      <div>
        <h2 className={`mt-20 text-center ${fontThemes.subTitle}`}>{sectionTitle}</h2>
      </div>

      {familySetupCardComponent}
    </>
  )
}

export default FamilySetupSection
