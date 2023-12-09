import React, { useState, useRef, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Newchat from "./newchat";
import { ChildComponentProps, objectChat } from "../interface/interface";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import Blue from "../images/blue.jpg";
import Logo from "../images/logo1.png";
import { Menu, X } from "lucide-react";

const Chat: React.FC<ChildComponentProps> = (props) => {
  const {
    newchat,
    changenewchat,
    currentChat,
    chatlist,
    currentchatID,
    addItemToCache,
    sidebar,
    changesidebar,
  } = props;

  const [CompletedTyping, setCompletedTyping] = useState<boolean>(true);

  const [DisplayResponse, setDisplayResponse] = useState<string>("");
  // eslint-disable-next-line 
  const [isHovered, setHovered] = useState<boolean>(false);
  const [text, settext] = useState<string>("");
  const Button = useRef<HTMLButtonElement | null>(null);
  // eslint-disable-next-line 
  const Input = useRef<HTMLInputElement | null>(null);
  const [apidone, setapidone] = useState<boolean>(false);
  const [chatHistory, setchatHistory] = useState<objectChat[]>(
    newchat === true ? [] : currentChat
  );

  useEffect(() => {
    setchatHistory(currentChat);
  }, [currentChat]);

  const [resrecieved, setresrecieved] = useState<boolean>(false);

  const [alert, setalert] = useState<boolean>(false);

  useEffect(() => {
    if (newchat === true) {
      settext("");
    }
  }, [newchat]);

  const style = {
    backgroundColor: "transparent",
    color: "white",
    fontSize: "1.15rem",
    fontWeight: "600",
    width: "150px",
    height: "2.6rem",
    border: "none",
    borderRadius: "8px",
    transition: "0s ease",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "4px",
  };
  const menustyle = {
    backgroundColor: "#202123",
    width: "160px",
    height: "120px",
    zIndex: "3000",
  };
  const divider = {
    backgroundColor: "white",
  };
  const itemstyle = {
    backgroundColor: "transparent",
    color: "white",
  };

  const sampletext = (query: string) => {
    Api(query);
    changenewchat(false);
  };

  const Api = async (query: string) => {
    setapidone(true);
    console.log(query);
    const URL = "https://api-v2.longshot.ai/custom/api/generate/instruct";
    const bearerToken = "aa4b97f2dd3f7454d7b460e7c7ec8684924564d9";
    const data = {
      text: query,
    };
    console.log(data);
    const newprompt = {
      query: query,
      content: "",
      index: chatHistory.length,
    };
    const temp = [...chatHistory];
    temp.push(newprompt);
    setCompletedTyping(false);
    setchatHistory(temp);
    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify(data),
      });
      const msg = await res.json();
      console.log(msg.copies[0]);
      temp[temp.length - 1].content = msg.copies[0].content;
      setchatHistory(temp);
      setresrecieved(true);
    } catch (err) {
      console.log(err);
    }
  };
  //msg.copies[0].content
  useEffect(() => {
    if (chatHistory?.length !== 0 && resrecieved === true) {
      let i = 0;
      const stringResponse = chatHistory[chatHistory.length - 1].content;

      console.log(stringResponse);

      const intervalId = setInterval(() => {
        console.log("HEYY");

        setDisplayResponse(stringResponse.slice(0, i));

        if (CompletedTyping === true) {
          console.log("JHVYJVYJBKDJ");
          const temp = [...chatHistory];
          temp[temp.length - 1].content = DisplayResponse;
          setchatHistory(temp);
          setapidone(false);
          setDisplayResponse("");
          console.log("HEYY");
          setresrecieved(false);
          setalert(false);
          Addup();
          clearInterval(intervalId);
        } else {
          console.log(alert);
        }

        i++;

        if (i > stringResponse.length) {
          setCompletedTyping(true);
          setapidone(false);
          setDisplayResponse("");
          setresrecieved(false);
          Addup();
          clearInterval(intervalId);
        }
      }, 20);
      return () => clearInterval(intervalId);
    }
  }, [resrecieved]);

  const Addup = () => {
    let Somechat = chatlist[currentchatID];
    let temp = chatHistory;
    Somechat.chat = temp;
    let curreindx = currentchatID;
    addItemToCache(curreindx, Somechat);
    console.log(temp);
  };

  return (
    <div className="chat">
      <div className="nav">
        {window.innerWidth < 750 && (
          <>
            {sidebar === false ? (
              <Menu
                size={22}
                onClick={(e) => {
                  console.log("HEyyy");
                  changesidebar(true);
                }}
              />
            ) : (
              <X
                size={22}
                onClick={(e) => {
                  changesidebar(false);
                }}
              />
            )}
          </>
        )}
        <Dropdown>
          <Dropdown.Toggle
            variant="chatGPT"
            className="toggle"
            style={style}
            id="dropdown-basic"
            onMouseEnter={(e) => {
              setHovered(false);
            }}
            onMouseLeave={(e) => {
              setHovered(true);
            }}
          >
            MeowGPT <h3>3.5</h3>
          </Dropdown.Toggle>

          <Dropdown.Menu style={menustyle}>
            <Dropdown.Item style={itemstyle}>GPT-4</Dropdown.Item>
            <Dropdown.Divider style={divider} />
            <Dropdown.Item style={itemstyle}>GPT-5</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="chatbox">
        <div className="up">
          {newchat === true ? (
            <Newchat sampletext={sampletext} changenewchat={changenewchat} />
          ) : (
            <div className="chatview">
              {chatHistory?.length !== 0 &&
                chatHistory?.map((item, key) => (
                  <div className="chatitem">
                    <div className="gpt">
                      <div className="icon">
                        <img src={Blue} alt="alty" />
                      </div>
                      <div className="message">
                        <p>You</p>
                        <h2 className="h2">{item.query}</h2>
                      </div>
                    </div>
                    <div className="gpt">
                      <div className="icon">
                        <img src={Logo} alt="qaz" />
                      </div>
                      <div className="message">
                        <p>MeowGPT</p>
                        {apidone === true &&
                        item.index === chatHistory.length - 1 ? (
                          <>
                            <p className="content">
                              {!CompletedTyping && DisplayResponse}
                              {!CompletedTyping && (
                                <svg
                                  viewBox="8 4 8 16"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="cursor"
                                >
                                  <rect
                                    x="10"
                                    y="6"
                                    width="4"
                                    height="12"
                                    fill="#fff"
                                  />
                                </svg>
                              )}
                            </p>
                          </>
                        ) : (
                          <p className="content">{item.content}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
        <div className="down" onClick={(e) => e.stopPropagation()}>
          <div className="text">
            <input
              className="input"
              type="text"
              value={text}
              onChange={(e) => settext(e.target.value)}
              placeholder="Message MeowGPT..."
            />
            {CompletedTyping === true && (
              <button
                ref={Button}
                style={
                  text.length === 0
                    ? { backgroundColor: "#494A54", color: "#343541" }
                    : { backgroundColor: "white", color: "black" }
                }
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  Api(text);
                  changenewchat(false);
                  settext("");
                  console.log("clicked");
                }}
              >
                <ArrowUpwardIcon />
              </button>
            )}

            {CompletedTyping === false && (
              <div
                className="qwerty"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setalert(true);
                  console.log("HEYYY");
                  setCompletedTyping(true);
                }}
              >
                <RadioButtonCheckedIcon />
              </div>
            )}
          </div>
          <h2 style={sidebar === true ? { opacity: "1" } : { opacity: "0.6" }}>
            MeowGPT can make mistakes. Consider checking important information.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Chat;
