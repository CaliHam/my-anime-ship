const getAllCharacters = async () => {
    const response = await fetch('https://my-anime-ship-api.onrender.com/api/v1/characters')
    if (!response.ok) {
        throw new Error(response.statusText)
      }
      const data = await response.json()
    return data
}

const fetchZodiacSign = async (month, day) => {
    const response = await fetch(`https://my-anime-ship-api.onrender.com/api/v1/zodiac`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(month, day)
    })
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    const data = await response.json()
    return data
}



export {
    getAllCharacters,
    fetchZodiacSign
  }