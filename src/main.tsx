import React from "react";
import { createRoot } from "react-dom/client";
import Square from "./lib/Square";

createRoot(document.getElementById("root")).render(
	<Square size={250} direction="DTL" smooth />
);
module.exports = {};
