var winner = false

const ImagenCarta=[
    {"src":"/Fotos/albedo.jpg", match : false, volteada: false},
    {"src":"/Fotos/kazuha.jpg", match : false, volteada: false},
    {"src":"/Fotos/diluc.jpg", match : false, volteada: false},
    {"src":"/Fotos/gorou.jpg", match : false, volteada: false},
    {"src":"/Fotos/thomas.jpg", match : false, volteada: false},
    {"src":"/Fotos/xiao.jpg", match : false, volteada: false},
]

const App = () =>{
    const[cards,setcards]=React.useState([])
    const[turn,setturns]=React.useState(0)
    const[choiceone,setchoiceone]=React.useState(null)
    const[choicetwo,setchoicetwo]=React.useState(null)
    const[win,setwin]=React.useState(0)

    //shufleo
    const Shuffle=()=>{
        const Shuffle=[...ImagenCarta,...ImagenCarta]
        .sort(() => Math.random() -0.5 )
        .map((card)=> ({...card, id: Math.random()}))

        setchoiceone(null)
        setchoicetwo(null)
        setcards(Shuffle)
        setturns(0)
        setwin(0)
    }

    function handleClick(card){
        choiceone ? setchoicetwo(card): setchoiceone(card)
        card.turned = true
    }

    React.useEffect(() => {
        if(choiceone && choicetwo){
            if(choiceone.src === choicetwo.src){

                setcards( seecard => {
                    return seecard.map( card => {
                        if(card.src === choiceone.src){
                            return {...card, match : true}
                        }
                        else{
                            return card
                        }
                    })
                })

                resetTurn()
            }else{
                choiceone.turned = false
                choicetwo.turned = false
                setTimeout( () => resetTurn(), 1000)
            }
        }
    }, [choiceone,choicetwo])

    const resetTurn = () => {
        setchoiceone(null)
        setchoicetwo(null)       
        setturns(prevturnos => prevturnos + 1)
    }

    React.useEffect(() => {
        for( const card of cards){
            if(card.match===true){
                setWin(prevwin => prevwin + 1)
            }
        }
        if(win === 30){
            winner=true
            document.getElementById("win").className = "banner"
        }
        else{
            winner=false
            document.getElementById("win").className = "none"
        }
    }, [cards])

    return(
        <div className="App">
            <h1>GenshiMemory</h1>
                <button onClick={Shuffle}>Nuevo Juego</button>
    
                <div className="card-grid">
                {cards.map( card => (
                    
                    <div className="card" key={card.id}>
                        <div className={card.turned ? "turned" : ""}>
                            <img className="front" src={card.src} alt="card front"/>
                            <img className="back" src="/Fotos/fondo.jpg" alt="card back"  onClick={()=>{handleClick(card)}}/>
                        </div>
                    </div>
    
                ))}
                <div className="none" id="win">
                    <h1>*Silbidos de pueblo* Ganaste!!!</h1>
                    
                </div>
            </div>
            <div className="footer">
                <p className="foot_element">Movimientos: {turnos}</p>
            </div>
            
    
            
        </div>
    )

}