import React, { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  PlayCircle,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  Flower2,
  Clock,
  Sparkles,
  Camera,
  HelpCircle,
} from "lucide-react";

const PARAGRAPH_BREAK = String.fromCharCode(10) + String.fromCharCode(10);
const makeText = (paragraphs) => paragraphs.join(PARAGRAPH_BREAK);

const steps = [
  {
    title: "1. 领取材料",
    summary: "按类别确认材料、工具和公共区域位置。",
    details: makeText([
      "切片类：已裁剪花瓣（7片）/ 热缩片（1张）。",
      "铜丝类：普通铜丝 6 根、带小珍珠铜丝 1 根。",
      "辅助类：缠花线、半成品叶片、海绵。",
      "桌面工具：紫外线灯、UV 胶、一次性垃圾袋。",
      "请确认热缩区和公共服务区位置。垃圾请扔在垃圾袋中；如需纸巾、湿纸巾或一次性手套，请举手示意或前往服务区领取。",
    ]),
    noMedia: true,
  },
  {
    title: "2. 描图、裁剪、打孔",
    summary: "确认花苞、花瓣数量，并按照孔位完成打孔。",
    details: makeText([
      "一朵花需要：3 片大花瓣、3 片中花瓣、1 个花苞。",
      "花苞是三个最小花瓣连在一起的切片。",
      "按照图纸描线、裁剪，并在指定孔位打孔。",
      "已领取裁好切片的同学，检查数量和孔位后可直接上色。",
    ]),
    media: [
      { type: "image", title: "P1 花苞的画法", text: "三个最小的花瓣连在一起，组成一个花苞。", src: "/media/p1-bud-drawing.jpg" },
      { type: "image", title: "P2 花苞的打孔位置", text: "花苞中心连接处需要打孔，用于后续穿铜丝。", src: "/media/p2-bud-hole.jpg" },
      { type: "image", title: "P3 花瓣的打孔位置", text: "单片花瓣在尾端位置打孔。", src: "/media/p3-petal-hole.jpg" },
      { type: "image", title: "P4 一朵花需要的所有切片", text: "一朵花需要：3 片大花瓣、3 片中花瓣、1 个花苞。", src: "/media/p4-all-pieces.jpg" },
      { type: "video", title: "热缩片花瓣裁剪与打孔", text: "点击打开视频号示范。", url: "https://weixin.qq.com/sph/AbtWISRhQe" },
    ],
  },
  {
    title: "3. 选色",
    summary: "选择色粉并确定花瓣配色。",
    details: makeText([
      "前往服务区刮取自己心仪的色粉。",
      "可自由发挥，也可以根据参考推荐选色。",
      "建议以黄心白底为基础，在花瓣外围进行自由发挥。",
    ]),
    media: [
      { type: "image", title: "P5 选色参考", text: "可参考推荐配色，也可以根据自己的喜好自由搭配。建议以黄心白底为基础，在花瓣外围进行变化。", src: "/media/p5-color-reference.jpg" },
    ],
  },
  {
    title: "4. 上色 / 勾画脉络",
    summary: "完成花苞切片的底色和纹理。",
    details: makeText([
      "优先给花苞切片上色，并勾画脉络。",
      "用指腹或纸巾上色粉，再用彩铅补脉络。",
      "彩铅在服务区取用，用完请放回原位。",
    ]),
    media: [
      { type: "image", title: "P6 切片上色展示", text: "展示花苞切片上底色后的效果。", src: "/media/p6-coloring.jpg" },
      { type: "image", title: "P7 脉络勾画展示", text: "展示用彩铅勾画花苞脉络的效果，脉络颜色建议接近花瓣颜色。", src: "/media/p7-vein-drawing.jpg" },
      { type: "video", title: "花苞切片上色与脉络勾画", text: "点击打开视频号示范。", url: "https://weixin.qq.com/sph/AZomnK1xEz" },
    ],
  },
  {
    title: "5. 分批热缩",
    summary: "少量多次热缩，避免集中排队。",
    details: makeText([
      "画好 2—3 片后，有空位就先去热缩。",
      "热缩过程中注意安全，小心烫伤。",
      "刚热缩好的切片不要马上用手碰。",
    ]),
    media: [
      { type: "image", title: "P8 热缩后花瓣状态", text: "展示热缩完成后花瓣自然卷曲、变小并定型后的状态。", src: "/media/p8-heat-shrinked.jpg" },
      { type: "video", title: "热缩操作教学视频", text: "点击打开视频号示范。", url: "https://weixin.qq.com/sph/AUyFKB4Zty" },
    ],
  },
  {
    title: "6. 穿铜丝",
    summary: "把铜丝穿入花苞和花瓣孔位。",
    details: makeText([
      "带小珍珠的铜丝穿入花苞中心孔。",
      "其余铜丝分别穿入花瓣孔位。",
    ]),
    media: [
      { type: "image", title: "P9 穿铜丝示意", text: "展示花苞和花瓣穿入铜丝后的状态。", src: "/media/p9-wire.jpg" },
      { type: "video", title: "穿铜丝示范视频", text: "点击打开视频号示范。", url: "https://weixin.qq.com/sph/ATurzUhiHx" },
    ],
  },
  {
    title: "7. 花苞缠线与底部加固",
    summary: "固定花苞、铜丝和底部结构。",
    details: makeText([
      "将花苞底部和铜丝对齐，用缠花线固定。",
      "缠好后在花苞底部少量点 UV 胶，并照灯加固。",
      "注意安全：不要直视紫外线灯，UV 胶未固化前不要直接触碰。",
    ]),
    media: [
      { type: "video", title: "花苞缠线与底部加固视频", text: "点击打开视频号示范。", url: "https://weixin.qq.com/sph/AE6j2ZgyRx" },
    ],
  },
  {
    title: "8. 花瓣组装与 UV 固定",
    summary: "按顺序逐片安装花瓣。",
    details: makeText([
      "先装中花瓣，再装大花瓣。",
      "每片花瓣按：摆位置 → 根部点胶 → 按住 → 照灯固定。",
      "不要一次性把所有花瓣都点胶后再照灯。",
    ]),
    media: [
      { type: "video", title: "花瓣组装与 UV 固定视频", text: "点击打开视频号示范。", url: "https://weixin.qq.com/sph/AY39VOJVQb" },
    ],
  },
  {
    title: "9. 缠花杆和加叶片",
    summary: "用缠花线收尾，固定花杆和叶片。",
    details: makeText([
      "把花头下方的铜丝和花杆顺在一起。",
      "从花头底部开始缠花线，向下包住铜丝和花杆。",
      "缠到合适位置时加入半成品叶片，并多绕几圈固定。",
      "继续向下缠到合适位置，用 UV 胶收尾，剪掉多余线头即可。",
    ]),
    media: [
      { type: "video", title: "缠花杆和加叶片视频", text: "点击打开视频号示范。", url: "https://weixin.qq.com/sph/AA1ZU7z7if" },
    ],
  },
  {
    title: "10. 可选：UV 胶水珠装饰",
    summary: "用少量 UV 胶做水珠效果。",
    details: makeText([
      "这一步为可选装饰，不做也可以完成作品。",
      "在花瓣或花杆局部少量点 UV 胶，做出水珠效果。",
      "每次少量点胶，避免胶水流动过多。",
      "点好后放到紫外线灯下照灯固定。",
    ]),
    media: [
      { type: "video", title: "UV 胶滴水珠装饰视频", text: "点击打开视频号示范。", url: "https://weixin.qq.com/sph/AMnQkCj7rp" },
    ],
  },
  {
    title: "11. 美化装饰与拍照带走",
    summary: "自由搭配装饰物料，完成后拍照带走。",
    details: makeText([
      "现场准备了单朵鸢尾花美化物料：蝴蝶、绸带、鲜花包装卡、假草、装饰卡片。",
      "愿意活动后填写复盘问卷的朋友，可免费选择装饰物料进行搭配。",
      "完成后可以先插入共享花瓶统一拍照，拍完记得取回自己的作品。",
    ]),
    noMedia: true,
  },
];

