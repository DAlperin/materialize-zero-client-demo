# Materialize + Zero

This project is an example for using materialize with zero on the frontend. Follow the steps from the [Change Source](https://github.com/DAlperin/materialize-zero-change-source) first to get the backend running.

## Getting Started

Everything here is basically ripped one for one from (zeros docs)[https://zero.rocicorp.dev/docs/add-to-existing-project]. You should def use these docs as a reference for how to write the schema.ts file and how to use the zero client.

1. Copy `.env.example` to `.env` and fill in the values.

   - Make sure the connection string points to the same database as the one you used in the Change Source!

2. Run `npm install` to install the dependencies.
3. Update `schema.ts` to match your database schema.
4. Update the code in `src/App.tsx` to match your needs.
5. Run `npm run updatePermissions` to update the permissions in the database based on the permissions in your schema. (This is the only materialize specific step)

   - This will fail if you haven't followed the steps from the Change Source!

6. Run `npm run dev` to start the development server.
