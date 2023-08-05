import { Link, Navigate, useParams } from 'react-router-dom'
import './CompatibilityResults.css'
import { postCurrentReport } from '../../apiCalls'
import { useEffect, useState } from 'react'
import { getZodiacIcon } from '../../zodiacIcons/zodiacIcons.js'
import PropTypes from 'prop-types';
import check from './check.png'
import spinner from './spinner.gif'
import PageNotFound from '../PageNotFound/PageNotFound'

const CompatibilityResults = ({user, report, selectedCharacter, savedReports, setSavedReports}) => {
  const [confirmSaved, setConfirmSaved] = useState(false)
  const [previousReport, setPreviousReport] = useState(false)
  const [notFound, setNotFound] = useState(false)
  let { id } = useParams();

  useEffect(() => {
    if (id && savedReports){
      let foundReport = savedReports.find(saved => saved.id === parseInt(id))
      if (!foundReport){
        setNotFound(true)
        return
      }
      const reportData = {
        id: foundReport.id,
        user: foundReport.user,
        report: foundReport.report,
        selectedCharacter: foundReport.selectedCharacter
      }
      setConfirmSaved(true)
      setPreviousReport(reportData)
    }
  }, [id])

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

  const renderReport = (previousReport) => {
    return (
      <section className='whole-report-container'>
        <button className={confirmSaved ? 'save-report disabled' : 'save-report classic-button'} onClick={saveCurrentReport}>Save Results</button>
        {confirmSaved && <img src={check} alt='saved confirmation' className='saved-checkmark'/>}
        <div className='user-report-container'>
          <img src={previousReport ? previousReport.user.icon : user.icon} alt='user icon' className='report-icon'/>
          <div>
            <h3>{previousReport ? previousReport.user.name : user.name} & {previousReport ? previousReport.selectedCharacter.name : selectedCharacter.name}</h3>
            <div className='zodiac-container'>
              <img src={previousReport ? getZodiacIcon(previousReport.user.sign.toLowerCase()) : getZodiacIcon(user.sign.toLowerCase())} alt={previousReport ? previousReport.user.sign : user.sign}/>
              <img src={previousReport ? getZodiacIcon(previousReport.selectedCharacter.zodiac_sign.toLowerCase()) : getZodiacIcon(selectedCharacter.zodiac_sign.toLowerCase())} alt={previousReport ? previousReport.selectedCharacter.zodiac_sign : selectedCharacter.zodiac_sign}/>
            </div>
          </div>
          <img src={previousReport ? previousReport.selectedCharacter.image_url : selectedCharacter.image_url} alt={`${previousReport ? previousReport.selectedCharacter.name : selectedCharacter.name} icon`} className='report-icon'/>
        </div>
        <div className='percentage-container'>
          <p className='report-score'>{previousReport ? previousReport.report.compatibilityScore : report.compatibilityScore}</p>
        </div>
        <article className='result-details-container'>
          <p>{previousReport ? previousReport.report.compatibilityReport : report.compatibilityReport}</p>
          <p>{previousReport ? previousReport.selectedCharacter.name : selectedCharacter.name}, from the hit anime {previousReport ? previousReport.selectedCharacter.anime : selectedCharacter.anime}, enjoys {previousReport ? renderFacts(previousReport.selectedCharacter.likes) : renderFacts(selectedCharacter.likes)}. Their dislikes include {previousReport ? renderFacts(previousReport.selectedCharacter.dislikes) : renderFacts(selectedCharacter.dislikes)}.</p>
          <p><a href={previousReport ? previousReport.selectedCharacter.wiki_page_url : selectedCharacter.wiki_page_url} target="_blank" rel='noreferrer'>Click here</a> to see more info about {previousReport ? previousReport.selectedCharacter.name : selectedCharacter.name}!</p>
          <p className='wiki-warning'><b>Warning:</b> The linked page may contain major spoilers for the {previousReport ? previousReport.selectedCharacter.anime : selectedCharacter.anime} series. Please read at your own risk.</p>
        </article>
      </section>
    )
  }

  const renderPage = () => {
    return (
      <div className='whole-report-wrapper'>
        <h1>Compatibility Results</h1>
        {!report && <img src={spinner} alt='loading spinner' className={previousReport ? 'spinner disabled' : 'spinner'}/>}
        {previousReport ? renderReport(previousReport) : !previousReport && report ? renderReport() : null}
        <Link to='/match'><button className='classic-button'>Make Another Calculation</button></Link>
      </div>
    )
  }

  return (
    <>
    {notFound ? <Navigate replace to="/savedreports" /> : renderPage()}
    </>
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