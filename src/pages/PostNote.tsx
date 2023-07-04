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
import { useEffect, useRef, useState } from "react";
import { postImage } from "../services/note";
import Test from "./test";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

function PostNote() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [clickType, setClickType] = useState(false);
  const [textArea, setTextArea] = useState("");
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
  const [userSelected, setUserSelected] = useState<string[]>([]);
  const [topicList, setTopicList] = useState<string[]>([
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
  ]);

  const showDrawer = (type: boolean) => {
    setOpen(true);
    setClickType(type);
  };

  const onClose = () => {
    setOpen(false);
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

  const handleToggle = (value: string) => () => {
    const currentIndex = userSelected.indexOf(value);
    const newChecked = [...userSelected];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    console.log("newChecked", newChecked);
    setUserSelected(newChecked);
  };

  const handleTextAreaChange = (e) => {
    console.log(e.target.value);
    if (e.target.value.indexOf("#") > -1) {
      showDrawer(true);
    }
  };
  const handleFinish = async (value: any) => {
    console.log("value", value);
  };

  useEffect(() => {
    // 检查浏览器是否支持Geolocation API
    if (window.navigator.geolocation) {
      // 获取当前位置信息
      window.navigator.geolocation.getCurrentPosition(
        function (position) {
          // 成功回调函数
          const latitude = position.coords.latitude; // 经度
          const longitude = position.coords.longitude; // 纬度
          const altitude = position.coords.altitude; // 海拔高度（可选）

          // 在此处对位置信息进行处理
          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);
          console.log("Altitude:", altitude);
        },
        function (error) {
          // 失败回调函数
          console.error("Error code:", error.code);
          console.error("Error message:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);
  return (
    <Form onFinish={handleFinish} layout="vertical" className="my-16">
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
              >
                <textarea
                  rows={3}
                  value={textArea}
                  onChange={handleTextAreaChange}
                  className="block w-full rounded-md px-1 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
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
                  onFocus={() => {
                    // window.scrollBy({ top: -300 });
                  }}
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
          // onClick={(e) => {
          //   e.preventDefault(); // 阻止表单默认的提交行为
          //   if (!form.current) {
          //     return;
          //   }
          //   const location = form.current.elements.location.value;
          //   console.log("location:", location);
          //   console.log(form.current.elements.title.value);
          // }}
        >
          Submit
        </button>
      </div>
      <Test />
      <Drawer placement="bottom" closable={false} onClose={onClose} open={open}>
        {clickType ? (
          <List dense sx={{ width: "100%", maxWidth: 360, overflow: "auto" }}>
            {userList.map(({ id, nickName, avatar }) => {
              const labelId = `checkbox-list-secondary-label-${id}`;
              return (
                <ListItem
                  key={id}
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      checked={userSelected.indexOf(nickName) !== -1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  }
                  disablePadding
                >
                  <ListItemButton
                    role={undefined}
                    onClick={handleToggle(nickName)}
                    dense
                  >
                    <ListItemAvatar>
                      <Avatar alt={`Avatar n°${nickName}`} src={avatar} />
                    </ListItemAvatar>
                    <ListItemText id={labelId} primary={nickName} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        ) : (
          <div className="flex w-full flex-wrap gap-6">
            {topicList.map((item) => {
              return (
                <Button
                  key={item}
                  type="text"
                  className="rounded-full bg-gray-100 text-black text-sm font-medium"
                  // onClick={() => showDrawer(true)}
                >
                  #{item}
                </Button>
              );
            })}
          </div>
        )}
      </Drawer>
    </Form>
  );
}

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

export default PostNote;
