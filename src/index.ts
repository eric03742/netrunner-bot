import { Context, h, Schema } from "koishi";

import { RoundTimeline, RunTimeline } from "./timeline";
import { StandardBanlist, StartupBanlist } from "./banlist";
import { HelpMessage } from "./help";

export const name = "netrunner-bot";

export interface Config {}

export const Config: Schema<Config> = Schema.object({});

export function apply(ctx: Context) {
  ctx.command("帮助").alias("help")
    .action(async (_) => {
      return HelpMessage;
    });

  ctx.command("时序 <message>")
    .action(async (_, message) => {
      if(message === "回合") {
        const buffer = Buffer.from(RoundTimeline, "base64");
        return h.image(buffer, "image/png") + "回合时序2025.04";
      } else if(message === "潜袭") {
        const buffer = Buffer.from(RunTimeline, "base64");
        return h.image(buffer, "image/png") + "潜袭时序2025.04";
      } else {
        return "无效的命令参数！\n使用说明：/时序 [回合|潜袭]";
      }
    });

    ctx.command("环境 <message>").alias("禁卡表")
      .action(async (_, message) => {
        if(!message) {
          return "无效的命令参数！\n使用说明：/环境 [标准|新启]";
        } else if(message === "标准" || message.toLowerCase() === "std" || message.toLowerCase() === "standard") {
          return StandardBanlist;
        } else if(message === "新启" || message.toLowerCase() === "su" || message.toLowerCase() === "startup") {
          return StartupBanlist;
        } else {
          return "无效的命令参数！\n使用说明：/环境 [标准|新启]";
        }
      });

  // ctx.command("文章 <message>")
  //   .action(async (_, message) => {
  //     if(articles.has(message)) {
  //       const link = articles.get(message);
  //       return `文章：【${message}】\n${link}`;
  //     } else {
  //       const entries = Array.from(articles.keys());
  //       const names = entries.join("、");
  //       return `没有找到对应的文章！\n使用说明：/文章 [文章关键词]\n文章列表：${names}`;
  //     }
  //   });
}
