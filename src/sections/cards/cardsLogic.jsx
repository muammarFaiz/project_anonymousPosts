import { useContext, useEffect, useState } from "react"
import { Context } from "../../App"
import req from "../../axiosSetup"

const CardsLogic = () => {
  const [homeCards, setHomeCards] = useState([])
  const [askCards, setAskCards] = useState('init')
  const memory = useContext(Context)
  // just to avoid babel warning:
  const sethomeloading = memory.setHomeLoading;
  const homepagePostSecret = memory.homepagePostSecret;
  const setHomepagePostSecret = memory.setHomepagePostSecret;

  useEffect(() => {
    console.log(homepagePostSecret);
    console.log(askCards);
    let query
    if(askCards === 'next') {
      sethomeloading(true)
      query = {idIndex: homeCards[homeCards.length - 1]._id}
    } else if(askCards === 'init' || homepagePostSecret === 'secret posted') {
      sethomeloading(true)
      query = undefined
    }
    if(askCards === 'next' ||
    askCards === 'init' ||
    homepagePostSecret === 'secret posted') {
      const runthis = async () => {
        console.log('retreiving secrets...');
        const result = await req('getsecrets', 'GET', undefined, query)
        if(result.result) {
          if(homepagePostSecret === 'secret posted') {
            setHomeCards(result.result)
            setHomepagePostSecret('done')
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
      }
      runthis()
      sethomeloading(false)
    }
  }, [askCards, setAskCards, homeCards, sethomeloading, homepagePostSecret, setHomepagePostSecret])

  const nextpage = () => {
    setAskCards('next')
  }

  return {
    homeCards,
    nextpage
  }
}
export default CardsLogic