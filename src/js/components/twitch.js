/**
 * Twitch embed component
 */
const twitch = function () {
  const twitchEmbed = document.getElementById("twitch-embed");

  if (twitchEmbed) {
    twitchEmbed.innerHTML = "";

    // Twitch embed is loaded via external script
    if (typeof Twitch !== "undefined") {
      new Twitch.Embed("twitch-embed", {
        width: 1440,
        height: 620,
        channel: "dieSeriale",
        parent: ["die-seriale.de", "www.die-seriale.de"],
      });
    }

    document.body.classList.add("live");
  }
};

export default twitch;
