import Quill from "quill";
import { useEffect, useRef } from "react";
import { Input } from "antd";
import Delta from "quill-delta";
import "./test.css";

const { TextArea } = Input;
function Test() {
  const first = useRef(null);
  let quill: Quill;
  useEffect(() => {
    if (first.current) {
      quill = new Quill(first.current, {
        modules: {
          toolbar: null,
        },
        theme: "snow",
      });
    }
  }, []);

  return (
    <>
      <div
        ref={first}
        id="ttt"
        style={{ border: "solid 1px" }}
        className="mx-auto w-80 px-1 sm:w-[600px] "
      >
        <p>123789</p>
      </div>
      <button
        onClick={() => {
          //   quill?.insertText(quill?.getLength(), "Quill", {
          //     link: "Quill",
          //   });
          //   console.log(quill?.getContents().delete(3));
          quill.deleteText(quill.getText().length - 2, 1);
          console.log(
            "quill.getLength()",
            quill.getLength(),
            quill.getText().length
          );
        }}
      >
        1
      </button>
      <button
        onClick={() => {
          //   quill?.insertText(quill?.getLength() - 1, "  sikara", {
          //     link: "Quill",
          //     // color: "red",
          //   });
          quill.clipboard.dangerouslyPasteHTML(
            quill?.getLength() - 1,
            `<a href="https://example.com" class='whitespace-pre text-red-600'> asdad </a>`
          );
          //   quill?.insertText(quill?.getLength() - 1, `<span></span>`);
        }}
      >
        12
      </button>
      <button
        onClick={() => {
          console.log(quill.getContents());
        }}
      >
        getFormat
      </button>
      <button
        onClick={() => {
          const txt = quill.getText();
          console.log("quill.getText()", txt.length);
          quill.deleteText(txt.length, 6);
        }}
      >
        del
      </button>
      {/* <textarea
        rows={3}
        ref={first}
        className="block w-full rounded-md px-1 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      /> */}
    </>
  );
}

export default Test;
