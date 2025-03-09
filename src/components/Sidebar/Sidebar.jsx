import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from './../../context/Context';

const Sidebar = () => {
  const [extend, setExtend] = useState(false);
  const {onSent , prevPrompts , setRecentPrompt , newChat} = useContext(Context);

  // for when we click on recent text then show result again
  const loadPrompt = async (prompt)=>{
    setRecentPrompt(prompt)
    await onSent(prompt)
  }

  useEffect(() => {
    console.log(extend);
  }, [extend]);

  return (
    <div className="sidebar">
      {/* Top Section */}
      <div className="top">
        <img onClick={()=>setExtend(prev => !prev)} className="menu" src={assets.menu_icon} alt="Not Available" />
        <div onClick={()=>newChat()} className="new-chat">
          <img className="plus" src={assets.plus_icon} alt="Not Available" />
          {extend ? <p>New Chat</p> : null}
        </div>

        {extend ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item,index) => {
                return (
                  <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                    <img className="denote-img" src={assets.message_icon} alt="Not Available" />
                    <p>{item.slice(0, 18)} ...</p>
                  </div>
                );
              })
            }
            
          </div>
        ) : null}
      </div>
      {/* Bottom Section */}
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img className="denote-img" src={assets.question_icon} alt="Not Available" />
          {extend ? <p>Help</p> : null }
        </div>
        <div className="bottom-item recent-entry">
          <img className="denote-img" src={assets.history_icon} alt="Not Available" />
          { extend ? <p>Activity</p> : null }
        </div>
        <div className="bottom-item recent-entry">
          <img className="denote-img" src={assets.setting_icon} alt="Not Available" />
           { extend ? <p>Settings</p> : null }
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
