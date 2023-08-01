import { Link } from 'react-router-dom'
import './CompatibilityResults.css'

const CompatibilityResults = ({user, report, selectedMan}) => {

  const renderReport = () => {
    return (
      <section className='whole-report-wrapper'>
        <div className='user-report-container'>
          <p>{user.name} & {selectedMan.name}</p>
          <p>{user.sign} & {selectedMan.zodiac_sign}</p>
        </div>
        <div className='percentage-container'>
          <h1>{report.compatibilityScore}</h1>
        </div>
        <article className='result-details-container'>
          <p>{report.compatibilityReport}</p>
          <p>Click here to see more info about {selectedMan.name}!</p>
        </article>
      </section>
    )
  }

  return (
    <div>
      <h2>Compatibility Results</h2>
      {!report ? <p>Loading...</p> : renderReport()}
      <Link to='/match'><button>Make Another Calculation</button></Link>
    </div>
  )
}

export default CompatibilityResults