import React from "react";

export default function PilotPreview({ entry, widgetFor, getAsset }) {
  const image = getAsset(entry.getIn(["data", "image"]));

  return (
    <div className="mw6 center ph3 pv4">
      <h1 className="f2 lh-title b mb3">{entry.getIn(["data", "title"])}</h1>
      {image && (
        <img
          src={image}
          alt={entry.getIn(["data", "title"])}
          style={{ maxWidth: "100%", marginBottom: "1rem" }}
        />
      )}
      <div className="cms mw6">{widgetFor("body")}</div>
    </div>
  );
}
