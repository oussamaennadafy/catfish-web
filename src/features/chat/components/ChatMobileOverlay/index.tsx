import IconButton from '@/common/components/buttons/IconButton';
import { CallFramContentType, userStateType } from '@/features/rooms/types';
import socketUtils from '@/networking/socketUtils';
import { faComment, faCommentSlash, faPaperPlane, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChatEvents } from '../../constants/events';
import { Message } from '../../types';
import AppAvatar from '@/common/components/avatars/Avatar';

type ChatMobileOverlayProps = {
  userState: userStateType,
  userId: string,
  videoStreamsList: CallFramContentType[],
}

function ChatMobileOverlay({ userState, userId, videoStreamsList }: ChatMobileOverlayProps) {
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState<Message[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasNewMessages, setHasNewMessages] = useState(0);

  const handleSendMessage = useCallback(() => {
    if (isChatOpen && message.trim().length !== 0) {
      // emit message
      socketUtils.emit(ChatEvents.client.SEND_MESSAGE, {
        userId,
        messageContent: message.trim(),
        userName: "Guest",
      } as Message)

      // clear input
      setMessage("");
      return;
    }
    setIsChatOpen(prev => !prev);
  }, [isChatOpen, message, userId]);

  useEffect(() => {
    if (userState !== "inCall") {
      if (isChatOpen) {
        setIsChatOpen(false);
      }
      if (message?.length !== 0) {
        setMessage("");
      }
      if (hasNewMessages > 0) {
        setHasNewMessages(0);
      }
    }
  }, [hasNewMessages, isChatOpen, message?.length, userState]);

  useEffect(() => {
    if (isChatOpen) {
      if (hasNewMessages > 0) {
        setHasNewMessages(0);
        if(!listRef.current) return;
        listRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [hasNewMessages, isChatOpen])

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!listRef.current) return;
    if (listRef.current?.scrollTop < 0) {
      listRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [messagesList.length]);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const callback = (message: Message) => {
      if (!isChatOpen) {
        // clear audio if audio already playing
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
        }
        // play notification sound
        const audioElement = new Audio("/audios/notification-sound.mp3");
        audioElement.play();
        // change document title
        document.title = "Catfishmeet (New Message)"

        // show notification to user
        setHasNewMessages(prev => prev + 1);
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
  }, [isChatOpen, videoStreamsList]);


  useEffect(() => {
    if (userState == "inCall") {
      if (messagesList.length) {
        setMessagesList([]);
      } if (message.length) {
        setMessage("");
      }
    }
  }, [userState]);

  const getButtonIcon = useCallback((): IconDefinition => {
    if (isChatOpen && message.trim().length !== 0) return faPaperPlane;
    if (isChatOpen) return faCommentSlash;
    return faComment;
  }, [isChatOpen, message]);

  return (
    <div
      className='absolute bottom-2 left-2 rounded-lg w-[calc(100vw-32px)] md:w-[calc(100vw-48px)] h-[calc((100%-16px)/2)] flex flex-col justify-center'
    >
      {/* messages list */}
      <div
        className={`h-full w-full py-2 overflow-scroll flex gap-2 flex-col-reverse transition-all mask-y-from-10% mask-y-to-100% ${isChatOpen ? "opacity-100 visible pointer-events-auto translate-x-0" : "opacity-0 invisible pointer-events-none translate-x-2"}`}
        ref={listRef}
        onScroll={(e) => {
          console.log({
            "e.currentTarget.scrollHeight": e.currentTarget.scrollHeight,
            "e.currentTarget.scrollTop": e.currentTarget.scrollTop,
          });
        }}
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 100%)"
        }}
      >
        {
          messagesList.map((message, index) => (
            <div
              key={`${message.userName}-${message.userId}-${index}`}
              className={`flex px-2 gap-1 ${userId === message.userId ? "text-left" : "flex-row-reverse text-right"}`}
            >
              <AppAvatar
                size={32}
                className='mt-1'
              />
              <div>
                <p className='text-sm font-semibold text-slate-300'>Guest {userId === message.userId ? "(you)" : ""}</p>
                <p className='text-sm font-semibold text-slate-100'>{message.messageContent}</p>
              </div>
            </div>
          ))
        }
      </div >
      {/* messages form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className={`h-12 w-[calc(100%-56px)] rounded-full`}
      >
        {/* input message */}
        <input
          className={`w-full h-full p-5 transition-all rounded-full bg-slate-800/50 outline-0 ${isChatOpen ? "opacity-100 visible pointer-events-auto translate-x-0" : "opacity-0 invisible pointer-events-none translate-x-2"}`}
          placeholder='Say Hi 👋'
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        {/* submit button */}
        <IconButton
          icon={getButtonIcon()}
          isRounded
          badgeNumber={hasNewMessages > 0 ? hasNewMessages : undefined}
          type="submit"
          onClick={handleSendMessage}
          className={`absolute right-0 bottom-0 max-w-fit transition-all h-12 w-12 bg-slate-800/50 border-0 ${userState === "inCall" ? "opacity-100 visible pointer-events-auto scale-100" : "opacity-0 invisible pointer-events-none scale-0"}`}
        />
      </form >
    </div >
  )
}

export default ChatMobileOverlay