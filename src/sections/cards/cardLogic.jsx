import { useContext, useEffect, useState } from "react";
import { Context } from "../../App";
import req from "../../axiosSetup";

export default function CardLogic(props) {
  const memory = useContext(Context)
  const [votes, setVotes] = useState('')

  useEffect(() => {
    if (props.card.vote_count === undefined || props.card.vote_count === 'init') {
      setVotes(0)
    } else {
      setVotes(parseInt(props.card.vote_count, 10))
    }
  }, [props.card.vote_count])

  const vote = async (action, id) => {
    memory.setHomeLoading(true)
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
    memory.setHomeLoading(false)
  }
  return {
    vote,
    votes, setVotes
  }
}