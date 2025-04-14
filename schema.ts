import { createSchema, table, string, definePermissions, ANYONE_CAN_DO_ANYTHING, number } from '@rocicorp/zero';

const messages = table('messages').columns({
    id: number(),
    author: string(),
    channel: string(),
    time: number(),
    message: string(),
}).primaryKey('id');

const current_messages = table('current_messages').columns({
    id: number(),
    author: string(),
    channel: string(),
    time: number(),
    message: string(),
}).primaryKey('id');

const expired_message_count = table('expired_message_count').columns({
    count: number(),
}).primaryKey('count');


export const schema = createSchema({
    tables: [messages, current_messages, expired_message_count],
});

export const permissions = definePermissions<unknown, Schema>(schema, () => ({
    messages: ANYONE_CAN_DO_ANYTHING,
    current_messages: ANYONE_CAN_DO_ANYTHING,
    expired_message_count: ANYONE_CAN_DO_ANYTHING,
}));

export type Schema = typeof schema;