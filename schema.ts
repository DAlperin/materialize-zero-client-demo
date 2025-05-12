import { createSchema, table, string, definePermissions, ANYONE_CAN_DO_ANYTHING, number, ANYONE_CAN, NOBODY_CAN } from '@rocicorp/zero';

const top_posts = table('top_posts').columns({
    rkey: string(),
    count: number(),
    did: string(),
}).primaryKey('rkey');

export const schema = createSchema({
    tables: [top_posts],
});

export const permissions = definePermissions<unknown, Schema>(schema, () => ({
    top_posts: {
        row: {
            select: ANYONE_CAN,
            delete: NOBODY_CAN
        }
    },
}));

export type Schema = typeof schema;