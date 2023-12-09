export interface ChildComponentProps{
    newchat:boolean,
    changenewchat: (flag: boolean,) => void,
    currentChat:objectChat[],
    chatlist:chatList[],
    currentchatID:number,
    changecurrentidx: (index:number) => void,
    addItemToCache: (index:number, chatadd:chatList) =>void,
    deleteItemFromCache: (index:number) => void,
    sidebar:boolean,
    changesidebar:(flag:boolean) =>void,
    changepopup: (flag:boolean)=>void,
    Popup:boolean
}

export interface popupinterface {
    changepopup: (flag:boolean)=>void
}

export interface samplechat{
    sampletext: (query:string) =>void,
    changenewchat: (flag: boolean) =>void
}

export interface objectChat {
    query: string,
    content: string,
    index:Number
}

export interface chatList{
    dateofCreation:Date,
    chat:objectChat[],
}

export interface currentChat{
    chat:objectChat[]
}