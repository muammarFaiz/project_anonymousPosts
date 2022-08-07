import { useRef } from "react";
import { useEffect, useState } from "react";
import req from "../../axiosSetup";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { mainLoadingSwitch, setDeleteSecretN } from "../../reduxSlices/mainstates/mainstates";

export default function CardLogic(props) {
  const [votes, setVotes] = useState('')
  const audioB64 = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (props.card.vote_count === undefined || props.card.vote_count === 'init') {
      setVotes(0)
    } else {
      setVotes(parseInt(props.card.vote_count, 10))
    }
    if(props.card.audio) arrBuffToUrlObj(props.card.audio.buffer, props.card.audio.mimetype)
  }, [props.card.vote_count, props.card.audio])

  const vote = async (action, id) => {
    dispatch(mainLoadingSwitch())
    const result = await req('vote', 'GET', undefined, { status: action, id: id })
    if (result !== 'ok') {
      alert('fail to vote')
    } else {
      setVotes(prev => {
        let n = prev + 0
        if(action === 'up') {
          n++
        } else {
          n = n - 1
        }
        return n
      })
    }
    dispatch(mainLoadingSwitch())
  }

  const deleteSecret = async (n) => {
    dispatch(setDeleteSecretN(n))
  }

  const arrBuffToUrlObj = (ab, mime) => {
    audioB64.current = `data:${mime};base64,${ab}`
  }

  return {
    vote,
    votes, setVotes,
    deleteSecret,
    audioB64
  }
}