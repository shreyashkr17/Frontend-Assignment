import React, {useEffect, useState} from 'react'
import '../css/Home.css'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'

function Home() {
    const [schema, setSchema] = useState([]);
  return (
    <div className='Home'>
      <div className="split-view">
        <div className="left-view">
            <LeftPanel schema={schema} setSchema={setSchema}/>
        </div>
        {schema && schema.length > 0 && <div className="right-view">
            <div className={`${schema?"FormContainer":"FormContainerDisp"}`}>
              <RightPanel schema={schema}/>
            </div>
        </div>}
      </div> 
    </div>
  )
}

export default Home
