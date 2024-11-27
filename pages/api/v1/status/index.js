import database from "infra/database";

async function status(req, res) {
  const dbVersion = await database.query("SHOW server_version;");
  const dbMaxConnections = await database.query("SHOW max_connections;");
  const databaseName = process.env.POSTGRES_DB;

  const dbOpenedConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  return res.status(200).json({
    updated_at: new Date().toISOString(),
    dependencies: {
      database: {
        version: dbVersion.rows[0].server_version,
        max_connections: parseInt(dbMaxConnections.rows[0].max_connections),
        opened_connections: dbOpenedConnections.rows[0].count,
      },
    },
  });
}

export default status;
