import React from 'react'
import { X } from "lucide-react";
import '../scss/popup.scss'
import { popupinterface } from '../interface/interface';
const Error: React.FC<popupinterface> = (props) => {
  const {changepopup } = props;
  return (
    <div className="popup">
    <div className="model">
      <div className="upper">
        <h1>Too many request Error...!</h1>
         <X size={25} color={"black"} className='cross' onClick={(e)=>{
          e.preventDefault();
          changepopup(false)
         }} />
      </div>
      <div className="middle">
        <h1>You can enjoy The full AI-GPT from LongShot-AI official site</h1>
      </div>
      <div className="down">
        <button className='cancel' onClick={(e)=>{
          e.preventDefault();
          changepopup(false)
         }}>cancel</button>
         <a href='https://docs.longshot.ai/api-reference/endpoint/InstructPrompt' className='ok'>
          Less go
         </a>
         
      </div>
    </div>
</div>
  )
}

export default Error