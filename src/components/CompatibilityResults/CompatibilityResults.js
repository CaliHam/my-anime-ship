import { Link } from 'react-router-dom'
import './CompatibilityResults.css'
import { postCurrentReport } from '../../apiCalls'

const CompatibilityResults = ({user, report, selectedMan, setSavedReports}) => {

  const saveCurrentReport = () => {
    const currentReport = {
      id: Date.now(),
      user,
      report,
      selectedMan
    }
    postCurrentReport(currentReport)
      .then(allReports => setSavedReports(allReports))
      .catch(err => console.log('ERROR', err))
  }

  const renderReport = () => {
    return (
      <section className='whole-report-container'>
        <div className='user-report-container'>
          <img src={user.icon} alt='user icon' className='report-icon'/>
          <div>
            <h3>{user.name} & {selectedMan.name}</h3>
            <p>{user.sign} & {selectedMan.zodiac_sign}</p>
          </div>
          <img src={selectedMan.image_url} alt={`${selectedMan.name} icon`} className='report-icon'/>
        </div>
        <div className='percentage-container'>
          <p className='report-score'>{report.compatibilityScore}</p>
        </div>
        <article className='result-details-container'>
          <p>{report.compatibilityReport}</p>
          <p>Click here to see more info about {selectedMan.name}!</p>
        </article>
      </section>
    )
  }

  return (
    <div className='whole-report-wrapper'>
      <button className='save-report' onClick={saveCurrentReport}>Save Results</button>
      <h2>Compatibility Results</h2>
      {!report ? <p>Loading...</p> : renderReport()}
      <Link to='/match'><button>Make Another Calculation</button></Link>
    </div>
  )
}

export default CompatibilityResults