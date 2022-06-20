/**
 * @name ProfileLink
 * @author Connor!#0800
 * @version 1.0.0
 * @description allows you to click on a user's avatar and banner to save them.
 */

module.exports = class LinkBanner {
    start() {
        document.addEventListener("click", this.link)
    }
    stop() {
        document.removeEventListener("click", this.link)
    }
    link({target}) {
        if (target.style.backgroundImage && target.style.backgroundImage.includes("banner")) {
            let url = target.style.backgroundImage
            url = url.substring(4, url.length-1).replace(/["']/g, "")
            url = url.replace(/(?:\?size=\d{3,4})?$/, "?size=4096")
            window.open(url)
        } else if (target.classList.contains("avatar-3QF_VA") && target.parentElement?.parentElement?.classList.contains("header-S26rhB")) {
            window.open(target.querySelector("img").src.replace(/(?:\?size=\d{3,4})?$/, "?size=4096"), "_blank");
          }
    }
}
