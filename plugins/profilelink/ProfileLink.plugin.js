/**
 * @name ProfileLink
 * @author Connor Doujo
 * @version 1.1.0
 * @description allows you to click on a user's avatar and banner to save them.
 * @authorId 744603004493365330
 * @invite 5V9KFKJRJk
 * @website https://connor.is-a.dev
 * @source https://github.com/ConnorDoesDev/BetterDiscordPlugins/tree/dev/plugins/profilelink
 * @updateUrl https://raw.githubusercontent.com/ConnorDoesDev/BetterDiscordPlugins/dev/plugins/profilelink/ProfileLink.plugin.js
*/

const request = require("request");
const fs = require("fs");
const path = require("path");

const config = {
    info: {
        name: "ProfileLink",
        authors: [{
            name: "Connor Doujo",
            discord_id: "744603004493365330",
        }],
        version: "1.1.0",
        description: "allows you to click on a user's avatar and banner to save them.",
        github: "https://github.com/ConnorDoesDev/BetterDiscordPlugins/tree/dev/plugins/profilelink",
        github_raw: "https://raw.githubusercontent.com/ConnorDoesDev/BetterDiscordPlugins/dev/plugins/profilelink/ProfileLink.plugin.js",
    },
    changelog: [{
        title: "squished that performance issue",
        type: "fixed",
        items: ["when clicking, cpu usage doesnt spike anymore. i dont even know why that happened"],
    }]
};

module.exports = !global.ZeresPluginLibrary
    ? class {
        constructor() { this._config = config; }
        load() {
            BdApi.showConfirmationModal("Library plugin is needed", `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
                confirmText: "Download",
                cancelText: "Cancel",
                onConfirm: () => {
                    request.get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", (error, response, body) => {
                        if (error) return electron.shell.openExternal("https://betterdiscord.app/Download?id=9");
                        fs.writeFileSync(path.join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body);
                    });
                }}
            );
        }
        start() {
            this.load();
        }
        stop() { }
    }
    : (([Plugin, Library]) => {
        const { Patcher } = Library;
        return class ProfileLink extends Plugin {
            onStart() {
               document.addEventListener("click", this.link)
            }

            onStop() {
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
    })(global.ZeresPluginLibrary.buildPlugin(config));