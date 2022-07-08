import { notification } from "antd";

export const openNotificationWithIcon = (obj) => {
  notification[obj.type]({
    message: obj.msg,
    description: obj.description,
    placement: "topLeft",
    style: {
      top: 60,
    },
  });
};
