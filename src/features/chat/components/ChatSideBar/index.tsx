import AppAvatar from '@/common/components/avatars/Avatar'
import IconButton from '@/common/components/buttons/IconButton'
import { ChatEvents } from '@/features/chat/constants/events';
import { Message } from '@/features/chat/types';
import socketUtils from '@/networking/socketUtils';
import { faAnglesRight, faPaperPlane, faPlus } from '@fortawesome/free-solid-svg-icons'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CallFramContentType, userStateType, VideoStream } from '../../../rooms/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type ChatSideBarProps = {
  userId: string,
  className?: string,
  userState: userStateType,
  videoStreamsList: CallFramContentType[],
}

function ChatSideBar({ userId, className, userState, videoStreamsList }: ChatSideBarProps) {
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState<Message[]>([]);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isChatInvisible, setIsChatInvisible] = useState<boolean>(false);
  const [isMembersListVisible, setIsMembersListVisible] = useState<boolean>(false);
  const listRef = useRef<HTMLDivElement>(null);
  const [usersHasNotificationsMap, setUsersHasNotificationsMap] = useState<Record<string, boolean>>({});

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
    const handleVisibiltyChange = () => {
      if (!document.hidden && document.title !== "Catfishmeet") {
        document.title = "Catfishmeet";
      }
    };
    document.addEventListener("visibilitychange", handleVisibiltyChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibiltyChange);
    }
  }, []);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const callback = (message: Message) => {
      if (isCollapsed) {
        setUsersHasNotificationsMap((prev) => ({
          ...prev,
          [message.userId]: true,
        }));
        // clear audio if audio already playing
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
        }
        // play notification sound
        const audioElement = new Audio("/audios/notification-sound.mp3");
        audioElement.play();
        // change document title
        document.title = "Catfishmeet (New Message)"
      }
      setMessagesList((prev) => {
        return [
          message,
          ...prev,
        ]
      })
    };

    socketUtils.on(ChatEvents.server.RECEIVE_MESSAGE, callback as () => void);
    return () => {
      socketUtils.off(ChatEvents.server.RECEIVE_MESSAGE, callback as () => void);
    }
  }, [isCollapsed, videoStreamsList]);

  useEffect(() => {
    if (userState == "inCall") {
      if (Object.keys(usersHasNotificationsMap).length) {
        setUsersHasNotificationsMap({});
      }
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
      // clear messages notifications when chat opens
      setUsersHasNotificationsMap({});
      // update state of chat components
      setIsCollapsed(false);
      setIsMembersListVisible(false);
      timeoutRef.current = setTimeout(() => {
        setIsChatInvisible(false);
      }, 250);
    } else {
      setIsCollapsed(true);
      setIsChatInvisible(true);
      timeoutRef.current = setTimeout(() => {
        setIsMembersListVisible(true);
      }, 200);
    }
  }, [isCollapsed]);

  return (
    <>
      {/* toggle chat button */}
      {
        userState === "inCall" &&
        <button
          className={`absolute z-10 top-[22px] right-[13px] rounded-full w-10 h-10 cursor-pointer duration-300 transition-all ${isCollapsed ? "-rotate-180 bg-slate-800 hover:bg-slate-700" : "bg-slate-900 hover:bg-slate-800"}`}
          onClick={handleToogleChat}
        >
          <FontAwesomeIcon
            icon={faAnglesRight}
          />
        </button>
      }

      <div className={`flex flex-col max-h-[calc(100vh-144px)] overflow-hidden justify-end ${isCollapsed ? "items-center py-4" : "py-2"} h-full rounded-2xl bg-slate-900 transition-all duration-300 ${generateSidebarDimentions()} ${className}`}>
        {/* header */}
        {
          userState === "inCall" && !isChatInvisible &&
          <div className={`flex py-4 px-4 gap-4 border-b border-slate-800 flex-wrap pr-14`}>
            <AppAvatar />
            <div>
              <h2 className='font-bold'>Guest</h2>
              <p className='text-xs font-bold whitespace-nowrap'>🏳️ {Intl.DateTimeFormat().resolvedOptions().timeZone.replaceAll("/", ", ")}</p>
            </div>
          </div>
        }
        {/* messages list */}
        {
          !isChatInvisible && userState === "inCall" &&
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
                    <p className='text-sm font-semibold text-slate-500'>Guest {userId === message.userId ? "(you)" : ""}</p>
                    <p className='text-sm font-semibold text-slate-200'>{message.messageContent}</p>
                  </div>
                </div>
              ))
            }
          </div>
        }

        {/* input and send button container */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className={`relative bg-slate-800 rounded-full mx-3 my-2 ${userState === "inCall" && !isChatInvisible ? "visible pointer-events-auto opacity-100 transition-all duration-300 translate-y-0" : "invisible pointer-events-none opacity-0 translate-y-2"}`}
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
        {/* users list */}
        <div className={`flex flex-col gap-4 transition-all duration-300 ${userState === "inCall" && isMembersListVisible ? "h-auto w-auto visible pointer-events-auto opacity-100" : "h-0 w-0 invisible pointer-events-none opacity-0"}`}>
          {
            videoStreamsList.map(stream => (
              <AppAvatar
                key={stream.id}
                hasNotification={usersHasNotificationsMap[(stream.content as VideoStream).userId]}
              />
            ))
          }
          <IconButton
            icon={faPlus}
            isRounded
            className='cursor-pointer hover:rotate-90 duration-300 transition-all'
          />
        </div>
      </div>
    </>
  )
}

export default ChatSideBar