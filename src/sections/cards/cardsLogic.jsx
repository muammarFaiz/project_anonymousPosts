import { useContext, useEffect, useState } from "react"
import { Context } from "../../App"
import req from "../../axiosSetup"
import Card from './card'
import { useDispatch } from "react-redux/es/exports"
import { mainLoadingSwitch } from "../../reduxSlices/mainstates/mainstates"

const CardsLogic = (cardslocation) => {
  const [homeCards, setHomeCards] = useState([])
  const [askCards, setAskCards] = useState('init')
  const memory = useContext(Context)
  const dispatch = useDispatch()

  // just to avoid babel warning:
  // const sethomeloading = memory.setHomeLoading;
  const postSecretStatus = memory.postSecretStatus.current;

  useEffect(() => {
    let query
    if(askCards === 'next') {
      query = {idIndex: homeCards[homeCards.length - 1]._id}
    } else if (askCards === 'init' || postSecretStatus === 'secret posted') {
      query = undefined
    }
    if(askCards === 'next' ||
    askCards === 'init' ||
    postSecretStatus === 'secret posted') {
      const runthis = async () => {
        // sethomeloading(true)
        dispatch(mainLoadingSwitch())
        const result = await req('getsecrets', 'GET', undefined, query)
        if(result.result) {
          console.log('secrets retreived');
          if (postSecretStatus === 'secret posted') {
            setHomeCards(result.result)
            memory.postSecretStatus.current = 'done'
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
        // sethomeloading(false)
        dispatch(mainLoadingSwitch())
      }
      runthis()
    }
  }, [askCards, setAskCards, homeCards, postSecretStatus, memory.postSecretStatus, dispatch])

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