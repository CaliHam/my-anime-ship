import './CharacterList.css'

const CharacterList = ({characters}) => {

    const renderCharacters = () => {
        return characters.map(man => {
            return (
                <div>
                    <h2>{man.name}</h2>
                    <img src={man.image_url} alt={man.name}/>
                </div>
            )
        })
    }

  return (
    <div>{characters && renderCharacters()}</div>
  )
}

export default CharacterList