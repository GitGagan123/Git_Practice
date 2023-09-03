import React from 'react'

const LazyFlag = ({flagUrl,name,alt}) => {
  return (
    <div>
        <img src={flagUrl} alt={alt}/>
        {name}
    </div>
  )
}

export default LazyFlag;
