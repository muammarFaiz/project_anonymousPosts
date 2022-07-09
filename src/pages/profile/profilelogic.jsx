import { useEffect, useState } from "react"
import req from "../../axiosSetup"

const c = console.log

export default function ProfileLogic() {
  const [textarea, setTextarea] = useState('')
  const [secretArr, setSecretArr] = useState('')
  const [loading, setLoading] = useState('init')
  const [demandedPage, setDemandedPage] = useState('init')
  
  const [arrayOfPageNumber, setArrayOfPageNumber] = useState([])

  const createPost = async () => {
    setLoading(true)
    const result = await req('postsecret', 'POST', {content: textarea})
    console.log(result);
    if(result === 'ok') {
      setLoading('new secret added')
      setTextarea('')
    } else {
      alert('failed to create post')
    }
  }
  const editTextarea = (val) => {
    setTextarea(val.target.value)
  }

  useEffect(() => {
    if(loading === 'init' || loading === 'new secret added' || loading === 'secret deleted' || loading === 'change page') {
      const getUserSecrets = async () => {
        c('getUserSecrets running')
        const demandedPageNumber = demandedPage === 'init' ? 1 : demandedPage
        const result = await req('usersecrets', 'POST', {paginationMode: 'on demand', page: demandedPageNumber})
        if(result.result) {
          setSecretArr(result.result)
          if(!result.arrayOfPages) {
            alert('array of pages does not exist')
          } else {
            setArrayOfPageNumber(result.arrayOfPages)
          }
          setLoading(false)
        } else {
          alert('something is wrong, result key not found in server response')
          setLoading(false)
        }
      }
      getUserSecrets()
    }
  }, [loading, demandedPage])

  const deleteSecret = async (n) => {
    setLoading(true)
    const result = await req('deletesecret', 'POST', {secretNumber: n})
    if(result === 'ok') {
      setLoading('secret deleted')
    } else {
      alert('failed to delete secret')
    }
  }

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

  return {
    textarea, editTextarea,
    createPost,
    secretArr,
    loading,
    deleteSecret,
    setPageGroup
  }
}