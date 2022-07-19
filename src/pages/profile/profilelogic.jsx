import { useContext } from "react"
import { useEffect, useState } from "react"
import { Context } from "../../App"
import req from "../../axiosSetup"

const c = console.log

export default function ProfileLogic() {
  const [secretArr, setSecretArr] = useState('')
  const [loading, setLoading] = useState('init')
  const [demandedPage, setDemandedPage] = useState('init')
  const [arrayOfPageNumber, setArrayOfPageNumber] = useState([])
  const memory = useContext(Context)

  const homepagePostSecret = memory.homepagePostSecret
  const setHomepagePostSecret = memory.setHomepagePostSecret
  useEffect(() => {
    if(loading === 'init' ||
    loading === 'new secret added' ||
    loading === 'secret deleted' ||
    loading === 'change page' ||
    homepagePostSecret === 'secret posted'
    ) {
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
        } else if(result !== 'empty') {
          alert('something is wrong, result key not found in server response')
        }
        setLoading(false)
      }
      getUserSecrets()
      setHomepagePostSecret('done')
    }
  }, [loading, demandedPage, homepagePostSecret, setHomepagePostSecret])

  const deleteSecret = async (n) => {
    c('deleteSecret running...')
    setLoading(true)
    const result = await req('deletesecret', 'POST', {secretNumber: n})
    if(result === 'ok') {
      setLoading('secret deleted')
    } else {
      alert('failed to delete secret')
    }
  }
  useEffect(() => {
    if(memory.profileLoading) {
      deleteSecret(memory.profileLoading)
    }
  }, [memory.profileLoading])
  
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
    secretArr,
    loading,
    setPageGroup
  }
}