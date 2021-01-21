import { MessageBox, Message } from "element-ui";

/**
 * @author 封装 element-ui 弹框
 * @param text
 * @param type
 * @returns {Promise}
 */
export function handleConfirm(text = "确定执行此操作吗？", type = "danger") {
  return MessageBox.confirm(text, "提示", {
    showClose: false,
    confirmButtonText: "确定",
    confirmButtonClass: "el-button--danger ",
    customClass: 'confirm',
    cancelButtonText: "取消",
    type: type
  });
}

/**
 * @author 封装 element-ui 消息提示
 * @param text
 * @param type
 * @returns {Promise}
 */
export function handleAlert(text = "操作成功", type = "success") {
  return Message({
    showClose: true,
    message: text,
    type: type
  });
}