const stageGroups = [
  { title: "准备阶段", range: "1-3", start: 0, end: 3 },
  { title: "制作阶段", range: "4-6", start: 3, end: 6 },
  { title: "组装收尾", range: "7-11", start: 6, end: 11 },
];

const faqs = [
  ["做到一半不知道下一步怎么办？", "先对照当前步骤的视频和图片，仍不确定时直接举手询问工作人员。"],
  ["花瓣画失误了、颜色加多了，感觉画毁了怎么办？", "先不要着急重做。现场有备用裁剪好的花瓣，可以根据情况向工作人员更换。"],
  ["UV 胶不小心点多了，或弄到桌面、地面怎么办？", "立即用湿巾擦掉，不要用手擦，也不要照灯固化。处理不干净时请工作人员协助。"],
  ["工具需要排队时怎么办？", "可以先继续上色、穿铜丝或整理下一组切片，不要停在原地等工具。"],
];

function validateSteps(stepList) {
  return stepList.every((step) => {
    const hasRequiredText =
      typeof step.title === "string" &&
      step.title.trim().length > 0 &&
      typeof step.summary === "string" &&
      step.summary.trim().length > 0 &&
      typeof step.details === "string" &&
      step.details.trim().length > 0;

    const hasStructuredMedia =
      Array.isArray(step.media) &&
      step.media.length > 0 &&
      step.media.every(
        (item) =>
          (item.type === "image" || item.type === "video") &&
          typeof item.title === "string" &&
          item.title.trim().length > 0 &&
          typeof item.text === "string" &&
          item.text.trim().length > 0
      );

    return hasRequiredText && (step.noMedia === true || hasStructuredMedia);
  });
}

function IrisDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-8 -top-10 h-28 w-28 rounded-full bg-purple-200/40 blur-2xl" />
      <div className="absolute right-0 top-8 h-24 w-24 rounded-full bg-sky-200/40 blur-2xl" />
      <div className="absolute bottom-0 left-10 h-20 w-20 rounded-full bg-pink-200/30 blur-2xl" />
      <div className="absolute bottom-6 right-8 h-16 w-16 rounded-full bg-amber-100/50 blur-xl" />
      <div className="absolute right-8 top-24 rotate-12 text-4xl opacity-20">✿</div>
      <div className="absolute bottom-8 left-6 -rotate-12 text-3xl opacity-20">❀</div>
    </div>
  );
}

function MediaBox({ type, text, title, src, url }) {
  const Icon = type === "video" ? PlayCircle : ImageIcon;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/70 bg-gradient-to-br from-white to-stone-50 shadow-sm">
      {src && type === "image" && (
        <img src={src} alt={title || "步骤图片"} className="h-auto w-full object-cover" loading="lazy" />
      )}
      <div className="flex items-center gap-3 px-4 py-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-sky-100 text-violet-600 shadow-sm">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-stone-800">{title || (type === "video" ? "视频位置" : "图片位置")}</p>
          <p className="mt-1 text-xs leading-relaxed text-stone-500">{text}</p>
          {type === "video" && url && (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-sm"
            >
              <PlayCircle className="h-4 w-4" />
              打开视频示范
            </a>
          )}
          {type === "image" && !src && <p className="mt-1 text-xs text-red-400">还没有绑定图片文件</p>}
          {type === "video" && !url && <p className="mt-1 text-xs text-red-400">还没有绑定视频号链接</p>}
        </div>
      </div>
    </div>
  );
}

