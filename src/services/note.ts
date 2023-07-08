import request from "../utils/request";
import AMapLoader from "@amap/amap-jsapi-loader";

console.log(import.meta.env.BASE_URL);
export const getNotes = (
  page: number,
  pageSize = 10
): Promise<{ result: NoteDatatype[] }> => {
  return request(`/api/note/get/notes/${page}/${pageSize}`);
};

export const postImage = (formData: FormData): Promise<{ result: string }> => {
  return request.post(`/api/media/upload/file`, formData);
};

export const getTopic = (): Promise<{ result: string[] }> => {
  return request.get(`/api/topic/get/8`);
};

export const getFollower = (
  page = 0,
  pageSize = 10
): Promise<{ result: UserMsgDatatype[] }> => {
  return request.get(`/api/follow/each/other/${pageSize}/${page}`);
};

export const publishNote = (formData: any): Promise<{ result: string }> => {
  return request.post(`/api/note/publish`, formData);
};

export const getUserLocation = async (): Promise<string> => {
  try {
    const AMap = await AMapLoader.load({
      key: import.meta.env.VITE_GaoDeAPI_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JS API 的版本，缺省时默认为 1.4.15
      plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    });
    const map = new AMap.Map("map", {
      resizeEnable: true,
    });
    const lnglat = await new Promise<number[]>((resolve, reject) => {
      AMap.plugin("AMap.Geolocation", function () {
        const geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 5000, //超过10秒后停止定位，默认：5s
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition(function (status: string, result: any) {
          if (status !== "complete") reject(new Error("getPosition fail"));
          resolve([result.position.lng, result.position.lat]);
        });
      });
    });

    const address = await new Promise<string>((resolve, reject) => {
      AMap.plugin("AMap.Geocoder", function () {
        const geocoder = new AMap.Geocoder({ radius: 10, extensions: "all" });

        geocoder.getAddress(lnglat, function (status: string, result: any) {
          if (status === "complete" && result.info === "OK") {
            // result为对应的地理位置详细信息
            resolve(result.regeocode.formattedAddress);
          } else {
            reject(result.info);
          }
        });
      });
    });
    return address;
  } catch (error) {
    return Promise.reject(error);
  }
};
