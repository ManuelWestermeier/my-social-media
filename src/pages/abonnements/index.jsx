import React from 'react'

function AbonnementsPage({ userData }) {
  const abonnements = userData.abonnements.map(id => {
    <div key={id}>
      {id}
    </div>
  })

  return <div className='p10'>
    <h1>Abonnements</h1>
    {abonnements}
  </div>
}

export default AbonnementsPage