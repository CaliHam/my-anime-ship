import './CharacterList.css'

const CharacterList = ({characters}) => {

    const renderCharacters = () => {
        return characters.map(man => {
            return (
                <div className="character-container" key={man.id}>
                    <h2>{man.name}</h2>
                    <img src={man.image_url} alt={man.name}/>
                </div>
            )
        })
    }

  return (
    <div className='all-characters-container'>{characters && renderCharacters()}</div>
  )
}

export default CharacterList