import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Chat from "../components/Chat";
import "../scss/Home.scss";
import { chatList, objectChat } from "../interface/interface";
import PopupError from '../components/error'

type storag = {
  idx: number;
};

const Home = () => {
  const cacheName = "chatgpt";
  const stringKey = "chatgpt";

  const [chatlist, setchatlist] = useState<chatList[]>([]);

  const [sidebar, setsidebar] = useState<boolean>(false);

  const storage: string | null = localStorage.getItem("GPTidx");
  const store: storag | null = storage ? JSON.parse(storage) : null;
  const [currentchatID, setId] = useState<number>(
    store !== null ? (store.idx !== -1 ? store.idx : 0) : 0
  );
  const [newchat, setnewchat] = useState<boolean>(
    store !== null ? false : true
  );

  const [Popup ,setPopup] = useState<boolean>(false)

  const changepopup =(flag:boolean)=>{
    setPopup(flag)
  }

  useEffect(() => {
    retrieveItemFromCache();
    async function retrieveItemFromCache() {
      try {
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(stringKey);
        if (cachedResponse) {
          const res = await cachedResponse.json();
          console.log(res);
          setchatlist(res);
        } else {
          setchatlist([]);
        }
      } catch (error) {
        console.error("Error opening or retrieving from cache:", error);
      }
    }
  }, []);

  const [currentChat, setcurrentChat] = useState<objectChat[]>(
    store?.idx ? chatlist[store.idx]?.chat : []
  );

  const changenewchat = (flag: boolean) => {
    setnewchat(flag);
  };

  useEffect(() => {
    if (newchat === true) {
      setId(0);
      console.log("ENTREY");
      const data: storag = {
        idx: 0,
      };
      localStorage.setItem("GPTidx", JSON.stringify(data));
      addNewChat();
    }
  }, [newchat]);


  useEffect(() => {
    console.log(currentchatID);
  }, [currentchatID]);

  async function addNewChat() {
    try {
      const cache = await caches.open(cacheName);
      const existingArray = await cache
        .match(stringKey)
        .then((response) => (response ? response.json() : []));
      const newpromts = {
        dateofCreation: new Date(),
        chat: [],
      };
      existingArray.unshift(newpromts);
      setchatlist(existingArray);
      const response = new Response(JSON.stringify(existingArray));
      await cache.put(stringKey, response);
      console.log("Item added to cache successfully.");
    } catch (error) {
      console.error("Error adding item to cache:", error);
    }
  }

  const changecurrentidx = (index: number) => {
    console.log(index);
    const data: storag = {
      idx: index,
    };
    localStorage.setItem("GPTidx", JSON.stringify(data));
    setId(index);
    console.log(chatlist[index]);
    setcurrentChat(chatlist[index]?.chat);
  };

  useEffect(() => {
    if (chatlist.length !== 0) {
      setcurrentChat(chatlist[currentchatID].chat);
      console.log(chatlist);
    }
  }, [chatlist]);

  async function addItemToCache(index: number, chatadd: chatList) {
    try {
      console.log(index + "index");
      const cache = await caches.open(cacheName);
      const existingArray = await cache
        .match(stringKey)
        .then((response) => (response ? response.json() : []));
      existingArray[index] = chatadd;
      const response = new Response(JSON.stringify(existingArray));
      setchatlist(existingArray);
      console.log(existingArray);
      await cache.put(stringKey, response);
      console.log("Item added to cache successfully.");
    } catch (error) {
      console.error("Error adding item to cache:", error);
    }
  }

  async function deleteItemFromCache(index: number) {
    try {
      const cache = await caches.open(cacheName);
      const existingArray = await cache
        .match(stringKey)
        .then((response) => (response ? response.json() : []));

      const newArray = [...existingArray];
      newArray.splice(index, 1);

      const response = new Response(JSON.stringify(newArray));

      changecurrentidx(0);

      setchatlist(newArray);

      await cache.put(stringKey, response);

      console.log("Item deleted from cache successfully.");
    } catch (error) {
      console.error("Error deleting item from cache:", error);
    }
  }

  const changesidebar = (flag: boolean) => {
    setsidebar(flag);
  };

  return (
    <div className="Home">
      {Popup===true && (
        <PopupError changepopup={changepopup}/>
      )}
      <Sidebar
        newchat={newchat}
        changenewchat={changenewchat}
        currentChat={currentChat}
        chatlist={chatlist}
        currentchatID={currentchatID}
        changecurrentidx={changecurrentidx}
        addItemToCache={addItemToCache}
        deleteItemFromCache={deleteItemFromCache}
        sidebar={sidebar}
        changesidebar={changesidebar}
        changepopup={changepopup}
        Popup={Popup}
        
      />
      <Chat
        newchat={newchat}
        changenewchat={changenewchat}
        currentChat={currentChat}
        chatlist={chatlist}
        currentchatID={currentchatID}
        changecurrentidx={changecurrentidx}
        addItemToCache={addItemToCache}
        deleteItemFromCache={deleteItemFromCache}
        sidebar={sidebar}
        changesidebar={changesidebar}
        changepopup={changepopup}
        Popup={Popup}
      />
    </div>
  );
};

export default Home;
