import React from 'react'

export default function InputArea(props) {
  return (
    <div id='inputArea'>
      <input value={props.text} onChange={props.handleChange} type="text" placeholder='Enter your imagination' />
      <button onClick={props.result}><i className='bx bx-up-arrow-alt'></i></button>
    </div>
  )
}
