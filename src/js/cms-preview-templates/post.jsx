import React from "react";
import { format } from "date-fns";

export default function PostPreview({ entry, widgetFor, getAsset }) {
  let image = getAsset(entry.getIn(["data", "image"]));
  const date = entry.getIn(["data", "date"]);

  return (
    <div className="mw6 center ph3 pv4">
      <h1 className="f2 lh-title b mb3">{entry.getIn(["data", "title"])}</h1>
      <div className="flex justify-between grey-3">
        <div style={{ width: "80px", height: "80px" }}></div>
        <p>{date ? format(new Date(date), "EEE, MMM d, yyyy") : ""}</p>
        <p>Read in x minutes</p>
      </div>
      <div className="cms mw6">
        <p>{entry.getIn(["data", "description"])}</p>
        {image && (
          <img src={image} alt={entry.getIn(["data", "title"])} />
        )}
        {widgetFor("body")}
      </div>
    </div>
  );
}
