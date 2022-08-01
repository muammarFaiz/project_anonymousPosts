import { useContext } from "react"
import { useEffect, useState } from "react"
import { Context } from "../../App"
import req from "../../axiosSetup"
import Card from "../../sections/cards/card"

const c = console.log

export default function ProfileLogic() {
  const [secretArr, setSecretArr] = useState('')
  const [loading, setLoading] = useState('init')
  const [demandedPage, setDemandedPage] = useState(1)
  const [arrayOfPageNumber, setArrayOfPageNumber] = useState([])
  const memory = useContext(Context)

  // const postSecretStatus = memory.postSecretStatus.current
  const poststatus = memory.poststatus
  const setpoststatus = memory.setpoststatus

  const requestCardsDataProfile = () => {
    if (loading === 'init' ||
      loading === 'secret deleted' ||
      loading === 'change page' ||
      // postSecretStatus === 'secret posted'
      poststatus === 'secret posted'
    ) {
      const getUserSecrets = async () => {
        // c('getUserSecrets running, loading status: ' + loading + ', postSecretStatus: ' + postSecretStatus)
        const demandedPageNumber = demandedPage === 'init' ? 1 : demandedPage
        const result = await req('usersecrets', 'POST', { paginationMode: 'on demand', page: demandedPageNumber })
        if (result.result) {
          console.log('profile - get secrets - success');
          setSecretArr(result.result)
          if (!result.arrayOfPages) {
            alert('array of pages does not exist')
          } else {
            setArrayOfPageNumber(result.arrayOfPages)
          }
        } else if (result !== 'empty') {
          alert('something is wrong, result key not found in server response')
        } else {
          setSecretArr([])
          setArrayOfPageNumber([])
        }
        setLoading(false)
        // if (postSecretStatus === 'secret posted') memory.postSecretStatus.current = 'done'
        if(poststatus === 'secret posted') setpoststatus('done')
      }
      getUserSecrets()
      // lesson: of you do something 'light' after the async function it will finish before the async function finish
    }
  }
  useEffect(requestCardsDataProfile, [loading, demandedPage, poststatus, setpoststatus])

  // maybe if we use a useEffect in topNav with a useRef from appLogic cotext, then we can change a state in topNav
  // therefore topNav can be re-rendered from other component without the app component to be re-rendered, maybe...

  const deleteSecret = async (n) => {
    c('deleteSecret running...')
    setLoading(true)
    const result = await req('deletesecret', 'POST', {secretNumber: n})
    if(result === 'ok') {
      console.log('secret deleted');
      setLoading('secret deleted')
    } else {
      alert('failed to delete secret')
    }
  }

  const setDelSecN = memory.setDeleteSecretN
  useEffect(() => {
    if(memory.deleteSecretN) {
      deleteSecret(memory.deleteSecretN)
      setDelSecN('')
    }
  }, [memory.deleteSecretN, setDelSecN])
  
  const setPageGroup = () => {
    let buttonArr = []
    for (let i = 0; i < arrayOfPageNumber.length; i++) {
      const element = arrayOfPageNumber[i]
      buttonArr.push(<button key={i} onClick={() => {
        setDemandedPage(element)
        setLoading('change page')
      }}>{element}</button>)
    }
    return buttonArr
  }

  const cardsForProfile = () => {
    if (loading || poststatus === 'secret posted') {
      return <h1>Loading...</h1>
    } else if (secretArr.length < 1) {
      return <p>no secret found...</p>
    } else {
      let examplePostArr = []
      for (let i = 0; i < secretArr.length; i++) {
        const secret = secretArr[i]
        examplePostArr.push(
          <Card card={secret} key={i} profile={true} />
        )
      }
      return examplePostArr
    }
  }

  return {
    secretArr,
    loading,
    setPageGroup,
    cardsForProfile
  }
}