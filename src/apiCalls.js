const getAllCharacters = async () => {
  const response = await fetch('https://my-anime-ship-api.onrender.com/api/v1/characters')
  if (!response.ok) {
    throw new Error(response.statusText)
  }
    const animeMen = await response.json()
  return animeMen
}

const getCharacter = async (id) => {
  const response = await fetch(`https://my-anime-ship-api.onrender.com/api/v1/characters/${id}`)
  if (!response.ok) {
    throw new Error(response.statusText)
  }
    const man = await response.json()
  return man
}

const getSavedReports = async () => {
  const response = await fetch(`https://my-anime-ship-api.onrender.com/api/v1/savedreports`)
  if (!response.ok) {
    throw new Error(response.statusText)
  }
    const man = await response.json()
  return man
}

const fetchZodiacSign = async (month, day) => {
  const response = await fetch(`https://my-anime-ship-api.onrender.com/api/v1/zodiac`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({month, day})
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const sign = await response.json()
  return sign
}

const postSynastry = async (month1, day1, month2, day2) => {
  const response = await fetch(`https://my-anime-ship-api.onrender.com/api/v1/synastry`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({month1, day1, month2, day2})
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const report = await response.json()
  return report
}

const postCurrentReport = async ({id, user, report, selectedCharacter}) => {
  const response = await fetch(`https://my-anime-ship-api.onrender.com/api/v1/savedreports`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({id, user, report, selectedCharacter})
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const allReports = await response.json()
  return allReports
}

const deleteSavedReport = async (id) => {
  const response = await fetch(`https://my-anime-ship-api.onrender.com/api/v1/savedreports/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const allReports = await response.json()
  return allReports
}

export {
  getAllCharacters,
  getCharacter,
  getSavedReports,
  fetchZodiacSign,
  postSynastry,
  postCurrentReport,
  deleteSavedReport
}