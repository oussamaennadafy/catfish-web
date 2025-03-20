import { CallFramContentType, VideoStream } from '@/features/callHub/types'
import React, { useRef } from 'react'
import CallFramPlaceHolder from '../../../CallFramStates/CallFramPlaceHolder';
import CallFramLoader from '../../../CallFramStates/CallFramLoader';
import CallFramIllustration from '../../../CallFramStates/CallFramIllustration';
import Video from '@/common/components/videos/Video';
import { useSpring, animated, } from "@react-spring/web";
import { useDrag } from '@use-gesture/react'
import CallFramAvatar from '../../../CallFramStates/CallFramAvatar';

type PopupCallFramProps = {
  callFramContent: CallFramContentType["content"],
}

function PopupCallFram({ callFramContent }: PopupCallFramProps) {
  const AnimatedDiv = animated<React.ElementType>("div");
  const ref = useRef<HTMLDivElement>(null);
  // Track previous position
  const posRef = useRef({ x: 0, y: 0 });

  // Set the drag hook and define component movement based on gesture data
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ down, movement: [mx, my], first }) => {
    if (first) {
      // Store the starting position when drag begins
      posRef.current = { x: x.get(), y: y.get() };
    }

    if (down) {
      // Apply movement from the initial position
      api.start({
        x: posRef.current.x + mx,
        y: posRef.current.y + my,
        immediate: true
      });
    } else if (ref.current) {
      // When released, snap to corner
      const POP_UP_WIDTH = ref.current.clientWidth;
      const POP_UP_HEIGHT = ref.current.clientHeight;
      const FRAME_WIDTH = Number(ref.current.clientWidth) * 4;
      const FRAME_HEIGHT = Number(ref.current.clientHeight) * 4;
      const horizontalMedian = (FRAME_WIDTH / 2) - (POP_UP_WIDTH / 2) - 8;
      const verticalMedian = (FRAME_HEIGHT / 2) - (POP_UP_HEIGHT / 2) - 8;

      // Get final position (current position after drag)
      const finalX = posRef.current.x + mx;
      const finalY = posRef.current.y + my;

      if (finalX > -horizontalMedian && finalY < verticalMedian) {
        api.start({ x: 0, y: 0 });
      } else if (finalX > -horizontalMedian && finalY >= verticalMedian) {
        api.start({ x: 0, y: FRAME_HEIGHT - POP_UP_HEIGHT - 8 * 2 });
      } else if (finalX <= -horizontalMedian && finalY < verticalMedian) {
        api.start({ x: -FRAME_WIDTH + POP_UP_WIDTH + 8 * 2, y: 0 });
      } else if (finalX <= -horizontalMedian && finalY >= verticalMedian) {
        api.start({ x: -FRAME_WIDTH + POP_UP_WIDTH + 8 * 2, y: FRAME_HEIGHT - POP_UP_HEIGHT - 8 * 2 });
      }
    }
  });

  let content: React.ReactNode;
  switch (callFramContent) {
    case "illustration":
      content = <CallFramIllustration />
      break;
    case "loader":
      content = <CallFramLoader />
      break;
    case "placeHolder":
      content = <CallFramPlaceHolder />
      break;
    default:
      content =
        <>
          <Video
            srcObject={(callFramContent as VideoStream).stream}
            muted={(callFramContent as VideoStream).isMuted}
            autoPlay
            className="h-full w-full object-cover -scale-x-100"
          />
          {
            !callFramContent.isCameraOpen &&
            //  audio fram overlay 
            <div className='absolute top-0 left-0 right-0 bottom-0 w-full h-full'>
              <CallFramAvatar className='rounded-xl' />
            </div>
          }
        </>
  }
  return (
    <AnimatedDiv ref={ref} {...bind()} style={{ touchAction: "none", x, y }} className='absolute top-2 right-2 w-1/4 h-1/4 z-10 overflow-hidden items-center rounded-xl justify-center bg-[#161931]'>
      {content}
    </AnimatedDiv>
  )
}

export default PopupCallFram