import React, { useState } from "react";

const TextComponent = () => {
  const [data, setData] = useState([
    { name: "", age: "" },
    { name: "", age: "" },
  ]);
  return (
    <div>
      egrfsaeg
      <form>
        {data.map((d, i) => {
          return <p key={i}>{d.name} hfg</p>;
        })}
      </form>
    </div>
  );
};

export default TextComponent;
