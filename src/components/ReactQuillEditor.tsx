import { useRef, useState } from "react";
import ReactQuill from "react-quill";
// import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css"; // 导入 Quill 的 CSS 文件
import { v4 } from "uuid";

interface ReactQuillProps {
  value?: { html: string; text: string };
  onChange?: (value: { html: string; text: string }, flag?: number) => void;
  showDrawer: (type: boolean, index?: number) => void;
}

const ReactQuillEditor: React.FC<ReactQuillProps> = ({
  value,
  onChange,
  showDrawer,
}) => {
  // const [htmlVal, setHtmlVal] = useState(value);
  const reactQuillEditor = useRef<ReactQuill>(null);
  // 剩下参数 delta: DeltaStatic, source: Sources, editor: ReactQuill.UnprivilegedEditor
  const handleChangeValue = (
    newVal: string,
    delta: any,
    source: any,
    editor: ReactQuill.UnprivilegedEditor
  ) => {
    console.log("HTML()", editor.getHTML());

    // console.log("Length()", editor.getLength());

    // console.log("Selection()", editor.getSelection());

    // 结尾还有一个隐藏的 \n
    // const lastStr = editor.getText().slice(-2);
    const currentLocaton = editor.getSelection()?.index;
    const lastStr = editor.getText().slice(currentLocaton - 1, currentLocaton);

    // console.log(
    //   "lastStr",
    //   lastStr,
    //   editor.getSelection(),
    //   editor.getText().slice(0, currentLocaton)
    // );
    // console.log(
    //   "fe",
    //   editor.getText().slice(0, currentLocaton),
    //   "en",
    //   editor.getText().slice(currentLocaton, editor.getLength())
    // );
    // const a = editor.getText().match(/@[\u4e00-\u9fff\w\d]+\s/gm);

    // let res = editor.getText();

    if (lastStr === "#") {
      showDrawer(false, currentLocaton);
    }
    // if (lastStr === "@") {
    //   showDrawer(true, currentLocaton);
    // }
    onChange?.({
      html: newVal,
      text: editor.getText() || "",
    });
  };

  return (
    <>
      <ReactQuill
        modules={{ toolbar: null }}
        ref={reactQuillEditor}
        value={value?.html || ``}
        onChange={handleChangeValue}
        className="mx-auto w-80 min-h-[120] sm:w-[600px] rounded-md focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </>
  );
};

export default ReactQuillEditor;
