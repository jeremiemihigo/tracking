import React from 'react';
import Result from 'pages/TakeAction/Result';

function OpenResult({ data }) {
  return (
    <div style={{minWidth:'35rem'}}>
      {data.map((index, key) => {
        return (
          <React.Fragment key={key}>
            <Result index={index} />
          </React.Fragment>
        );
      })}
    </div>
  );
}
export default OpenResult;
