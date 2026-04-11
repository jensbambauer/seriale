import React from "react";

export default function SpeakerPreview({ entry, widgetFor, getAsset }) {
  const image = getAsset(entry.getIn(["data", "image"]));

  return (
    <div className="mw6 center ph3 pv4">
      <h1 className="f2 lh-title b mb3">{entry.getIn(["data", "title"])}</h1>
      {image && (
        <img
          src={image}
          alt={entry.getIn(["data", "title"])}
          style={{
            maxWidth: "200px",
            borderRadius: "50%",
            marginBottom: "1rem",
          }}
        />
      )}
      {entry.getIn(["data", "shortdescription"]) && (
        <p style={{ fontStyle: "italic", color: "#666", marginBottom: "1rem" }}>
          {entry.getIn(["data", "shortdescription"])}
        </p>
      )}
      <div className="cms mw6">{widgetFor("body")}</div>
    </div>
  );
}
