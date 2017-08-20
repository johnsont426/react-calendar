import React from 'react'
import { container, title, slogan } from './styles.css'

class HomeContainer extends React.Component {
  render () {
    return (
      <div className={container}>
        <p className={title}>{'React Calendar'}</p>
        <p className={slogan}>{'Beautiful calendar'}</p>
      </div>
    )
  }
}
export default HomeContainer