import React, { useState } from 'react'
import UserCard from '../../components/UserCard/UserCard'
import { userRequest } from "../../utils/axiosRequests"

const AccountPage = (props) => {
  const [loading, setLoading] = useState(true)

  setTimeout(() => {
    setLoading(false)
  },1000)

  if(loading) {
    return <div>...Loading</div>
  }
  return (
    <UserCard user={props?.user} />
  )
}

export async function getStaticProps({ params }) {
  const { id } = params
  
  const user = await userRequest(id)

  return {
    props: {
      user:user,
    },
  }
}

export async function getStaticPaths() {

  return {
    paths: [{ params: { id: '1' } }],
    fallback: true 
  }
}

export default AccountPage