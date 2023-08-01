import './CharacterList.css'

const CharacterList = ({user, characters}) => {

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
    <main>
        <h2>Pick Your Man</h2>
        <section className='match-container'>
            <aside>
                <div className='user-container'>
                    <p>{user.name}</p>
                    <p>{user.birthday}</p>
                </div>
                <button>Change User</button>
            </aside>
            <div className='all-characters-container'>
                {characters && renderCharacters()}
            </div>
        </section>
    </main>
  )
}

export default CharacterList