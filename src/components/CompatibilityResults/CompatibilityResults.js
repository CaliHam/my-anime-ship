import { Link } from 'react-router-dom'
import './CompatibilityResults.css'
import { postCurrentReport } from '../../apiCalls'
import { useState } from 'react'
import check from './check.png'

const CompatibilityResults = ({user, report, selectedMan, setSavedReports}) => {

  const [confirmSaved, setConfirmSaved] = useState(false)

  const saveCurrentReport = () => {
    postCurrentReport({id: Date.now(),
    user,
    report,
    selectedMan})
      .then(allReports => {
        setSavedReports(allReports)
        setConfirmSaved(true)
      })
      .catch(err => console.log('ERROR', err))
  }

  const renderFacts = (facts) => {
    return facts.map(fact => {
      if (facts.indexOf(fact) === facts.length-1){
        return 'and ' + fact.toLowerCase()
      } else {return fact.toLowerCase() + ', '}
    })
  }

  const renderReport = () => {
    return (
      <section className='whole-report-container'>
        <button className={confirmSaved ? 'save-report disabled' : 'save-report classic-button'} onClick={saveCurrentReport}>Save Results</button>
        {confirmSaved && <img src={check} alt='saved confirmation' className='saved-checkmark'/>}
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
          <p>{selectedMan.name}, from {selectedMan.anime}, enjoys {renderFacts(selectedMan.likes)}. His dislikes include {renderFacts(selectedMan.dislikes)}.</p>
          <p><a href={selectedMan.wiki_page_url}>Click here</a> to see more info about {selectedMan.name}!</p>
        </article>
      </section>
    )
  }

  return (
    <div className='whole-report-wrapper'>
      <h1>Compatibility Results</h1>
      {!report ? <p>Loading...</p> : renderReport()}
      <Link to='/match'><button className='classic-button'>Make Another Calculation</button></Link>
    </div>
  )
}

export default CompatibilityResults