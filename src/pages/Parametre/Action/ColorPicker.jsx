import { Sketch } from '@uiw/react-color';

function ColorPicker({ setHex, hex }) {
  return (
    <Sketch
      style={{ marginLeft: 20 }}
      color={hex}
      onChange={(color) => {
        setHex(color.hex);
      }}
    />
  );
}
export default ColorPicker;