function StepCard({ step, index }) {
  const [open, setOpen] = useState(index < 3);

  return (
    <section className="overflow-hidden rounded-[28px] border border-white/70 bg-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-sm">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="w-full px-5 py-5 text-left"
        aria-expanded={open}
      >
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-200 to-sky-200 text-sm font-bold text-violet-800 shadow-sm">
            {index + 1}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-stone-900">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-stone-600">{step.summary}</p>
              </div>
              <div className="mt-1 text-stone-400">{open ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}</div>
            </div>
          </div>
        </div>
      </button>

      {open && (
        <div className="border-t border-violet-50 px-5 pb-5 pt-4">
          <div className="rounded-2xl bg-gradient-to-br from-violet-50/70 to-sky-50/60 px-4 py-4">
            <p className="whitespace-pre-line text-sm leading-7 text-stone-700">{step.details}</p>
          </div>
          {!step.noMedia && (
            <div className="mt-4 space-y-3">
              {Array.isArray(step.media) && step.media.length > 0 ? (
                step.media.map((item) => (
                  <MediaBox key={`${step.title}-${item.title}`} type={item.type} title={item.title} text={item.text} src={item.src} url={item.url} />
                ))
              ) : null}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default function QingyueIrisGuide() {
  const stepsAreValid = useMemo(() => validateSteps(steps), []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f8f6ff] via-[#fcfbff] to-[#f9f5ef] text-stone-900">
      <div className="mx-auto max-w-md px-4 py-6">
        {!stepsAreValid && (
          <div className="mb-4 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
            教程步骤数据不完整，请检查每一步的标题、简介、正文以及图片/视频占位内容。
          </div>
        )}

        <header className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_12px_36px_rgba(0,0,0,0.06)] backdrop-blur-sm">
          <IrisDecor />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
              <Flower2 className="h-4 w-4" />
              轻悦茶咖啡厅 · 手工 DIY
            </div>
            <h1 className="mt-4 text-3xl font-black leading-tight text-stone-900">轻悦手工鸢尾花制作指南</h1>
            <p className="mt-3 text-sm leading-7 text-stone-600">
              按步骤边做边看，先完成花苞，再逐步加入花瓣和叶片。遇到不确定的地方，可以随时询问工作人员。
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-gradient-to-br from-violet-50 to-white p-3 text-center shadow-sm">
                <Clock className="mx-auto mb-1 h-5 w-5 text-violet-500" />
                <p className="text-xs text-stone-500">预计时间</p>
                <p className="text-sm font-bold text-stone-800">约 2-3h</p>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-sky-50 to-white p-3 text-center shadow-sm">
                <Sparkles className="mx-auto mb-1 h-5 w-5 text-sky-500" />
                <p className="text-xs text-stone-500">难度</p>
                <p className="text-sm font-bold text-stone-800">新手可做</p>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-pink-50 to-white p-3 text-center shadow-sm">
                <Camera className="mx-auto mb-1 h-5 w-5 text-pink-500" />
                <p className="text-xs text-stone-500">成品</p>
                <p className="text-sm font-bold text-stone-800">可带走</p>
              </div>
            </div>
          </div>
        </header>

        <section className="mt-5 rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
          <h2 className="flex items-center gap-2 text-lg font-bold text-stone-900">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            现场节奏提醒
          </h2>
          <div className="mt-3 space-y-2 text-sm leading-7 text-stone-700">
            <p>不要把所有切片都攒到最后热缩。</p>
            <p>建议做法：画好一组 → 先热缩 → 继续下一组。</p>
            <p>先完成花苞，再做花瓣，最后组装收尾。</p>
          </div>
        </section>

        <section className="mt-5 space-y-5">
          <h2 className="px-1 text-lg font-bold text-stone-900">制作流程</h2>
          {stageGroups.map((group) => (
            <div key={group.title} className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-100 to-sky-100 px-3 py-1 text-sm font-semibold text-violet-800">
                  <Flower2 className="h-4 w-4" />
                  {group.title}
                </div>
                <span className="text-xs text-stone-500">步骤 {group.range}</span>
              </div>
              {steps.slice(group.start, group.end).map((step, offset) => (
                <StepCard key={step.title} step={step} index={group.start + offset} />
              ))}
            </div>
          ))}
        </section>

        <section className="mt-5 rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
          <h2 className="flex items-center gap-2 text-lg font-bold text-stone-900">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            安全提醒
          </h2>
          <ul className="mt-3 list-disc pl-5 text-sm leading-7 text-stone-700">
            <li>热缩工具温度较高，请在指定热缩区使用。</li>
            <li>刚热缩好的花瓣不要马上用手触碰。</li>
            <li>使用紫外线灯时不要直视灯光。</li>
            <li>UV 胶未固化前尽量避免接触皮肤。</li>
            <li>剪刀、打孔器、铜丝使用时注意手部安全。</li>
            <li>工具用完请放回原位。</li>
          </ul>
        </section>

        <section className="mt-5 rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
          <h2 className="flex items-center gap-2 text-lg font-bold text-stone-900">
            <HelpCircle className="h-5 w-5 text-violet-600" />
            常见问题
          </h2>
          <div className="mt-3 space-y-3">
            {faqs.map(([q, a]) => (
              <div key={q} className="rounded-2xl bg-gradient-to-br from-stone-50 to-violet-50/40 p-4">
                <p className="text-sm font-bold text-stone-900">Q：{q}</p>
                <p className="mt-1 text-sm leading-6 text-stone-700">A：{a}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="py-8 text-center text-xs leading-6 text-stone-500">
          <p>轻悦茶咖啡厅 · 手工花 DIY 活动</p>
          <p>请根据现场工作人员指导完成制作</p>
        </footer>
      </div>
    </main>
  );
}
