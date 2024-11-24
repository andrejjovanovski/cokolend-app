import {ORDER_STATUS_CLASS_MAP, ORDER_STATUS_TEXT_MAP} from "@/constants.jsx";

export default function StatusTag({ orderStatus }) {
  return (
    <span
    className={"px-2 py-1 rounded-lg leading-tight " + (ORDER_STATUS_CLASS_MAP[orderStatus])}
    >
      {ORDER_STATUS_TEXT_MAP[orderStatus]}
    </span>
  )
}
