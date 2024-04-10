import React from "react";
import loading from "../images/loading.svg";

const Loading = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <img src={loading} alt="Loading" />
</div>

);

export default Loading;