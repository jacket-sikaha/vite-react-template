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
const textParseHTML = (target: string) => {
  // href的值必须唯一 不然就不能转 a 标签成功
  // replace只会替换第一个实例。如需替换所有实例，请使用带有 g 修饰符集的正则表达式
  let res = "";
  target.split("\n").forEach((line) => {
    if (!line) {
      return;
    }
    let tmp = line;
    line.match(/#[\u4e00-\u9fff\w\d]+\s/gm)?.forEach((str) => {
      tmp = tmp.replace(
        new RegExp(str, "g"),
        `<a href="${v4()}" style="color: rgb(153, 51, 255);">${str}</a>`
      );
    });
    line.match(/@[\u4e00-\u9fff\w\d]+\s/gm)?.forEach((str) => {
      tmp = tmp.replace(new RegExp(str, "g"), `<a href="${v4()}">${str}</a>`);
    });
    res += `<p>${tmp}</p>`;
  });
  return res;
};
const ReactQuillEditor: React.FC<ReactQuillProps> = ({
  value,
  onChange,
  showDrawer,
}) => {
  // const [htmlVal, setHtmlVal] = useState(value);
  const reactQuillEditor = useRef(null);
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

    let res = editor.getText();
    console.log("res111", res);
    // a?.forEach((str, i) => {
    //   if (b[i].indexOf(str.trim()) !== -1 && b[i].length !== str) {
    //     newVal = newVal.replace();
    //   }
    // });
    if (
      typeof value?.text === "string" &&
      value?.text.length > editor.getLength()
    ) {
      // console.log(
      //   "new",
      //   editor.getText().match(/@[\u4e00-\u9fff\w\d]+/gm),
      //   "old",
      //   value?.text.match(/@[\u4e00-\u9fff\w\d]+/gm)
      // );
      const tempStr = editor.getText();
      const temp = [...res.matchAll(/@[\u4e00-\u9fff\w\d]+/gm)];
      const flag = temp.map((item, i) => {
        if (typeof item.index === "undefined") {
          return;
        }
        return (
          res.slice(
            item.index + item[0].length,
            item.index + item[0].length + 1
          ) !== " "
        );
      });
      console.log("flag", flag);
      flag.forEach((a, i) => {
        if (a) {
          res =
            tempStr.slice(0, temp[i].index) +
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            tempStr.slice(temp[i].index! + temp[i][0].length);
          // console.log(
          //   i,
          //   tempStr.slice(0, temp[i].index) +
          //     tempStr.slice(temp[i].index! + temp[i][0].length)
          // );
        }
      });
      // console.log("res", textParseHTML(res));
      newVal = textParseHTML(res);
    }
    if (lastStr === "#") {
      showDrawer(false, currentLocaton);
    }
    if (lastStr === "@") {
      showDrawer(true, currentLocaton);
    }
    onChange?.({ html: newVal, text: editor.getText() || "" });
  };

  // console.log(123, value?.html);
  return (
    <>
      <ReactQuill
        //   theme="snow"
        modules={{ toolbar: null }}
        ref={reactQuillEditor}
        value={
          value?.html || ``
          // `<p>
          //     adwer
          //     <a href="#asdth" style="color: rgb(153, 51, 255);" target="_blank">#asdth </a>
          //     12423sdf
          //     <a href="@sdfsedf" target="_blank">@sdfsedf </a>
          //   </p>`
        }
        onChange={handleChangeValue}
        className="mx-auto w-80 min-h-[120] sm:w-[600px] rounded-md focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </>
  );
};

export default ReactQuillEditor;
