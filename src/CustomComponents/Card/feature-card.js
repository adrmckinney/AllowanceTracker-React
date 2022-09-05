// @flow

type Props = {
  feature: Object,
  children: Node,
}

const FeatureCard = ({ feature, children }: Props) => {
  return (
    <>
      <div className='pt-6'>
        <div className='flow-root rounded-lg bg-gray-50 px-6 pb-8'>
          <div className='-mt-6'>
            <div className='flex justify-center'>
              <span className='inline-flex items-center justify-center rounded-md bg-gradient-to-r from-sky-400 to-sky-600 p-3 shadow-lg'>
                {feature.icon}
              </span>
            </div>
            <div className='flex justify-center'>
              <h3 className='mt-8 text-lg font-medium tracking-tight text-gray-900'>
                {feature.name}
              </h3>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default FeatureCard
