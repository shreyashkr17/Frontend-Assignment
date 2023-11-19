import React, {useEffect, useState} from 'react'
import './css/Home.css'
import LeftPanel from '../Components/LeftPanel'
import RightPanel from '../Components/RightPanel'
import uiSchameExample from '../example.json'

function Home() {
    const [schema, setSchema] = useState([]);
    // useEffect(()=>{
    //     setSchema(uiSchameExample)
    // },[])
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
