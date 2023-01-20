import {createContext, useContext, useEffect, useState} from "react";
import {CARD_STATE, getInitialMemory, isMemoryFinished, isPairCards} from "../lib/memory";

export const MemoryContext = createContext(null);

export const useMemory = () => {
    const context = useContext(MemoryContext)
    if(!context) {
        throw new Error("useMemory must be used inside MemoryContextProvider")
    }

    return context;
}

export const MemoryProvider = ({children}) => {
    const [cards, setCards] = useState(getInitialMemory())
    const [isWin, setIsWin] = useState(false)
    const [returnedCards, setReturnedCards] = useState([]);
    const [tryCount, setTryCount] = useState(0)

    const handleClick = (card) => {
        if(card.state !== CARD_STATE.HIDE) {
            return
        }
        if(!isWin) {

            if(returnedCards.length < 2) {
                let newCards = cards.map((item) => {
                    if(card.id === item.id) {
                        card.state = CARD_STATE.RETURNED
                    }
                    return item;
                })
                setReturnedCards([...returnedCards,card]);
                setCards(newCards);
            }
        }

    }

    const handlePair = (newCardState, firstCard, secondCard) => {
        let newCards = cards.map((item) => {
            if(item.id === firstCard.id || item.id === secondCard.id) {
                item.state = newCardState
            }
            return item
        })
        setCards(newCards)
        setReturnedCards([])
    }

    useEffect(() => {

        if(returnedCards.length >= 2) {
            setTryCount(tryCount + 1)

            setTimeout(() => {
                if(isPairCards(returnedCards[0], returnedCards[1]) ) {
                    handlePair(CARD_STATE.FIND, returnedCards[0], returnedCards[1])
                } else {
                    handlePair(CARD_STATE.HIDE, returnedCards[0], returnedCards[1])
                }
            },1000)
        }

        if(isMemoryFinished(cards)) setIsWin(true)

    }, [cards])


    const resetGame = () => {
        let newCards = cards.map((item) => {
            item.state = CARD_STATE.HIDE
            return item
        })
        setCards(newCards)
        setTimeout(() => {
            setCards(getInitialMemory());
            setReturnedCards([]);
            setIsWin(false);
            setTryCount(0)
        },1000)

    }


    const values = {cards, handleClick, resetGame, tryCount, isWin}
    return (
        <MemoryContext.Provider value={values}>
            {children}
        </MemoryContext.Provider>
    )
}
