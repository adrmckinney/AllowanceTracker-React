import * as React from 'react'

interface Props {
  children?: JSX.Element
  falseRender?: JSX.Element
  condition: boolean | (() => boolean)
  isNullRender?: boolean // instead of just rendering one or other render both but set display to none inherit depending on flag
}

const ConditionalRender = ({ children, falseRender, condition, isNullRender }: Props) => {
  const renderHiddenContent = content => {
    return <div style={{ display: 'none' }}>{content}</div>
  }

  const renderShowContent = content => {
    return <>{content}</>
  }

  let showChildren = false
  if (typeof condition === 'function') {
    showChildren = condition()
  } else {
    showChildren = condition
  }

  if (isNullRender) {
    return <>{showChildren ? children : falseRender}</>
  } else {
    if (showChildren) {
      return (
        <>
          {renderShowContent(children)} {renderHiddenContent(falseRender)}
        </>
      )
    } else {
      return (
        <>
          {renderShowContent(falseRender)} {renderHiddenContent(children)}
        </>
      )
    }
  }
}

export default ConditionalRender
