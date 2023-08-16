import React from 'react'

function menu(props) {
  return (
    <div className='dropdown-menu'>
        <ul>
        {   
               props.l.map((item) => {
                return <li className='iteam'>{item}</li>
            })
        }
        </ul>   
     </div>
  )
}

export default menu;
