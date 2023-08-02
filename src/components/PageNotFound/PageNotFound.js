import './PageNotFound.css'
import pageNotFound from './pagenotfound.svg'

const PageNotFound = () => {
  return (
    <img src={pageNotFound} alt='404 Error: Page Not Found' className='error'/>
  )
}

export default PageNotFound