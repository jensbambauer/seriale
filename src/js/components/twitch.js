import jQuery from "jquery";
import {TimelineLite, Power4, Power0, TweenLite} from "gsap";
/**
 *
 * @author
 * @description
 *
 */

/*jslint browser: true*/

const twitch = function() {
  if ($("#twitch-embed").length > 0) {
    $("#twitch-embed").empty();
    new Twitch.Embed("twitch-embed", {
      width: 1440,
      height: 620,
      channel: "dieSeriale",
      // only needed if your site is also embedded on embed.example.com and othersite.example.com
      parent: ["die-seriale.de", "www.die-seriale.de"]
    });

    document.body.classList.add("live");
  }
};

export default twitch;
