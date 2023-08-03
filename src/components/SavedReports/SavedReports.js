import { useEffect } from 'react'
import './SavedReports.css'
import { getSavedReports } from '../../apiCalls'
import { Link } from 'react-router-dom'
import x from './x.png'

const SavedReports = ({savedReports, setSavedReports}) => {

	useEffect(() => {
    getSavedReports().then(allReports => setSavedReports(allReports))
    .catch(err => console.log('all saved error:', err))
  }, [])

	const renderReports = () => {
		return savedReports.map(report => {
			return (
				<div key={report.id} id={report.id} className='saved-report'>
					<img src={x} alt='delete report' className='delete-btn'/>
					<p>{report.user.name} and {report.selectedMan.name}</p>
					<p className='saved-report-score'>{report.report.compatibilityScore}</p>
				</div>
			)
		})
	}

  return (
		<div className='saved-report-wrapper'>
			<h1>Saved Reports</h1>
			<section className='saved-report-container'>
				{!savedReports.length ? <p>Make a calculation and save the report to view it here!</p> : renderReports()}
			</section>
			<Link to='/match'><button className='classic-button'>Make Another Calculation</button></Link>
		</div>
  )
}

export default SavedReports