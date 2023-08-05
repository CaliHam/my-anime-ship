import { useEffect } from 'react'
import './SavedReports.css'
import { deleteSavedReport, getSavedReports } from '../../apiCalls'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import x from './x.png'
import { getZodiacIcon } from '../../zodiacIcons/zodiacIcons';

const SavedReports = ({savedReports, setSavedReports}) => {

	useEffect(() => {
    getSavedReports().then(allReports => setSavedReports(allReports))
    .catch(err => console.log('all saved error:', err))
  }, [])

	const deleteReport = (id) => {
		deleteSavedReport(id)
			.then(allReports => setSavedReports(allReports))
			.catch(err => console.log('error deleting report:', err))
	}

	const renderReports = () => {
		return savedReports.map(report => {
			return (
				<div key={report.id} id={report.id} className='saved-report'>
					<button className='delete-btn btn' onClick={() => deleteReport(report.id)}><img src={x} alt='delete report' className='delete-btn'/></button>
					<div className='report-details-container'>
						<div className='saved-user-container'>
							<img className='zodiac-icon' src={getZodiacIcon(report.user.sign.toLowerCase())} alt={report.user.sign}/>
							<p>{report.user.name}</p>
							<img className='saved-report-icon' src={report.user.icon} alt={`${report.user.name}'s icon`}/>
						</div>
							<p className='saved-score report-score'>{report.report.compatibilityScore}</p>
						<div className='saved-user-container'>
							<img className='saved-report-icon' src={report.selectedCharacter.image_url} alt={`${report.selectedCharacter.name}'s icon`}/>
							<p>{report.selectedCharacter.name}</p>
							<img className='zodiac-icon' src={getZodiacIcon(report.selectedCharacter.zodiac_sign.toLowerCase())} alt={report.selectedCharacter.zodiac_sign}/>
						</div>
					</div>
					<Link to={`/savedreports/${report.id}`}><button className='classic-button view-report-btn'>View Whole Report</button></Link>
				</div>
			)
		})
	}

  return (
		<div className='saved-report-wrapper'>
			<h1>Saved Reports</h1>
			<section className='saved-report-container'>
				{!savedReports.length ? <h3>Make a calculation and save the report to view it here!</h3> : renderReports()}
			</section>
			<Link to='/match'><button className='classic-button'>Make Another Calculation</button></Link>
		</div>
  )
}

export default SavedReports;

SavedReports.propTypes = {
	savedReports: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		user: PropTypes.shape({
			name: PropTypes.string,
			birthday: PropTypes.string,
			sign: PropTypes.string,
			icon: PropTypes.string,
		}),
		report: PropTypes.shape({
			sign1: PropTypes.string,
			sign2: PropTypes.string,
			areCompatible: PropTypes.bool,
			compatibilityScore: PropTypes.string,
			compatibilityReport: PropTypes.string,
		}),
		selectedCharacter: PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string,
			birthday: PropTypes.string,
			month: PropTypes.number,
			day: PropTypes.number,
			zodiac_sign: PropTypes.string,
			anime: PropTypes.string,
			likes: PropTypes.arrayOf(PropTypes.string),
			dislikes: PropTypes.arrayOf(PropTypes.string),
			image_url: PropTypes.string,
			wiki_page_url: PropTypes.string,
		}),
	})),
	setSavedReports: PropTypes.func,
}