import { useEffect } from 'react'
import './SavedReports.css'
import { getSavedReports } from '../../apiCalls'

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
					<p>{report.report.compatibilityScore}</p>
				</div>
			)
		})
	}

  return (
    <section className='saved-report-container'>
			{!savedReports.length ? <p>Loading...</p> : renderReports()}
		</section>
  )
}

export default SavedReports