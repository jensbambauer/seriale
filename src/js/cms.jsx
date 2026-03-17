import CMS from "decap-cms-app";

import HomePreview from "./cms-preview-templates/home.jsx";
import PostPreview from "./cms-preview-templates/post.jsx";
import ProductsPreview from "./cms-preview-templates/products.jsx";
import ValuesPreview from "./cms-preview-templates/values.jsx";
import ContactPreview from "./cms-preview-templates/contact.jsx";

// Custom color widget
const ColorControl = ({ value, onChange }) => (
  <input
    style={{ height: "80px" }}
    type="color"
    value={value || "#000000"}
    onChange={(e) => onChange(e.target.value)}
  />
);

// Initialize CMS
CMS.init();

// Register preview styles
CMS.registerPreviewStyle("/css/main.css");

// Register preview templates
CMS.registerPreviewTemplate("home", HomePreview);
CMS.registerPreviewTemplate("post", PostPreview);
CMS.registerPreviewTemplate("products", ProductsPreview);
CMS.registerPreviewTemplate("values", ValuesPreview);
CMS.registerPreviewTemplate("contact", ContactPreview);

// Register custom widgets
CMS.registerWidget("color", ColorControl);
