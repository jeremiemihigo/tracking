import React from 'react';
function App() {
  const fileRef = React.useRef(null);

  // const onChangeHandler = (e) => {
  //   e.preventDefault();
  //   if (e.target.files && e.target.files[0]) {
  //     onDrop(e.target.files[0]);
  //   }
  // };
  const onDrop = (file) => {
    console.log(file);
  };

  const onButtonClick = () => {
    fileRef.current.click();
  };

  return (
    <div className="App">
      {/* <input type="file" className="inputFile" name="file" onDrop={onChangeHandler} ref={fileRef} id="input-file-upload" /> */}
      <label htmlFor="input-file-upload" id="label-file-upload" onDrop={(e) => onDrop(e.dataTransfer.files[0])}>
        <div>
          <button style={{ display: 'block', margin: 'auto' }} onClick={onButtonClick}>
            Add File
          </button>
          Drag and drop files
        </div>
      </label>
      <button>Submit</button>
    </div>
  );
}

export default App;
