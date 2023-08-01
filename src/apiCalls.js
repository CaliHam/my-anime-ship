const getAllCharacters = async () => {
  const response = await fetch('http://localhost:3001/api/v1/characters')
  if (!response.ok) {
    throw new Error(response.statusText)
  }
    const data = await response.json()
  return data
}

const fetchZodiacSign = async (month, day) => {
  const response = await fetch(`http://localhost:3001/api/v1/zodiac`, {
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
  const response = await fetch(`http://localhost:3001/api/v1/synastry`, {
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

export {
  getAllCharacters,
  fetchZodiacSign,
  postSynastry
}