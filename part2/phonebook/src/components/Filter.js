import React from 'react'

const Filter = ({ value, onChange }) => (
  <div>
  filter shown with
    <input type="text" value={value} 
          onChange={onChange} 
    />
  </div>
)

export default Filter