import { MessageOutlined, PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, Drawer, Form, Modal, Upload, message } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import {
  Box,
  Checkbox,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { v4 } from "uuid";
import { useEffect, useRef, useState } from "react";
import { getFollower, getTopic, postImage } from "../services/note";
import ReactQuillEditor from "../components/ReactQuillEditor";
import { useForm } from "antd/es/form/Form";
import { useQuery } from "react-query";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

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
function PostNote() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [clickType, setClickType] = useState(false);
  const focusFlag = useRef(false);
  const [cursorIndex, setCursorIndex] = useState(-1);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [userList, setUserList] = useState<any[]>(
    [
      "小明",
      "大华",
      "张三",
      "李四",
      "王五",
      "赵六",
      "陈七",
      "刘八",
      "吴九",
      "钱十",
      "周十一",
      "孙十二",
      "郑十三",
      "马十四",
      "黄十五",
      "朱十六",
    ].map((str) => ({
      id: str,
      nickName: str,
      avatar:
        "https://market-1312547758.cos.ap-beijing.myqcloud.com/avatar/2022/09/28/07B443B492E19CCB8430A26D391E5E3E.png",
    }))
  );
  const [userSelected, setUserSelected] = useState<number[]>([]);

  const [form] = useForm();

  const { data: dataTopic } = useQuery({
    queryKey: ["getTopic"],
    queryFn: () => getTopic(),
  });

  const { data: dataFollower, isFetching } = useQuery({
    queryKey: ["getFollower"],
    queryFn: () => getFollower(),
    // onSuccess(data) {
    //   const temp = new Map();
    // },
  });

  const showDrawer = (type: boolean, index?: number) => {
    focusFlag.current = typeof index !== "number" ? false : true;
    setCursorIndex(index ?? -1);
    setOpen(true);
    setClickType(type);
  };

  const onClose = () => {
    setOpen(false);
    focusFlag.current = false;
  };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type.includes("image");
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      return Upload.LIST_IGNORE;
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("Image must smaller than 5MB!");
      return Upload.LIST_IGNORE;
    }
    return isJpgOrPng && isLt5M;
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handleUpload = async () => {
    const formData = new FormData();
    const file = fileList.slice(-1)[0];
    formData.append("file", file.originFileObj as RcFile);
    formData.append("objectName", file.name);
    formData.append("folder", "");
    const res = await postImage(formData).catch((e) => {
      setFileList(() => {
        file.status = "error";
        return [...fileList.slice(0, -1), file];
      });
      message.error(e);
      throw e;
    });
    message.success("upload successfully.");
    setFileList(() => {
      file.status = "done";
      file.url = res.result;
      return [...fileList.slice(0, -1), file];
    });
  };

  const handleToggle = (id: number, value: string) => () => {
    const newChecked = new Set(userSelected);
    newChecked.add(id);
    handleAddUserOrTopic(value, "@");
    setUserSelected([...newChecked]);
  };

  const handleAddUserOrTopic = (value: string, type: "@" | "#") => {
    let str = "";
    if (!focusFlag.current) {
      str =
        form.getFieldValue("content").text.slice(0, -1) + `${type}${value} `;
    } else {
      str = form.getFieldValue("content").text;
      str =
        str.slice(0, cursorIndex) +
        `${value} ` +
        str.slice(cursorIndex, str.length);
    }
    form.setFieldValue("content", {
      html: textParseHTML(str),
    });
    onClose();
  };

  const handleFinish = async (value: any) => {
    console.log("value", value);
    const tempMap = new Map();
    dataFollower?.result.forEach(({ id, nickName }) => {
      if (userSelected.includes(id)) {
        tempMap.set(id, nickName);
      }
    });

    const callUsers = value.content.text
      .match(/@[\u4e00-\u9fff\w\d]+/gm)
      .map((str: string) => str.substring(1));
    const topics = value.content.text
      .match(/#[\u4e00-\u9fff\w\d]+/gm)
      .map((str: string) => str.substring(1));
    console.log("111", value.content.text.match(/@[\u4e00-\u9fff\w\d]+\s/gm));
    console.log("222", value.content.text.match(/@[\u4e00-\u9fff\w\d]+/gm));
    console.log(
      "333",
      [...value.content.text.matchAll(/@[\u4e00-\u9fff\w\d]+/gm)].map(
        (item, i) =>
          // value.content.text.slice(
          //   item.index + item[0].length,
          //   item.index + item[0].length + 1
          // )
          // value.content.text.slice(item.index, item.index + item[0].length)
          value.content.text.slice(0, item.index) +
          value.content.text.slice(item.index + item[0].length)
      )
    );
  };

  // useEffect(() => {
  //   // 检查浏览器是否支持Geolocation API
  //   if (window.navigator.geolocation) {
  //     // 获取当前位置信息
  //     window.navigator.geolocation.getCurrentPosition(
  //       function (position) {
  //         // 成功回调函数
  //         const latitude = position.coords.latitude; // 经度
  //         const longitude = position.coords.longitude; // 纬度
  //         const altitude = position.coords.altitude; // 海拔高度（可选）

  //         // 在此处对位置信息进行处理
  //         console.log("Latitude:", latitude);
  //         console.log("Longitude:", longitude);
  //         console.log("Altitude:", altitude);
  //       },
  //       function (error) {
  //         // 失败回调函数
  //         console.error("Error code:", error.code);
  //         console.error("Error message:", error.message);
  //       }
  //     );
  //   } else {
  //     console.error("Geolocation is not supported by this browser.");
  //   }
  // }, []);

  return (
    <Box sx={{ flexGrow: 1, mb: 8, mt: 12 }}>
      <Form onFinish={handleFinish} layout="vertical" form={form}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-1">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
              <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Image upload
                </label>
                <div className="mt-2">
                  <Upload
                    customRequest={handleUpload}
                    name="file"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    beforeUpload={beforeUpload}
                  >
                    {fileList.length >= 8 ? null : uploadButton}
                  </Upload>
                  <Modal
                    open={previewOpen}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancel}
                  >
                    <img
                      alt="example"
                      style={{ width: "100%" }}
                      src={previewImage}
                    />
                  </Modal>
                </div>
              </div>

              <div className="col-span-full">
                <Form.Item
                  label={
                    <div className="block text-sm font-medium leading-6 text-gray-900">
                      title
                    </div>
                  }
                  name="title"
                >
                  <input
                    type="text"
                    placeholder="introduce your note over here"
                    className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </Form.Item>
              </div>

              <div className="col-span-full">
                <Form.Item
                  label={
                    <div className="block text-sm font-medium leading-6 text-gray-900">
                      Content
                    </div>
                  }
                  name="content"
                  initialValue={{ html: "", text: "" }}
                >
                  <ReactQuillEditor showDrawer={showDrawer} />
                </Form.Item>
                <div className="flex gap-3 md:gap-6">
                  <Button
                    type="text"
                    className="rounded-full bg-gray-100 text-black text-sm font-medium"
                    onClick={() => showDrawer(false)}
                  >
                    #话题
                  </Button>
                  <Button
                    type="text"
                    className="rounded-full bg-gray-100 text-black text-sm font-medium"
                    onClick={() => showDrawer(true)}
                  >
                    @用户
                  </Button>
                  <Button
                    type="text"
                    className="flex  items-center rounded-full bg-gray-100 text-black text-sm font-medium"
                  >
                    <MessageOutlined />
                    互动组件
                  </Button>
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>

              <div className="sm:col-span-3">
                <Form.Item
                  label={
                    <div className="block text-sm font-medium leading-6 text-gray-900">
                      Location
                    </div>
                  }
                  name="location"
                >
                  <input
                    type="text"
                    className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </Form.Item>
              </div>

              <div className="sm:col-span-3">
                <Form.Item
                  label={
                    <div className=" block  text-sm font-medium  leading-6   text-gray-900">
                      权限
                    </div>
                  }
                  name="rule"
                >
                  <select className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                    <option>public</option>
                    <option>private</option>
                  </select>
                </Form.Item>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="reset"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>
        <Drawer
          placement="bottom"
          closable={false}
          onClose={onClose}
          open={open}
        >
          {clickType ? (
            <List
              dense
              sx={{ margin: "auto", maxWidth: 360, overflow: "auto" }}
            >
              {(userList || dataFollower?.result).map(
                ({ id, nickName, avatar }) => {
                  const labelId = `checkbox-list-secondary-label-${id}`;
                  return (
                    <ListItem key={id} disablePadding>
                      <ListItemButton
                        role={undefined}
                        onClick={handleToggle(id, nickName)}
                        dense
                      >
                        <ListItemAvatar>
                          <Avatar alt={`Avatar n°${nickName}`} src={avatar} />
                        </ListItemAvatar>
                        <ListItemText id={labelId} primary={nickName} />
                      </ListItemButton>
                    </ListItem>
                  );
                }
              )}
            </List>
          ) : (
            <div className="flex w-full flex-wrap gap-6">
              {/* {dataTopic?.result?.map((item) => {
                return (
                  <Button
                    key={item}
                    type="text"
                    className="rounded-full bg-gray-100 text-black text-sm font-medium"
                    onClick={() => handleAddUserOrTopic(item, "#")}
                  >
                    #{item}
                  </Button>
                );
              })} */}
              {[
                "科技创新与未来发展",
                "环境保护与可持续发展",
                "健康生活与心理幸福",
                "教育改革与学习方法",
                "文化多样性与传统文化保护",
                "社会公平与公正法治",
                "创业精神与职业发展",
                "城市规划与可持续城市设计",
                "人工智能与机器学习",
                "未来交通与智能出行",
                "医疗技术与健康关怀",
                "社交媒体与数字社交",
                "自然灾害应对与减灾措施",
                "金融科技与数字支付",
                "青年领袖与社会责任",
                "互联网安全与个人隐私保护",
              ].map((item) => {
                return (
                  <Button
                    key={item}
                    type="text"
                    className="rounded-full bg-gray-100 text-black text-sm font-medium"
                    onClick={() => handleAddUserOrTopic(item, "#")}
                  >
                    #{item}
                  </Button>
                );
              })}
            </div>
          )}
        </Drawer>
      </Form>
    </Box>
  );
}

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

export default PostNote;
