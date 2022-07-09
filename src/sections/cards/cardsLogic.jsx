import { useContext, useEffect, useState } from "react"
import { Context } from "../../App"
import req from "../../axiosSetup"

const CardsLogic = () => {
  const [homeCards, setHomeCards] = useState([])
  const [nextpage, setNextpage] = useState('init')
  const memory = useContext(Context)
  // just to avoid babel warning:
  const sethomeloading = memory.setHomeLoading;

  useEffect(() => {
    let query
    console.log('cardslogic running, state deps: nextpage, homeCards, memory.setHomeLoading');
    if(nextpage === 'next') {
      sethomeloading(true)
      query = {idIndex: homeCards[homeCards.length - 1]._id}
    } else if(nextpage === 'init') {
      query = undefined
    }
    if(nextpage === 'next' || nextpage === 'init') {
      const runthis = async () => {
        const result = await req('getsecrets', 'GET', undefined, query)
        if(result.result) {
          setHomeCards(prev => {
            const a = [...prev]
            a.push(...result.result)
            return a
          })
        }
      }
      runthis()
      sethomeloading(false)
      setNextpage('done')
    }
  }, [nextpage, homeCards, sethomeloading])


  return {
    homeCards,
    setNextpage
  }
}
export default CardsLogic