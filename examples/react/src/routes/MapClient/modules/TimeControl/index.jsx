import React,{ useState, useEffect, useCallback } from "react";
import moment, { Moment } from 'moment'
moment.locale('zh-cn'); 
export const TimeControl=()=>{
  const [now, setNow] = useState(moment())  // 会返回当前状态的属性 和修改状态的方法

  useEffect(() => {  // 可以在函数组件内处理生命周期事件，默认情况，每次渲染都会调用该函数
    const t = setInterval(() => {
      setNow(moment())
    }, 1000)

    return () => {  // 每次卸载都执行此函数，清楚定时器
      clearTimeout(t)
    }
  }, [])

  return (
    <div className="time_panel">
      <span>{now.format("YYYY")}</span>年<span>{now.format("MM")}</span>月
      <span>{now.format("DD")}</span>日 <span> {now.format("dddd")} </span>{now.format("HH:mm:ss")}
    </div>
  );
}