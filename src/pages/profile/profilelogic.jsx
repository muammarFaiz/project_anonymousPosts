// import { useContext } from "react"
import { useEffect, useState } from "react"
// import { Context } from "../../App"
import req from "../../axiosSetup"
import Card from "../../sections/cards/card"
import { useSelector, useDispatch } from "react-redux"
import { setDeleteSecretN, setPoststatus } from "../../reduxSlices/mainstates/mainstates"

export default function ProfileLogic() {
  const [secretArr, setSecretArr] = useState('')
  const [loading, setLoading] = useState('init')
  const [demandedPage, setDemandedPage] = useState(1)
  const [arrayOfPageNumber, setArrayOfPageNumber] = useState([])
  // const memory = useContext(Context)

  const dispatch = useDispatch()
  const deleteSecretN = useSelector(state => state.memory.deleteSecretN)
  const poststatus = useSelector(state => state.memory.poststatus)

  // const postSecretStatus = memory.postSecretStatus.current
  // const poststatus = memory.poststatus
  // const setpoststatus = memory.setpoststatus

  const requestCardsDataProfile = () => {
    console.log('profilelogic useffect: ' + loading + ', poststatus: ' + poststatus)
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
          console.log('req usersecrets: success');
          setSecretArr(result.result)
          if (!result.arrayOfPages) {
            alert('array of pages does not exist')
          } else {
            setArrayOfPageNumber(result.arrayOfPages)
          }
        } else if (result !== 'empty') {
          alert('something is wrong, result key not found in server response')
        } else {
          console.log('req usersecrets: result is empty');
          setSecretArr([])
          setArrayOfPageNumber([])
        }
        setLoading(false)
        // if (postSecretStatus === 'secret posted') memory.postSecretStatus.current = 'done'
        // if(poststatus === 'secret posted') setpoststatus('done')
        if(poststatus === 'secret posted') dispatch(setPoststatus('done'))
      }
      getUserSecrets()
      // lesson: of you do something 'light' after the async function it will finish before the async function finish
    }
  }
  useEffect(requestCardsDataProfile, [loading, demandedPage, poststatus, dispatch])

  const deleteSecret = async (n) => {
    setLoading(true)
    const result = await req('deletesecret', 'POST', {secretNumber: n})
    if(result === 'ok') {
      console.log('req deletesecret: secret deleted');
      setLoading('secret deleted')
    } else {
      alert('failed to delete secret')
    }
  }

  // const setDelSecN = memory.setDeleteSecretN
  useEffect(() => {
    if(deleteSecretN) {
      deleteSecret(deleteSecretN)
      // setDelSecN('')
      dispatch(setDeleteSecretN(''))
    }
  }, [deleteSecretN, dispatch])
  
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