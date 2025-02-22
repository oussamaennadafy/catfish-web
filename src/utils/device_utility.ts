export class DeviceUtility {
  static isMobile() {
    if (typeof window !== "undefined")
      return window.innerWidth < 768;
  }

  static isTablet() {
    if (typeof window !== "undefined")
      return window.innerWidth >= 768 && window.innerWidth < 1024;
  }

  static isDesktop() {
    if (typeof window !== "undefined")
      return window.innerWidth >= 1024;
  }

}