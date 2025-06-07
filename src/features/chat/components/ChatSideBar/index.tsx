import AppAvatar from '@/common/components/avatars/Avatar'
import IconButton from '@/common/components/buttons/IconButton'
import { ChatEvents } from '@/features/chat/constants/events';
import { Message } from '@/features/chat/types';
import socketUtils from '@/networking/socketUtils';
import { faAnglesRight, faPaperPlane, faPlus } from '@fortawesome/free-solid-svg-icons'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { userStateType } from '../../../rooms/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type ChatSideBarProps = {
  userId: string,
  className?: string,
  userState: userStateType,
}

function ChatSideBar({ userId, className, userState }: ChatSideBarProps) {
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState<Message[]>([]);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isChatInvisible, setIsChatInvisible] = useState<boolean>(false);
  const listRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = useCallback(() => {
    // check message content
    if (message.trim().length === 0) return;

    // emit message
    socketUtils.emit(ChatEvents.client.SEND_MESSAGE, {
      userId,
      messageContent: message.trim(),
      userName: "Guest",
    } as Message)

    // clear input
    setMessage("");
  }, [message, setMessage, userId]);

  // scroll to end 
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({
        behavior: "smooth",
        top: listRef.current.scrollHeight,
      });
    }
  }, [messagesList]);

  useEffect(() => {
    const callback = (message: Message) => {
      setMessagesList((prev) => {
        return [
          message,
          ...prev,
        ]
      })
    }
    socketUtils.on(ChatEvents.server.RECEIVE_MESSAGE, callback as () => void);
    return () => {
      socketUtils.off(ChatEvents.server.RECEIVE_MESSAGE, callback as () => void);
    }
  });

  useEffect(() => {
    if (userState == "inCall") {
      if (messagesList.length) {
        setMessagesList([]);
      } if (message.length) {
        setMessage("");
      }
    }
  }, [userState]);

  const generateSidebarDimentions = useCallback(() => {
    if (userState === "inCall" && !isCollapsed) {
      return "w-3/12 border border-slate-800"
    }

    if (userState === "inCall" && isCollapsed) {
      return "w-18 border border-slate-800"
    }

    return "w-0 border-0 border-transparent";
  }, [userState, isCollapsed]);

  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const handleToogleChat = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (isCollapsed) {
      setIsCollapsed(false);
      timeoutRef.current = setTimeout(() => {
        setIsChatInvisible(false);
      }, 250);
    } else {
      setIsCollapsed(true);
      setIsChatInvisible(true);
    }
  }, [isCollapsed]);

  return (
    <>
      {/* toggle chat button */}
      {
        userState === "inCall" &&
        <button
          className={`absolute top-[94px] right-[30px] rounded-full w-10 h-10 cursor-pointer hover:bg-slate-800 duration-300 transition-all ${isCollapsed ? "-rotate-180" : ""}`}
          onClick={handleToogleChat}
        >
          <FontAwesomeIcon
            icon={faAnglesRight}
          />
        </button>
      }

      <div className={`flex flex-col max-h-[calc(100vh-144px)] justify-end ${isCollapsed ? "items-center py-4" : "py-2"} h-full rounded-2xl bg-slate-900 transition-all duration-300 ${generateSidebarDimentions()} ${className}`}>
        {/* header */}
        {
          userState === "inCall" && !isChatInvisible &&
          <div className='flex py-4 px-4 h-22 gap-4 border-b border-slate-800'>
            <AppAvatar />
            <div>
              <h2 className='font-bold'>Guest</h2>
              <p className='text-xs font-bold'>🏳️‍🌈 dubai</p>
            </div>
          </div>
        }
        {/* messages list */}
        {
          !isChatInvisible &&
          <div
            style={{
              maxHeight: "calc(100vh - 300px)"
            }}
            ref={listRef}
            className='flex flex-col-reverse h-full py-2 overflow-scroll'
          >
            {
              messagesList.map((message, index) => (
                <div
                  key={`${message.userName}-${message.userId}-${index}`}
                  className={`flex px-2 py-1 gap-2 ${userId === message.userId ? "text-left" : "flex-row-reverse text-right"}`}
                >
                  <AppAvatar
                    size={32}
                    className='mt-1'
                  />
                  <div>
                    <p className='text-sm font-bold text-slate-400'>Guest</p>
                    <p className='text-sm font-bold'>{message.messageContent}</p>
                  </div>
                </div>
              ))
            }
          </div>
        }

        {/* input and send button container */}
        {
          userState === "inCall" && !isChatInvisible &&
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="relative bg-slate-800 rounded-full m-3 mt-1"
          >
            {/* input message */}
            <input
              className='h-14 w-full rounded-full p-5 pr-14 focus:outline focus:outline-slate-400 border border-slate-700'
              placeholder='Say Hi 👋'
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            {/* submit button */}
            <IconButton
              icon={faPaperPlane}
              isRounded
              type="submit"
              onClick={handleSendMessage}
              className={`absolute right-2 top-1/2 -translate-y-1/2 max-w-fit transition-all ${message.trim().length === 0 ? "scale-0" : "scale-100"}`}
            />
          </form>
        }
        {/* users list */}
        {
          userState === "inCall" && isCollapsed &&
          <div className='flex flex-col gap-4'>
            <AppAvatar />
            <AppAvatar />
            <IconButton
              icon={faPlus}
              isRounded
              className='cursor-pointer hover:rotate-90 duration-300 transition-all'
            />
          </div>
        }
      </div>
    </>
  )
}

export default ChatSideBar