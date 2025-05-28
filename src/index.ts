import { Context, h, Schema } from 'koishi';

import { RoundTimeline, RunTimeline } from "./timeline";

export const name = 'netrunner-bot';

export interface Config {}

export const Config: Schema<Config> = Schema.object({});

export function apply(ctx: Context) {
  ctx.command('时序 <message>')
    .action(async (_, message) => {
      if(message === "回合") {
        const buffer = Buffer.from(RoundTimeline, 'base64');
        return h.image(buffer, "image/png") + "回合时序2025.04";
      } else if(message === "潜袭") {
        const buffer = Buffer.from(RunTimeline, 'base64');
        return h.image(buffer, "image/png") + "潜袭时序2025.04";
      } else {
        return "无效的命令参数！\n使用说明：/时序 [回合|潜袭]";
      }
    });
}
