import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => ({ toggleVisibility }))

  return (
    <div>
      {!visible // show only button if not visible
        ? <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        : <div>
            {props.children}
            <button onClick={toggleVisibility}>cancel</button>
          </div>
      }
    </div>
  )
})

export default Togglable