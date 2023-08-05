import { Link } from 'react-router-dom'
import './CompatibilityResults.css'
import { postCurrentReport } from '../../apiCalls'
import { useState } from 'react'
import { getZodiacIcon } from '../../zodiacIcons/zodiacIcons.js'
import PropTypes from 'prop-types';
import check from './check.png'
import spinner from './spinner.gif'

const CompatibilityResults = ({user, report, selectedCharacter, setSavedReports}) => {

  const [confirmSaved, setConfirmSaved] = useState(false)

  const saveCurrentReport = () => {
    postCurrentReport({id: Date.now(),
    user,
    report,
    selectedCharacter})
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
      } else if(facts.length === 2) {
        return fact.toLowerCase() + ' '
      }
      else {return fact.toLowerCase() + ', '}
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
            <h3>{user.name} & {selectedCharacter.name}</h3>
            <div className='zodiac-container'>
              <img src={getZodiacIcon(user.sign.toLowerCase())} alt={user.sign}/>
              <img src={getZodiacIcon(selectedCharacter.zodiac_sign.toLowerCase())} alt={selectedCharacter.zodiac_sign}/>
            </div>
          </div>
          <img src={selectedCharacter.image_url} alt={`${selectedCharacter.name} icon`} className='report-icon'/>
        </div>
        <div className='percentage-container'>
          <p className='report-score'>{report.compatibilityScore}</p>
        </div>
        <article className='result-details-container'>
          <p>{report.compatibilityReport}</p>
          <p>{selectedCharacter.name}, from the hit anime {selectedCharacter.anime}, enjoys {renderFacts(selectedCharacter.likes)}. Their dislikes include {renderFacts(selectedCharacter.dislikes)}.</p>
          <p><a href={selectedCharacter.wiki_page_url} target="_blank" rel='noreferrer'>Click here</a> to see more info about {selectedCharacter.name}!</p>
          <p className='wiki-warning'><b>Warning:</b> The linked page may contain major spoilers for the {selectedCharacter.anime} series. Please read at your own risk.</p>
        </article>
      </section>
    )
  }

  return (
    <div className='whole-report-wrapper'>
      <h1>Compatibility Results</h1>
      {!report ? <img src={spinner} alt='loading spinner' className='spinner'/> : renderReport()}
      <Link to='/match'><button className='classic-button'>Make Another Calculation</button></Link>
    </div>
  )
}

export default CompatibilityResults;

CompatibilityResults.propTypes = {
	user: PropTypes.shape({
    name: PropTypes.string,
    birthday: PropTypes.string,
    sign: PropTypes.string,
    icon: PropTypes.string
  }),
	report: PropTypes.shape({
    sign1: PropTypes.string,
    sign2: PropTypes.string,
    areCompatible: PropTypes.bool,
    compatibilityScore: PropTypes.string,
    compatibilityReport: PropTypes.string,
  }),
	setSelectedCharacter: PropTypes.func,
	setSavedReports: PropTypes.func,
}