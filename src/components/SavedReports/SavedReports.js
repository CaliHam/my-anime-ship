import { useEffect } from 'react'
import './SavedReports.css'
import { getSavedReports } from '../../apiCalls'
import { Link } from 'react-router-dom'

const SavedReports = ({savedReports, setSavedReports}) => {

	useEffect(() => {
    getSavedReports().then(allReports => setSavedReports(allReports))
    .catch(err => console.log('all saved error:', err))
  }, [])

	const renderReports = () => {
		return savedReports.map(report => {
			return (
				<div key={report.id} id={report.id} className='saved-report'>
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
				{!savedReports.length ? <p>Loading...</p> : renderReports()}
			</section>
			<Link to='/match'><button className='classic-button'>Make Another Calculation</button></Link>
		</div>
  )
}

export default SavedReports