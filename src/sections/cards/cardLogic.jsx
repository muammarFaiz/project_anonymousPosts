import { useRef } from "react";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../App";
import req from "../../axiosSetup";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { mainLoadingSwitch } from "../../reduxSlices/mainstates/mainstates";

export default function CardLogic(props) {
  const memory = useContext(Context)
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
    // memory.setHomeLoading(true)
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
    // memory.setHomeLoading(false)
    dispatch(mainLoadingSwitch())
  }

  const deleteSecret = async (n) => {
    memory.setDeleteSecretN(n)
  }

  const arrBuffToUrlObj = (ab, mime) => {
    // console.log(typeof(ab));
    // console.log(mime);
    // const unsigned_intArr = new Uint8Array(ab)
    // console.log(unsigned_intArr);
    // const _blob = new Blob(unsigned_intArr, {type: mime})
    // console.log(_blob);
    // audioURL.current = URL.createObjectURL(_blob)
    audioB64.current = `data:${mime};base64,${ab}`
  }

  return {
    vote,
    votes, setVotes,
    deleteSecret,
    audioB64
  }
}