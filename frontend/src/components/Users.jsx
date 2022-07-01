import React, {useEffect, useState} from 'react'
import axios from 'axios'
const Users = () => {
  const [people, setPeople] = useState([])

    useEffect(() => {
     axios.get('/api/users/all')
    .then(res => {
      setPeople(res.data)
    })
    .catch(error => {
      console.log(error)
    })
}, [setPeople])

  return (
    <div>
         <section className='dash__suggestion'>
             <h3>All Users</h3>
        {people?.map((p) => (
          <ul className='goal'> 
            <li key={p.id}>{p.name}</li>
          </ul>
        ))}
      </section>
    </div>
  )
}

export default Users