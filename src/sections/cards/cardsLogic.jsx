import { useEffect, useState } from "react"
import req from "../../axiosSetup"
import Card from './card'
import { useDispatch, useSelector } from "react-redux/es/exports"
import { mainLoadingSwitch, setPoststatus } from "../../reduxSlices/mainstates/mainstates"

const CardsLogic = (cardslocation) => {
  const [homeCards, setHomeCards] = useState([])
  const [askCards, setAskCards] = useState('init')
  const dispatch = useDispatch()

  const poststatus = useSelector(state => state.memory.poststatus)

  useEffect(() => {
    let query
    if(askCards === 'next') {
      const idref = homeCards[homeCards.length - 1]._id
      query = {idIndex: idref}
    } else if (askCards === 'init' || poststatus === 'secret posted') {
      query = undefined
    }
    if(askCards === 'next' ||
    askCards === 'init' ||
    poststatus === 'secret posted') {
      const runthis = async () => {
        dispatch(mainLoadingSwitch())
        const result = await req('getsecrets', 'GET', undefined, query)
        if(result.result) {
          if (poststatus === 'secret posted') {
            setHomeCards(result.result)
            dispatch(setPoststatus('done'))
          } else {
            setHomeCards(prev => {
              const a = [...prev]
              a.push(...result.result)
              return a
            })
            setAskCards('done')
          }
        } else {
          alert('failed in retreiving secrets')
        }
        dispatch(mainLoadingSwitch())
      }
      runthis()
    }
  }, [askCards, homeCards, poststatus, dispatch])

  const nextpage = () => {
    setAskCards('next')
  }

  const c = () => {
    let arr = []
    if (homeCards.length === 0) {
      arr.push(<h1 key={0}>Loadinggg...</h1>)
    } else {
      for (let i = 0; i < homeCards.length; i++) {
        const card = homeCards[i]
        arr.push(
          <Card card={card} key={i} />
        )
      }
    }
    return arr
  }

  return {
    c,
    nextpage
  }
}
export default CardsLogic