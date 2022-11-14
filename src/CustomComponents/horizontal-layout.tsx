interface Props {
  children: React.ReactNode
  as?: any
  flex?: object
  flex1?: object
  flexDir?: object
  verticalPosition?: object
  horizontalPosition?: object
  classNames?: string | []
  styles?: object
}

const HorizontalLayout = ({
  children,
  as: CustomTag = 'div',
  flex = { mbl: 'hidden', sm: 'flex', md: '', lg: '', xl: '' },
  flex1 = { mbl: '', sm: 'flex-1', md: '', lg: '', xl: '' },
  flexDir = { mbl: '', sm: 'row', md: '', lg: '', xl: '' },
  verticalPosition = { mbl: '', sm: 'center', md: '', lg: '', xl: '' },
  horizontalPosition = { mbl: '', sm: 'start', md: '', lg: '', xl: '' },
  classNames = '',
  styles = {},
}: Props) => {
  return (
    <CustomTag
      className={Styles.layout(
        flex,
        flex1,
        flexDir,
        verticalPosition,
        horizontalPosition,
        classNames
      )}
      style={{ ...styles }}
    >
      {children}
    </CustomTag>
  )
}

export default HorizontalLayout

const Styles = {
  layout: (
    flex: object,
    flex1: object,
    flexDir: object,
    verticalPosition: object,
    horizontalPosition: object,
    classNames: string | []
  ) =>
    [
      flex['mbl' as keyof typeof flex],
      flex1['mbl' as keyof typeof flex],
      `flex-${flexDir['mbl' as keyof typeof flex]}`,
      `items-${verticalPosition['mbl' as keyof typeof flex]}`,
      `justify-${horizontalPosition['mbl' as keyof typeof flex]}`,

      `sm:${flex['sm' as keyof typeof flex]}`,
      `sm:${flex1['sm' as keyof typeof flex]}`,
      `sm:flex-${flexDir['sm' as keyof typeof flex]}`,
      `sm:items-${verticalPosition['sm' as keyof typeof flex]}`,
      `sm:justify-${horizontalPosition['sm' as keyof typeof flex]}`,

      `md:${flex['md' as keyof typeof flex]}`,
      `md:${flex1['md' as keyof typeof flex]}`,
      `md:flex-${flexDir['md' as keyof typeof flex]}`,
      `md:items-${verticalPosition['md' as keyof typeof flex]}`,
      `md:justify-${horizontalPosition['md' as keyof typeof flex]}`,

      `lg:${flex['lg' as keyof typeof flex]}`,
      `lg:${flex1['lg' as keyof typeof flex]}`,
      `lg:flex-${flexDir['lg' as keyof typeof flex]}`,
      `lg:items-${verticalPosition['lg' as keyof typeof flex]}`,
      `lg:justify-${horizontalPosition['lg' as keyof typeof flex]}`,

      `xl:${flex['xl' as keyof typeof flex]}`,
      `xl:${flex1['xl' as keyof typeof flex]}`,
      `xl:flex-${flexDir['xl' as keyof typeof flex]}`,
      `xl:items-${verticalPosition['xl' as keyof typeof flex]}`,
      `xl:justify-${horizontalPosition['xl' as keyof typeof flex]}`,

      classNames,
    ].join(' '),
}
