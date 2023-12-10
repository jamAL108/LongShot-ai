import React, { useEffect, useState } from "react";
import Logo from "../images/logo.png";
import { PenSquare, CircleUserRound, Trash2 } from "lucide-react";
import { ChildComponentProps } from "../interface/interface";
const Sidebar: React.FC<ChildComponentProps> = (props) => {
  const {
    changenewchat,
    chatlist,
    currentchatID,
    changecurrentidx,
    deleteItemFromCache,
    sidebar,
    changesidebar
    // eslint-disable-next-line
  } = props;


  const [idx, setidx] = useState<number>(0);

  function truncateString(str: string) {
    if (str?.length > 24) {
      return str?.substring(0, 24) + "...";
    } else {
      return str;
    }
  }

  const dropdownopen = (index: number) => {
    deleteItemFromCache(index);
  };

  useEffect(() => {
    setidx(currentchatID);
  }, [currentchatID]);

  return (
    <div className={`sidebar ${sidebar ? "open" : ""}`}>
      <div
        className="newchat"
        onClick={(e) => {
          e.preventDefault();
          changesidebar(false)
          changenewchat(true);
        }}
      >
        <img src={Logo} alt="" />
        <h2>New Chat</h2>
        <PenSquare size={17} />
      </div>
      <div className="content">
        <div className="heading">
          <p>Chats</p>
        </div>
        {chatlist.length !== 0 &&
          chatlist.map((item, key) => (
            <div
              key={key}
              className="itemnav"
              style={
                idx === key
                  ? { backgroundColor: "#202123" }
                  : { backgroundColor: "transparent" }
              }
              onClick={(e) => {
                e.preventDefault();
                changesidebar(false)
                changecurrentidx(key);
              }}
            >
              <h2>{truncateString(item?.chat[0]?.query) || "New Chat"}</h2>
              {idx === key && (
                <Trash2 size={18} onClick={(e) => dropdownopen(key)} />
              )}
            </div>
          ))}
        {chatlist.length === 0 && (
          <div className="error">
            <p>No new chats..!</p>
          </div>
        )}
      </div>
      <div className="user">
        <div className="profile">
          <CircleUserRound size={28} />
          <p>Jamal Mydeen</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
