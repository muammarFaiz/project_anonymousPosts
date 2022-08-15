import { useEffect, useState } from "react"
import req from "../../axiosSetup"
import Card from "../../sections/cards/card"
import { useSelector, useDispatch } from "react-redux"
import { setDeleteSecretN, setPoststatus, setProfileBookmark } from "../../reduxSlices/mainstates/mainstates"

export default function ProfileLogic() {
  const [secretArr, setSecretArr] = useState('')
  const [loading, setLoading] = useState('init')
  const [demandedPage, setDemandedPage] = useState(1)
  const [arrayOfPageNumber, setArrayOfPageNumber] = useState([])
  const [content, setContent] = useState('posts')
  const [nextButtonStatus, setNextButtonStatus] = useState('')
  const [backbutton, setBackbutton] = useState('')

  const dispatch = useDispatch()
  const deleteSecretN = useSelector(state => state.memory.deleteSecretN)
  const poststatus = useSelector(state => state.memory.poststatus)


  const requestCardsDataProfile = () => {
    if (loading === 'init' ||
      loading === 'secret deleted' ||
      loading === 'change page' ||
      loading === 'bookmark' ||
      loading === 'bookmark next' ||
      loading === 'bookmark back' ||
      poststatus === 'secret posted'
    ) {
      const getUserSecrets = async () => {
        let result
        if(loading === 'bookmark' || loading === 'bookmark next' || loading === 'bookmark back') {
          let indexid
          if(loading === 'bookmark next') indexid = secretArr[secretArr.length - 1]._id
          if(loading === 'bookmark back') indexid = secretArr[0]._id
          result = await req('getbookmarks', 'POST', {startfrom: indexid, limit: 10, back: loading === 'bookmark back' ? true : false})
        } else {
          const demandedPageNumber = demandedPage === 'init' ? 1 : demandedPage
          result = await req('usersecrets', 'POST', { paginationMode: 'on demand', page: demandedPageNumber })
        }
        console.log(result)
        if (result.result) {
          setSecretArr(result.result)
          if (!result.arrayOfPages) {
            alert('array of pages does not exist')
          } else if(result.arrayOfPages !== 'bookmark') {
            setArrayOfPageNumber(result.arrayOfPages)
          }
          setNextButtonStatus(result.nextbutton)
          setBackbutton(result.backbutton)
        } else if (result !== 'empty') {
          alert('something is wrong, result key not found in server response')
        } else {
          setSecretArr([])
          setArrayOfPageNumber([])
        }
        setLoading(false)
        if(poststatus === 'secret posted') dispatch(setPoststatus('done'))
      }
      getUserSecrets()
    }
  }
  useEffect(requestCardsDataProfile, [loading, demandedPage, poststatus, dispatch, secretArr])

  const deleteSecret = async (n) => {
    setLoading(true)
    const result = await req('deletesecret', 'POST', {secretNumber: n})
    if(result === 'ok') {
      setLoading('secret deleted')
      setContent('posts')
    } else {
      alert('failed to delete secret')
    }
  }

  useEffect(() => {
    if(deleteSecretN) {
      deleteSecret(deleteSecretN)
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

  const gotoBookmark = () => {
    if(content !== 'bookmark') {
      setLoading('bookmark')
      setContent('bookmark')
    }
  }

  const gotoPosts = () => {
    if(content !== 'posts') {
      setLoading('init')
      setContent('posts')
    }
  }

  const bookmarkNext = () => {
    setLoading('bookmark next')
    setBackbutton(true)
  }

  const bookmarkBack = () => {
    setLoading('bookmark back')
  }

  useEffect(() => {
    if(content === 'bookmark') {
      dispatch(setProfileBookmark(true))
    } else {
      dispatch(setProfileBookmark(false))
    }
  }, [content, dispatch])

  return {
    secretArr,
    loading,
    setPageGroup,
    cardsForProfile,
    content,
    gotoBookmark,
    gotoPosts,
    bookmarkNext,
    nextButtonStatus,
    backbutton,
    bookmarkBack
  }
}