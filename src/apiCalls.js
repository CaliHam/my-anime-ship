const getAllCharacters = async () => {
    const response = await fetch('https://my-anime-ship-api.onrender.com/api/v1/characters')
    if (!response.ok) {
        throw new Error(response.statusText)
      }
      const data = await response.json()
    return data
}




export {
    getAllCharacters,

  }