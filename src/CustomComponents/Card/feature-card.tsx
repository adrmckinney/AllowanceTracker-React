import LinkButton from '../Buttons/LinkButton'

type Props = {
  icon: React.ReactNode
  title: String
  component: React.ReactNode
  linkPath: string
}

const FeatureCard = ({ icon, title, component, linkPath }: Props) => {
  return (
    <>
      <div className='pt-6'>
        <div className='flow-root rounded-lg bg-gray-50 px-6 pb-8'>
          <div className='-mt-6'>
            <div className='flex justify-center'>
              <span className='inline-flex items-center justify-center rounded-md bg-gradient-to-r from-sky-400 to-sky-600 p-3 shadow-lg'>
                {icon}
              </span>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <h3 className='mt-8 text-lg font-medium tracking-tight text-gray-900'>{title}</h3>
              <LinkButton title='View All' to={linkPath} />
            </div>
            <div className='mt-8 space-y-3'>{component}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FeatureCard
