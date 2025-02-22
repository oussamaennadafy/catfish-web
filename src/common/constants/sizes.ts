import { DeviceUtility } from "@/utils/device_utility";

export const HEADER_HEIGHT = "40px";

export const TAB_BAR_HEIGHT = "40px";

const CONATINER_PADDING = DeviceUtility.isMobile() ? "8px" : "32px";

const CONATINER_GAP = DeviceUtility.isMobile() ? "8px" : "32px";

export const CALLFRAM_HEIGHT = `calc(100svh - ${HEADER_HEIGHT} - ${TAB_BAR_HEIGHT} - ${CONATINER_PADDING} - ${CONATINER_GAP})`