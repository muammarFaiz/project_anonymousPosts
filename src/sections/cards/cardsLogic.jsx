import { useEffect, useState } from "react"
import req from "../../axiosSetup"
import Card from './card'
import { useDispatch, useSelector } from "react-redux/es/exports"
import { mainLoadingSwitch, setDeleteSecretN, setPoststatus } from "../../reduxSlices/mainstates/mainstates"

const CardsLogic = (cardslocation) => {
  const [homeCards, setHomeCards] = useState([])
  const [askCards, setAskCards] = useState('init')

  const dispatch = useDispatch()

  const poststatus = useSelector(state => state.memory.poststatus)
  const deleteSecretN = useSelector(state => state.memory.deleteSecretN)

  useEffect(() => {
    if(homeCards !== 'loading') {
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
          dispatch(mainLoadingSwitch({force: 'on'}))
          if (poststatus === 'secret posted') {
            setHomeCards('loading')
          }
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
          dispatch(mainLoadingSwitch({desc: 'cards', force: 'off'}))
        }
        runthis()
      }
    }
  }, [askCards, homeCards, poststatus, dispatch])

  const nextpage = () => {
    setAskCards('next')
  }

  useEffect(() => {
    if (deleteSecretN) {
      dispatch(mainLoadingSwitch())
      const deleteSecret = async (n) => {
        const result = await req('deletesecret', 'POST', { secretNumber: n })
        if (result === 'ok') {
          dispatch(setPoststatus('secret posted'))
        } else {
          alert('failed to delete secret')
        }
        dispatch(setDeleteSecretN(''))
      }
      deleteSecret(deleteSecretN)
    }
  }, [deleteSecretN, dispatch])

  const c = () => {
    let arr = []
    if (homeCards === 'loading') {
      arr.push(<h1 key={0}>Loadinggg...</h1>)
    } else if(homeCards.length === 0) {
      <p>empty...</p>
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