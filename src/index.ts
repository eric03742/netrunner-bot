import "reflect-metadata";
import {Context, h, Schema} from 'koishi'
import { NetrunnerDataSource } from "@eric03742/netrunner-entities";

export const name = 'netrunner-bot'

export interface Config {
    database_location: string;
}

export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
        database_location: Schema.string()
            .required()
            .description("SQLite数据库地址"),
    }).description("数据库配置"),
]);

export function apply(ctx: Context, config: Config) {
    const AppDataSource = NetrunnerDataSource.create(config.database_location);

    ctx.on("ready", async () => {
        await AppDataSource.initialize();
        ctx.logger.info("数据库初始化完成!");
    });

    ctx.on("dispose", async () => {
        await AppDataSource.destroy();
        ctx.logger.info("数据库卸载完毕!");
    });

    // 如果收到“天王盖地虎”，就回应“宝塔镇河妖”
    ctx.on('message', async (session) => {
        if (session.content === '天王盖地虎') {
            const msg = h("message", {}, h.text(session.event.user?.id), h.text(ctx.baseDir));
            session.send(msg);
        }
    });
}
